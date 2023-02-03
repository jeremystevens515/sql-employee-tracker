const inquirer = require('inquirer');
const queries = require('./queries');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'sqlpass4',
        database: 'business_db'
    },
    console.log('connected to business_db')
);

// ----------------------------------------------------------------------------------------------------

const questions = {
    newDepartmentName() {
        inquirer
            .prompt([
                {
                    message: "What is the name of the new department you would like to add?",
                    type: 'input',
                    name: 'newDept'
                }
            ])
            .then((answers) => {
                const newDept = answers.newDept.trim()
                queries.insertIntoDepartment(newDept);
            })
        },

    newRoleName() {
        inquirer
            .prompt([
                {
                    message: 'What role would you like to add?',
                    type: 'input',
                    name: 'newRole'
                },
                {
                    message: "Please enter the new role's salary using only numbers",
                    type: 'number',
                    name: 'salary'
                },
                {
                    message: 'Please add the department for this role',
                    type: 'list',
                    choices: helperFunctions.getDepartments(),
                    name: 'roleDept'
                } 
            ])
            .then((answers) => {
                console.log(answers)
                queries.insertIntoRole(answers.newRole, answers.salary, answers.roleDept);
            })

    },

    newEmployeeName() {
        inquirer
            .prompt([
                {
                    message: "What is the new employee's FIRST NAME?",
                    type: 'input',
                    name: 'firstName' 
                },
                {
                    message: "What is the new employee's LAST NAME?",
                    type: 'input',
                    name: 'lastName'
                },
                {
                    message: "What is the new employee's role?",
                    type: 'list',
                    choices: helperFunctions.getRoles(),
                    name: 'empRole'
                }
            ]).then((answers) => {
                queries.insertIntoEmployee()
            })

    },

    updateEmployee() {
        inquirer
            .prompt([
                {
                    message: "Which employee would you like to update?",
                    type: 'list',
                    choices: helperFunctions.getEmployees(),
                    name: 'emp'
                },
                {
                    message: "What is their new role?",
                    type: 'list',
                    choices: helperFunctions.getRoles(),
                    name: 'role'
                }
            ]).then((answers) => {
                queries.updateEmployeeRole()
            })
    }
}

const helperFunctions = {
    getDepartments() {
        let arr = [];
        db.query('SELECT * FROM department', (err, results, fields) => {
            // console.log(results);
            for (let i = 0; i < results.length; i++) {
                arr.push({
                    id: results[i].id, 
                    name: results[i].dept_name
                }); 
            }
        });
        return arr;
    },

    getRoles() {
        let arr = [];
        db.query('SELECT * FROM role', (err, results, fields) => {
            for (let i = 0; i < results.length; i++) {
                arr.push(results[i].id, results[i].title)
            }
            console.log(arr);
        })
        return arr;
    },

    getEmployees() {
        db.query('SELECT * FROM employee', (err, results, fields) => {
            console.log(results);
        })
    }
}

module.exports = questions;

