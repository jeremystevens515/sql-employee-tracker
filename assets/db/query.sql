INSERT INTO employee (first_name, last_name, role_id)
VALUES (
    "Jeremy", 
    "Stevens", 
    (SELECT id FROM role WHERE title = "Junior Software Engineer")
)