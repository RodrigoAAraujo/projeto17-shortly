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

export async function insertToken(user_id, token){
    try{
        connection.query(`INSERT INTO sessions (token,user_id) VALUES ($1,$2)`, [token, user_id])

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}