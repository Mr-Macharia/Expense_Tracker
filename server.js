const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Register User
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { username, email, password: hashedPassword };
    
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered');
    });
});

// Get All Expenses
app.get('/api/expenses', (req, res) => {
    const sql = 'SELECT * FROM expenses';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving expenses');
        }
        res.json(results);
    });
});

// Add Expense
app.post('/api/expenses', (req, res) => {
    const { category, description, amount, date } = req.body;
    const expense = { category, description, amount, date };

    const sql = 'INSERT INTO expenses SET ?';
    db.query(sql, expense, (err, result) => {
        if (err) {
            return res.status(500).send('Error adding expense');
        }
        res.status(201).send('Expense added');
    });
});


// Edit Expense
app.put('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { category, description, amount, date } = req.body;

    const sql = 'UPDATE expenses SET name = ?, amount = ?, date = ?, category = ?, notes = ? WHERE id = ?';
    db.query(sql, [name, amount, date, category, notes, id], (err, result) => {
        if (err) {
            return res.status(500).send('Error updating expense');
        }
        res.send('Expense updated');
    });
});

// Delete Expense
app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM expenses WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting expense' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        
        res.json({ message: 'Expense deleted' });
    });
});

// Login User
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).send('Error logging in');
        }

        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send('Incorrect email or password');
        }

        const token = jwt.sign({ id: results[0].id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
