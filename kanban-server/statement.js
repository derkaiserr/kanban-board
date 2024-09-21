// const db = require("better-sqlite3")("kanban.db");

// const createTable = () => {
//   const sql = `CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL
//   )`;
//   db.prepare(sql).run();
// };

// // Insert data into the table
// const insertTable = (name) => {
//   const sql = `INSERT INTO users (name)
//       VALUES (?)`;
//   db.prepare(sql).run(name);
// };

// // Fetch a specific user by id
// const getUser = (id) => {
//   const sql = `SELECT * FROM users WHERE id = ?`;
//   const row = db.prepare(sql).get(id); // Use .get for a single result
//   console.log(row);
// };

// // Fetch all users
// const getUsers = () => {
//   const sql = `SELECT * FROM users`;
//   const rows = db.prepare(sql).all(); // Use .all for multiple results
//   console.log(rows);
// };

// // Call createTable first to ensure the table exists
// createTable();

// // Now insert data into the table
// insertTable("newKanban");

// // Fetch a specific user (example: id = 2)
// getUser(2);

// // Fetch all users
// getUsers();

// export {insertTable, getUsers }
