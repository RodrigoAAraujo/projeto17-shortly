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

export async function getUserLinks(token){
    try{
        const urlsUser = await connection.query(`
            SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
            FROM sessions JOIN urls ON sessions.user_id = urls.user_id
            WHERE sessions.token=$1
        `, [token])

        const userInfo = await connection.query(`
            SELECT users.id, users.name, SUM(urls."visitCount")
            AS "visitCount" FROM sessions 
            JOIN urls ON sessions.user_id = urls.user_id
            LEFT JOIN users ON sessions.user_id = users.id
            WHERE sessions.token=$1
            GROUP BY users.id
        `, [token]) 

        const userSpec = userInfo.rows[0] 

        const sendInfo = {
            id: userSpec.id,
            name: userSpec.name,
            visitCount: userSpec.visitCount,
            shortenedUrls: urlsUser.rows
        }

        return sendInfo
        
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function getRank(){

    try{
        const rank = connection.query(`
            SELECT users.id, users.name, COUNT(urls.id) AS "linksCount" , 
            SUM( CASE WHEN urls."visitCount" IS NULL THEN 0 ELSE 1 END) AS "visitCount" 
            FROM users LEFT JOIN urls ON users.id = urls.user_id
            GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10
        `)

        return rank
        
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}