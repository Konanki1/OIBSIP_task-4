// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// Load existing users from file
if (fs.existsSync('users.json')) {
    const data = fs.readFileSync('users.json');
    users = JSON.parse(data);
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.json({ message: 'User already exists' });
    }

    users.push({ username, password });
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
