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

const insert = {
    intoDepartment(newDept) {
        db.query(`INSERT INTO department (dept_name) VALUES (${newDept})`, (err, results, fields) => {
            console.log(results);
        });
    },

    intoRole(newRole, salary, deptID) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (${newRole}, ${salary}, ${deptID})`, (err, results, fields) => {
            console.log(results);
        });
    },

    intoEmployee(firstName, lastName, roleID, managerID) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (${firstName}, ${lastName}, ${roleID}, ${managerID})`, (err, results, fields) => {
            console.log(results);
        });
    }
};



module.exports = insert;