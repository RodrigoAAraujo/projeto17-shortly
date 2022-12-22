import { validateToken } from "../repository/sessions.REPOSITORY.js"

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
        const session = await validateToken(token)

        if(session.rows.length === 0){
            res.sendStatus(404)
            return
        }

        if(session.rows[0].active === "FALSE"){
            res.sendStatus(401)
            return
        }

        next()
        
    }catch(err){
        res.status(500).send({message: err})
        return
    }

}

export default authValidation