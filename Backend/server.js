const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_crud"
});

app.get('/', (req, res) => {
    return res.json("Backend is running");
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req, res) => {
    const { first_name, last_name, email } = req.body;
    const sql = "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)";
    db.query(sql, [first_name, last_name, email], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "User added successfully", userId: result.insertId });
    });
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "User deleted successfully" });
    });
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const sql = "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?";
    db.query(sql, [first_name, last_name, email, id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "User updated successfully" });
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
