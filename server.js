const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const path = require('path'); // for local testing
// access to the public folder

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); // for testing
//

const JWT_SECRET = 'jwt_secret_here!';
let users = [];
let incidents = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // push is just like append to end of array - returns array length
    users.push({username, password:hashedPassword});
    res.send({message:'User registered successfully.'});
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u  => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username}, JWT_SECRET, {expiresIn: '1h'});
        res.send({token, message: 'Successful login'})
        //res.send({message:'User logged in successfully.'});
    }else{
        res.status(401).send({message:'Invalid username or password'});
    }
});

app.post('/incident',(req, res) => {
    const {title, description} = req.body;
    incidents.push({title, description});
    res.send({message:'Incident registered successfully.'});
});

app.get('/dashboard',(req, res) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];
    // get the auth token from the header
    // format: Authorization: Bearer thisIsTheToken
    if(!token) return res.status(401).send({message:'No token'});
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send({message:'Invalid token'});
        res.send({incidents})
    })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// to run server, enter into terminal
// 'node server.js'

