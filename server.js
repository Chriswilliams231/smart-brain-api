const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const pg = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = pg({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true,

    }
});
// db.select('*').from('users').then(data => {
//     console.log(data)
// });
const app = express()

app.use(bodyParser.json());
app.use(cors());


/*
 Api ideas and design for this smart-brain project.
/root --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

// Root endpoint
app.get('/', (req, res) => {
    res.send('success')
});

// Signin endpoint
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// Register endpoint
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// Profile endpoint
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

// Image endpoint
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});

