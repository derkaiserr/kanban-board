// const http = require("http")
// const sqlite3 = require("sqlite3").verbose()

// const db = new sqlite3.Database("kanban.db", (err)=>{

// })

const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./kanban.db");

app.use(express.json());

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
