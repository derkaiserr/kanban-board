CREATE TABLE users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
age INTEGER
)


INSERT INTO users (name, age)
VALUES ("Hans", 426), ("Niklas", 23)

UPDATE users
SET name = "Tobias"
WHERE name = "Hans"

DELETE FROM users
WHERE name = "Niklas"


SELECT name FROM users
WHERE id = 2

DROP TABLE users