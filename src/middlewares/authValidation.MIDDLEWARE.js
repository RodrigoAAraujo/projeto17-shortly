import { validateToken } from "../repository/sesssions.REPOSITORY.js"

async function authValidation(req,res,next){
    const {authorization} = req.headers

    if(!authorization){
        res.sendStatus(401)
        return
    }

    if(!authorization.includes("Bearer ")){
        res.sendStatus(401)
        return
    }

    const token = authorization.replace("Bearer ", "")

    try{
        console.log(token)
        const session = await validateToken(token)

        console.log(session)

        if(session.rows.length === 0){
            res.sendStatus(401)
            return
        }

        if(session.rows[0].active === "FALSE"){
            res.sendStatus(401)
            return
        }

        next()
        
    }catch(err){
        res.status(500).send({message: err})
    }

}

export default authValidation