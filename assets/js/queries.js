const mysql = require('mysql2');
const cTable = require('console.table');
const index = require('./index');

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
        db.query('SELECT dept_name AS Departments, id AS Department_ID FROM department', (err, results, fields) => {
            console.table(results);
        });
    },

    viewAllRoles() {
        db.query('SELECT role.title AS Role, role.id AS Role_ID, department.dept_name AS Department, role.salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id', (err, results, fields) => {
            console.table(results)
        });
    },

    viewAllEmployees() {
        db.query("SELECT CONCAT(employee.first_name,' ', employee.last_name) AS Employee, role.title AS Title, department.dept_name AS Department, role.salary AS Salary, CONCAT(employee.first_name,' ', employee.last_name) AS Manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id", (err, results, fields) => {
            console.table(results);
        });
    },

    insertIntoDepartment(newDept) {
        db.query(`INSERT INTO department (dept_name) VALUES ("${newDept}")`, (err, results, fields) => {
            console.log("New department added!")
        });
        db.query('SELECT * FROM department;', (err, results, fields) => {
            console.table(results)
        })
    },

    insertIntoRole(newRole, salary, deptID) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", "${salary}", (SELECT id FROM department WHERE dept_name = "${deptID}"))`, (err, results, fields) => {
            if (err) {
                console.error(err)
            } else {
                console.log("New role added!")
            }
        });
        db.query('SELECT * FROM role ORDER BY department_id', (err, results) => {
            console.table(results);
        })
    },

    insertIntoEmployee(firstName, lastName, empRole, empManager) {
        if (empManager === 'None') {
            db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", (SELECT id FROM role WHERE title = "${empRole}"))`, (err, results, fields) => {
                err ? console.error(err) : console.log("New employee added!")
                db.query(`SELECT * FROM employee`, (err, results) => {
                    console.table(results);
                })
            });
        } else {
            // get manager id
            console.log('empManager: ', empManager)
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name," ", last_name) = "${empManager}"`, (err, results) => {
                // err ? console.error(err) : console.log('results: ', results[0].id)
                let managerID = results[0].id;
                // then pass manager id to this v method
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", (SELECT id FROM role WHERE title = "${empRole}"), ${managerID})`, (err, results, fields) => {
                    err ? console.error(err) : console.log("New employee added!")
                    db.query(`SELECT * FROM employee`, (err, results) => {
                        console.table(results);
                    })
                });
            });
            
        }
    },

    updateEmployeeRole(newRole, empID) {
        db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${empID}`, (err, results, fields) => {
            err ? console.error(err) : console.log("Employee updated!")
        });

        db.query(`SELECT * FROM employee`, (err, results, fields) => {
            console.table(results)
        });
    }
};


module.exports = queries;