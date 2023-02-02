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

const queries = [

    function viewAllDepartments() {
        db.query('SELECT dept_name AS Departments FROM department', (err, results, fields) => {
            console.log(results)
        });
    },

    function viewAllRoles() {
        db.query('SELECT title AS Roles FROM role', (err, results, fields) => {
            console.log(results)
        });
    },

    function viewAllEmployees() {
        db.query("SELECT CONCAT(first_name,' ', last_name) AS Employee FROM employee", (err, results, fields) => {
            console.log(results);
        });
    }
];

const insert = [
    function intoDepartment(newDept) {
        db.query(`INSERT INTO department (dept_name) VALUES (${newDept})`, (err, results, fields) => {
            console.log(results);
        });
    },

    function intoRole(newRole, salary, deptID) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (${newRole}, ${salary}, ${deptID})`, (err, results, fields) => {
            console.log(results);
        });
    },

    function intoEmployee(firstName, lastName, roleID, managerID) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (${firstName}, ${lastName}, ${roleID}, ${managerID})`, (err, results, fields) => {
            console.log(results);
        });
    }
];

const update = [
    function employeeRole(newRole, empID) {
        db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${empID}`, (err, results, fields) => {
            console.log(results)
        });
    }
];


module.exports = {
    queries,
    insert,
    update
}