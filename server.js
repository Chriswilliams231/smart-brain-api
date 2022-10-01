const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Sam',
            email: 'sam@gmail.com',
            password: 'sammy',
            enteries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'sallymay',
            enteries: 0,
            joined: new Date()
        }
    ]
}
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
    res.send(database.users)
});

// Signin endpoint
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error in login')
    }
    res.json('signin working')
});

// Register endpoint
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        enteries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})


// Profile endpoint
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

// Image endpoint
app.put('image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.enteries++
            return res.json(user.enteries);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
});

