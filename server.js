const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clg_waste'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
    }
});

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { date, building, biodegradable, 'waste-type': wasteType, 'waste-weight': wasteWeight } = req.body;

    const sql = `INSERT INTO waste_seg (date, building_name, waste_category, waste_type, waste_weight) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [date, building, biodegradable, wasteType, wasteWeight], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Failed to save data');
        } else {
            res.status(200).send('Data successfully saved');
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
