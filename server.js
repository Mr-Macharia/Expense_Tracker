const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Register User
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password: hashedPassword }]);

    if (error) {
        return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered');
});

// Get All Expenses
app.get('/api/expenses', async (req, res) => {
    const { data, error } = await supabase.from('expenses').select('*');

    if (error) {
        return res.status(500).send('Error retrieving expenses');
    }
    res.json(data);
});

// Get a Single Expense by ID
app.get('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(500).send('Error retrieving expense');
    }
    if (!data) {
        return res.status(404).send('Expense not found');
    }
    res.json(data);
});

// Add Expense
app.post('/api/expenses', async (req, res) => {
    const { category, description, amount, date } = req.body;

    const { data, error } = await supabase
        .from('expenses')
        .insert([{ category, description, amount, date }]);

    if (error) {
        return res.status(500).send('Error adding expense');
    }
    res.status(201).send('Expense added');
});

// Edit Expense
app.put('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { category, description, amount, date } = req.body;

    const { data, error } = await supabase
        .from('expenses')
        .update({ category, description, amount, date })
        .eq('id', id);

    if (error) {
        return res.status(500).send('Error updating expense');
    }
    if (!data.length) {
        return res.status(404).send('Expense not found');
    }
    res.send('Expense updated');
});

// Delete Expense
app.delete('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).send('Error deleting expense');
    }
    if (!data.length) {
        return res.status(404).send('Expense not found');
    }
    res.send('Expense deleted');
});

// Login User
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data || !(await bcrypt.compare(password, data.password))) {
        return res.status(401).send('Incorrect email or password');
    }

    const token = jwt.sign({ id: data.id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
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
