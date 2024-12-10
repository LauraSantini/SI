const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sql = require('mssql');

const app = express();
const port = 5500;

app.use(bodyParser.json());  // Parse incoming JSON requests

// SQL Server configuration
const config = {
    user: 'your-username',
    password: 'your-password',
    server: 'your-server',  // E.g., localhost or IP address
    database: 'your-database',
    options: {
        encrypt: true,  // Use encryption
        trustServerCertificate: true,  // Depending on your SQL server setup
    }
};

// Connect to the database
sql.connect(config).then(pool => {
    app.locals.pool = pool;
    console.log('Connected to database');
}).catch(err => {
    console.error('Database connection failed', err);
});

// API route to add a car
app.post('/add-car', async (req, res) => {
    const { matricula, disponibilidade, custo, numero_lugares } = req.body;
    try {
        const result = await req.app.locals.pool.request()
            .input('matricula', sql.VarChar, matricula)
            .input('disponibilidade', sql.VarChar, disponibilidade)
            .input('custo', sql.Float, custo)
            .input('numero_lugares', sql.SmallInt, numero_lugares)
            .query(`
                INSERT INTO carros (matricula, disponibilidade, custo, numero_lugares)
                VALUES (@matricula, @disponibilidade, @custo, @numero_lugares)
            `);
        res.json({ message: 'Car added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add car' });
    }
});

// API route to update car cost
app.post('/update-cost', async (req, res) => {
    const { id_carro, new_custo } = req.body;
    try {
        const result = await req.app.locals.pool.request()
            .input('id_carro', sql.Int, id_carro)
            .input('new_custo', sql.Float, new_custo)
            .query(`
                UPDATE carros
                SET custo = @new_custo
                WHERE id_carro = @id_carro
            `);
        res.json({ message: 'Car cost updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update cost' });
    }
});

// API route to remove a car
app.post('/remove-car', async (req, res) => {
    const { id_carro } = req.body;
    try {
        const result = await req.app.locals.pool.request()
            .input('id_carro', sql.Int, id_carro)
            .query(`
                DELETE FROM carros WHERE id_carro = @id_carro
            `);
        res.json({ message: 'Car removed successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove car' });
    }
});

// API route for user registration (password hashing)
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await req.app.locals.pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO clientes (Username, Email, Password)
                VALUES (@username, @email, @password)
                SELECT SCOPE_IDENTITY() AS UserID
            `);

        const userID = result.recordset[0].UserID;
        res.status(201).json({ message: 'Registration successful', userID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route for user login
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'your-database-name', // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
    console.log('Connected to database.');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
});

// Start server
app.listen(port, () => {
    console.log(Server running on http://localhost:${port});
});