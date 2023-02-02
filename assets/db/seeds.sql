INSERT INTO department (dept_name)
VALUES 
    ('Engineering'),
    ('Legal'),
    ('Finance'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Senior Software Engineer', 140000, 1),
    ('Mid-Level Software Engineer', 100000, 1),
    ('Junior Software Engineer', 80000, 1),
    ('Legal Team Lead', 240000, 2),
    ('Lawyer', 200000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 120000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jung', 'Yoon', 1, null);
