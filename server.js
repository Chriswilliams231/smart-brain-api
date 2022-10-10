const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const pg = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')

const db = pg({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'christopherwilliams',
        password: '',
        database: 'smart-brain'
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
app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
})





// bcrypt.hash("bacon", null, null, function (err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000')
});

