import { connection } from "../database/db.js"

export async function insertUrl(url, shortUrl, token){

    try{
        const user_id =  await connection.query(`
            SELECT user_id FROM sessions WHERE token=$1
        `, [token])

        connection.query(`
            INSERT INTO urls ("shortUrl",url, user_id) VALUES ($1,$2,$3)
        `, [shortUrl, url, user_id.rows[0].user_id])
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}