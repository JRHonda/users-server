const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// NOTE: The database name is not the schema name
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'VandyBank'
    }
);

connection.connect(err => {
    if(err) {
        console.log(err);
        return err;
    }
});

app.use(cors());

// Base URL
app.get('/', (req, res) => {
    res.send('Welcome to VandyBank')
});

// Test queries
const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';
const SELECT_SPECIFIC_USER_BY_USERNAME = `SELECT * FROM users WHERE username='admin'`;

app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({data: results}); //.send("<h1>XSS</h1>"); //.json({data: results.toLocaleString()});
        }
    });
});

//
app.listen(3305, () => {
    console.log('Users server listening on port 3305')
});