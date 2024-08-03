const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = 'jwt_secret_here!';
let users = [];
let incidents = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // push is just like append to end of array - returns array length
    users.push({username, password:hashedPassword});
    res.send({message:'User registered successfully.'});
})