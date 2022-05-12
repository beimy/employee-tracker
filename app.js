const mysql = require('mysql2');
const Inquirer = require('inquirer');
const cTable = require('console.table');
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

function run() {
    Inquirer
    .prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
    })
    .then(({start}) => {
        switch(start) {
            case 'View Departments':
                console.log('Chose "View Departments"');
                getAllDepartments();
                run();
                break;
            case 'View Roles':
                console.log('Chose "View Roles"');
                getAllRoles();
                run();
                break;
            case 'View Employees':
                console.log('Chose "View Employees"');
                getAllEmployees();
                run();
                break;
            case 'Add a Department':
                console.log('Chose "Add a Department"');
                Inquirer.prompt({
                    type: 'text',
                    name: 'departmentName',
                    message: 'Enter name for new Department'
                })
                .then(data => {
                    addDepartment(data.departmentName);
                    console.log(`Added Department ${data.departmentName}`);
                    run();
                });
            break;
            case 'Add a Role':
                console.log('Chose "Add a Role"');
                Inquirer.prompt([
                    {
                        type: 'text',
                        name: 'title',
                        message: 'Enter title of new Role'
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Enter in Salary for this Role'
                    },
                    {
                        type: 'number',
                        name: 'department',
                        message: 'Enter Department ID number in charge of this Role'
                    }
                ])
                .then(data => {
                    addRole(data.title, data.salary, data.department)
                    console.log(`Added Role ${data.title}`);
                    run();
                });
                break;
            case 'Add an Employee':
                console.log('Chose "Add an Employee"');
                Inquirer.prompt([
                    {
                        type: 'text',
                        name: 'first_name',
                        message: "Enter employee's first name"
                    },
                    {
                        type: 'text',
                        name: 'last_name',
                        message: "Enter employee's last name"
                    },
                    {
                        type: 'number',
                        name: 'role',
                        message: "Enter employee's role ID number"
                    },
                    {
                        type: 'number',
                        name: 'manager',
                        message: "Enter employee's manager ID number"
                    }
                ])
                .then(data => {
                    addEmployee(data.first_name, data.last_name, data.role, data.manager);
                    console.log(`Added new employee ${data.first_name} ${data.last_name}`);
                    run();
                })
                break;
            case 'Update Employee Role':
                console.log('Chose "Update Employee Role"');
                Inquirer.prompt([
                    {
                        type: 'number',
                        name: 'employee',
                        message: "Enter employee's ID number to change role"
                    },
                    {
                        type: 'number',
                        name: 'role',
                        message: "Enter new Role ID number for the employee"
                    }
                ])
                .then(data => {
                    updateRole(data.role, data.employee);
                    console.log(`Employee ID ${data.employee}'s new role ID is ${data.role}`);
                    run();
                });
                break;
        }
    })
}

// DB Queries

// Return all data from a table
function getAllDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        const table = cTable.getTable(rows);
        console.log(table);
        return;
    });
}

function getAllRoles() {
    db.query(`SELECT * FROM role`, (err, rows) => {
        const table = cTable.getTable(rows);
        console.log(table);
        return;
    });
}

function getAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        const table = cTable.getTable(rows);
        console.log(table);
        return;
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
        // console.log(result);
        return result;
    });
};

function addRole( newTitle, newSalary, newDepartment) {
    const sql = `INSERT INTO role (title, salary, department_id)
                 VALUES (?,?,?)`;
    const params = [newTitle, newSalary, newDepartment];

    db.query(sql, params, (err, result) => {
        if(err) {
            console.log(err);
        }
        // console.log(result);
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

run();









