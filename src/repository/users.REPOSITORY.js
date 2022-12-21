import { connection } from "../database/db.js";

export async function checkEmailEsitence(email){
    try{
        const exist = connection.query(`SELECT * FROM users WHERE email=$1`, [email])

        return exist
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function insertUser(name, email, password){
    try{
        connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name,email,password])
    }
    catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function getUser(email){
    try{
        const user = connection.query(`SELECT * FROM users WHERE email=$1`, [email])

        return user
        
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}