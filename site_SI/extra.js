const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

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

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
function addCar() {
    const matricula = document.getElementById('matricula').value;
    const disponibilidade = document.getElementById('disponibilidade').value;
    const custo = document.getElementById('custo').value;
    const numero_lugares = document.getElementById('numero_lugares').value;

    // Validate inputs
    if (!matricula || !disponibilidade || !custo || !numero_lugares) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('http://localhost:3000/add-car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            matricula,
            disponibilidade,
            custo,
            numero_lugares
        })
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
    }).catch(error => {
        alert('Error: ' + error.message);
    });
}
function addCar() {
    const matricula = document.getElementById('matricula').value;
    const disponibilidade = document.getElementById('disponibilidade').value;
    const custo = document.getElementById('custo').value;
    const numero_lugares = document.getElementById('numero_lugares').value;

    if (!matricula || !disponibilidade || !custo || !numero_lugares) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('http://localhost:3000/add-car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            matricula,
            disponibilidade,
            custo,
            numero_lugares
        })
    }).then(response => response.json())
    .then(data => {
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'green';
        feedbackDiv.textContent = data.message;  // Show success message
    }).catch(error => {
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = 'Error: ' + error.message;  // Show error message
    });
}