const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const { queries, insert, update } = require('./sql-functions');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root', 
//         password: 'sqlpass4',
//         database: 'business_db'
//     },
//     console.log('connected to business_db')
// );

const welcomeAction = () => {
    const choicesArr = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
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
            let index = choicesArr.indexOf(answers.action)
            console.log(index)
        })
};

console.log([...queries, ...insert, ...update]);
welcomeAction();