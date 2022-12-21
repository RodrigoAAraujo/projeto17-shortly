import { connection } from "../database/db.js";

export async function validateToken(token){

    try{
        const tokenInfo = connection.query(`SELECT token, user_id, active FROM sessions WHERE token=$1`,[token])

        return tokenInfo
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }

}

export async function getToken(email){

    try{
        const token = connection.query(`
            SELECT token FROM sessions JOIN users ON sessions.user_id = users.id
            WHERE users.email=$1 AND active=$2
        `, [email, true])

        return token
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function insertToken(email, token){
    try{
        const user_id =  await connection.query(`
            SELECT * FROM users WHERE email=$1
        `, [email])

        connection.query(`
            INSERT INTO sessions (token,user_id) VALUES ($1,$2)
        `, [token, user_id.rows[0].id])

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function verifyTokenUrlPermission(token, url_id){

    try{

        const urlUser = connection.query(`
            SELECT * FROM urls JOIN sessions ON sessions.user_id = urls.user_id 
            WHERE urls.id=$1 AND sessions.token=$2 AND sessions.active=$3
        `, [url_id, token, true])

        return urlUser

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }

}