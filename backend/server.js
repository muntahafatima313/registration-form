const express = require('express')
const mysql=require('mysql')
const cors=require('cors')
const port=3001
const bcrypt = require('bcrypt');

const app = express()
app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
})

db.connect(err=>{
    if(err) throw err;
    console.log("Connect to MySQL");

    db.query('CREATE DATABASE IF NOT EXISTS form_data',(err,result)=>{
        if(err) throw err;
        console.log("Database Created/Already Exists");


    db.changeUser({database:'form_data'},err=>{
        if(err) throw err;
    

        const createTableQuery=`
        CREATE TABLE IF NOT EXISTS userdata(
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        conPassword VARCHAR(255) NOT NULL
        )`;
     
    db.query(createTableQuery,(err,result)=>{
        if(err) throw err;
        console.log('Table Created/Already Exists');
  

    });
});
    });
});

app.post('/submit',(req,res)=>{
    const {firstName,lastName,email,password,conPassword}=req.body
    const emailQueryCheck=`SELECT * FROM userdata WHERE email = ?`;
    db.query(emailQueryCheck,[email],async(err,result)=>{
        if(err){
            console.log('Error checking email',err);
            return res.status(500).send('Error checking email');
        }
        if(result.length>0){
            return res.status(400).send('Email already exists');
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const insertQuery = `INSERT INTO userdata(firstName, lastName, email, password) VALUES(?, ?, ?, ?)`;
          db.query(insertQuery, [firstName, lastName, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data', err);
                res.status(500).send('Error inserting data');
              } else {
                console.log('Data inserted');
                res.send('Form submitted successfully');
              }
    })
    

    })
})


app.listen(port,()=>{

    console.log(`Server is running on http://localhost:${port}`)
})

