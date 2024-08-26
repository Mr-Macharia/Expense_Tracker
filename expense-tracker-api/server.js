const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint to get all expenses
app.get('/api/expenses', (req, res) => {
    const query = 'SELECT * FROM expenses';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch expenses' });
        } else {
            res.json(results);
        }
    });
});

// API endpoint to add a new expense
app.post('/api/expenses', (req, res) => {
    const { description, amount, date, category } = req.body;
    const query = 'INSERT INTO expenses (description, amount, date, category) VALUES (?, ?, ?, ?)';
    db.query(query, [description, amount, date, category], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add expense' });
        } else {
            res.status(201).json({ id: result.insertId, description, amount, date, category });
        }
    });
});

// API endpoint to delete an expense
app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM expenses WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete expense' });
        } else {
            res.json({ message: 'Expense deleted successfully' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
