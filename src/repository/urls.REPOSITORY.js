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

export async function getUrl(id){

    try{
        const url = connection.query(`
            SELECT id, "shortUrl", url FROM urls WHERE id=$1
        `, [id])

        return url

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function getUrlByShortUrl(shortUrl){

    try{
        const url = connection.query(`
            SELECT id, "shortUrl", url FROM urls WHERE "shortUrl"=$1
        `, [shortUrl])

        return url

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function updateVisitCount(id){

    try{
        connection.query(`
            UPDATE urls SET "visitCount"="visitCount"+1 WHERE id=$1
        `, [id])

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function deleteUrlById(id){

    try{
        connection.query(`
            DELETE FROM urls WHERE id=$1
        `, [id])

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}