const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
require('dotenv').config();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connecting to Database
const db = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    },

    console.log(`Connected to the ${process.env.database} database`)
);

// DB Queries
db.query(`SELECT * FROM employee`, (err, rows) => {
    console.log(rows);
});

// ROUTES


// Default Route
app.use((req, res) => {
    res.sendStatus(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});