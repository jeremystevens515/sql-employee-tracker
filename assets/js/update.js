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

const update = {
    employeeRole(newRole, empID) {
        db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${empID}`, (err, results, fields) => {
            console.log(results)
        });
    }
};



module.exports = update;