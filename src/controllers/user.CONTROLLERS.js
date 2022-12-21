import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

import { getToken, insertToken } from '../repository/sesssions.REPOSITORY.js'
import { getUser, insertUser } from '../repository/users.REPOSITORY.js'

export async function registerUser(req, res){
    const {name, password, email} = req.body

    const encryptedPass = bcrypt.hashSync(password, 12)

    try{
        await insertUser(name, email, encryptedPass)

        res.sendStatus(201)
        return
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function sendToken(req,res){
    const{email} = req.body

    try{
        const tokens = await getToken(email)

        if(tokens.rows.length > 0){
            res.status(200).send(tokens.rows[0])
            return
        }

        const createToken = uuidV4()

        await insertToken(user_id, createToken)

        res.status(200).send({token: createToken})
        return

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}