const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// NOTE: The database name is not the schema name
// NOTE: do a console.log(connection) to see what config parameters you can modify. Must be done within constructor
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'react_sql'
    }
);

connection.connect(err => {
    if(err) {
        //console.log(err);
        return err;
    }
});

//console.log(connection);

app.use(cors());

// Base URL
app.get('/', (req, res) => {
    res.send('Welcome to VandyBank')
});

// step 1: http://localhost:3000/user?username=%27 -> returns sql error statement
// step 2: http://localhost:3000/user?username=&password=anything%27%20OR%20%27x%27=%27x gives you all contents of table.
app.get('/user', (req, res) => {
    var {username, password} = req.query;
    const baseQueryString =`SELECT * FROM user WHERE `;
    const preparedQuery = baseQueryString + `username=` + `'${username}'` + ` AND ` + `password=` + `'${password}'`; // <- This string tells you what sql is being used
    connection.query(preparedQuery, (err, results) => {
        if(err) {
            return res.send(err); // Bad because it gives away sql query format
        } else {
            return res.json({data: results});
        }
    });
});

// Application will continuously listen on the port passed in.
app.listen(3000, () => {
    console.log('Users server listening on port 3000')
});

/// EXAMPLE QUERIES

/*
*
  CREATE TABLE `react_sql`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `position` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
*
  `SELECT * FROM user WHERE username='jackfrost' AND password='password'`;
*
*/

/// EXAMPLE res responses

/*
*
  .send("<h1>XSS</h1>"); //.json({data: results.toLocaleString()});
*
 */