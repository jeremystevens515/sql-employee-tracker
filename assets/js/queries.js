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

const queries = {

    viewAllDepartments() {
        db.query('SELECT dept_name AS Departments FROM department', (err, results, fields) => {
            console.log(results)
        });
    },

    viewAllRoles() {
        db.query('SELECT title AS Roles FROM role', (err, results, fields) => {
            console.log(results)
        });
    },

    viewAllEmployees() {
        db.query('SELECT CONCAT(first_name,' ', last_name) AS Employee FROM employee', (err, results, fields) => {
            console.log(results);
        });
    }
};



module.exports = queries;