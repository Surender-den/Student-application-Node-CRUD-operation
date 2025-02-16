const mysql = require('mysql2');
const faker = require('faker');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    
    const users = [];

    for (let i = 0; i < 1000; i++) {
        const name = faker.name.findName();
        const age = faker.datatype.number({ min: 18, max: 60 });
        const city = faker.address.city();

        users.push([name, age, city]);
    }

    const query = 'INSERT INTO user (name, age, city) VALUES ?';
    connection.query(query, [users], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Inserted data:', result.affectedRows);
        }
        connection.end();
    });
});
