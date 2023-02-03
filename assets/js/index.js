const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const questions = require ('./questions');
const queries = require('./queries');

// ----------------------------------------------------------------------------------------------------
const welcomeAction = () => {
    const choicesArr = ['view all departments', 
                        'view all roles', 
                        'view all employees', 
                        'add a department', 
                        'add a role', 
                        'add an employee', 
                        'update an employee role'
                    ]
    inquirer
        .prompt([
            {   
                message: 'Welcome to the Employee Tracker. What would you like to do?',
                type: 'list',
                choices: choicesArr,
                name: 'action'
            }
        ])
        .then((answers) => {
            const index = choicesArr.indexOf(answers.action)
            console.log(index)
            switch (parseInt(index)) {
                case 0:
                    queries.viewAllDepartments();
                    break;
                case 1:
                    queries.viewAllRoles();
                    break;
                case 2:
                    queries.viewAllEmployees();
                    break;
                case 3:
                    questions.newDepartmentName();
                    break;
                case 4:
                    questions.newRoleName();
                    break;
                case 5:
                    questions.newEmployeeName();
                    break;
                case 6:
                    questions.updateEmployee();
                    break;
                default:
                    console.log('looks like there was a problem')
        }
        })
};

welcomeAction()