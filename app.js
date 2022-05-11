const { append } = require('express/lib/response');
const res = require('express/lib/response');
const mysql = require('mysql2');
require('dotenv').config();

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

// Return all data from a table
function getAllDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        console.log(rows);
    });
}

function getAllRoles() {
    db.query(`SELECT * FROM role`, (err, rows) => {
        console.log(rows);
    });
}

function getAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        console.log(rows);
    });
}


// Insert into tables
function addDepartment(newDepartmentName) {
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    const params = newDepartmentName;

    db.query(sql, params, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log(result);
        return result;
    });
};

function addRole( newTitle, newSalary) {
    const sql = `INSERT INTO role (title, salary)
                 VALUES (?,?)`;
    const params = [newTitle, newSalary];

    db.query(sql, params, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log(result);
        return result;
    });
};

function addEmployee( newFirst_name, newLast_name, newRole, newManagerId ) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                 VALUES (?,?,?,?)`;
    const params = [newFirst_name, newLast_name, newRole, newManagerId];

    db.query(sql, params, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log(result);
        return result;
    });
};

function updateRole(newRoleID, employeeID) {
        
    // add input checker here!

    const sql = `UPDATE employee SET role_id = ?
                    WHERE id = ?`;
    const params = [newRoleID, employeeID];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err)
            // check if employee is found
        } else if (!result.affectedRows) {
            console.log('No employee found with that id')
        } else {
          console.log(result);
        }
    });
};









