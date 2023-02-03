-- -- view all employees
-- SELECT 
--     CONCAT(employee.first_name,' ', employee.last_name) AS Employee,
--     employee.id AS Employee_ID,
--     role.title AS Title, 
--     department.dept_name AS Department, 
--     role.salary AS Salary, 
--     CONCAT(employee.first_name,' ', employee.last_name) AS Manager 
-- FROM employee
-- LEFT JOIN role ON role.id = employee.role_id
-- LEFT JOIN department ON department.id = role.department_id

INSERT INTO role (title, salary, department_id) 
VALUES (
    'Intern', 
    40000, 
    (SELECT id FROM department WHERE dept_name = "Legal")
)