import { connection } from "../database/db.js";

export async function checkToken(token){
    return (connection.query(`SELECT * FROM session WHERE token=$1`,[token])).rows
}