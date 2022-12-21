import { checkEmailEsitence, getUser } from "../repository/users.REPOSITORY.js"
import bcrypt from 'bcrypt'


export async function validateEmailExitence(req, res, next){
    const {email} = req.body

    try{
        const emailExistence = await checkEmailEsitence(email)

        if(emailExistence.rowCount !== 0){
            res.sendStatus(409)
            return
        }

        next()
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}

export async function validateUserExistence(req, res, next){
    const{email, password} = req.body

    try{
        const user = await getUser(email)

        if(user.rows.length === 0){
            res.sendStatus(401)
            return
        }
        
        const passwordValid = bcrypt.compareSync(password, user.rows[0].password)

        if(!passwordValid){
            res.status(401)
            return
        }

        next()

    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}