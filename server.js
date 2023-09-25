const express = require('express')
require("colors");
require('dotenv').config();
const { Pool, Client } = require("pg");
const app = express()
app.use(express.json());

const PORT = 8080;
const pool = new Pool();

app.get("/", (req,res)=>{
    res.send("Welcome")
});

app.get('/users', (req, res)=> {
    pool
    .query("SELECT * FROM users;")
    .then((data) => res.json(data.rows))
    .catch((e) =>res.sendStatus(500).send("Something went wrong"));
    pool.end();
});

app.get('/users/:id', (req,res)=>{
    const {id} = req.params;
    pool
    .query("SELECT * FROM users WHERE id = $1;", [id])
    .then ((data)=> res.json(data.rows))
    .catch((e) => res.sendStatus(500).json(e));
});

app.post('/users', (req, res)=>{
    const {first_name, last_name, age, active} = req.body
    pool
    .query("INSERT INTO users (first_name, last_name, age, active) VALUES ($1,$2, $3, $4)", [first_name, last_name, age, active])
    .then((data)=>res.json(data.rows))
    .catch((e)=>res.sendStatus(500).json(e));
});

// app.put('/user/:id', (req,res)=>{
//     const {id} = req.params;
//     pool
//     .query("")
//     .then((data)=>res.json(data.rows))
//     .catch((e)=>res.sendStatus(500).json(e));
// });

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`.rainbow);
});