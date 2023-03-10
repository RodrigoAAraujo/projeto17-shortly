import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

import { getToken, insertToken } from '../repository/sessions.REPOSITORY.js'
import { getUserLinks, insertUser, getRank } from '../repository/users.REPOSITORY.js'

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

        await insertToken(email, createToken)

        res.status(200).send({token: createToken})
        return

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function sendMyInfo(req,res){
    const {authorization} = req.headers

    const token = authorization.replace("Bearer ", "")

    try{
        const linksUser = await getUserLinks(token)

        res.send(linksUser)
        return

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function sendRank(req,res){

    try{
        const rank = await getRank()

        res.send(rank.rows)
        return
        
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}