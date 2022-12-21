import { checkToken } from "../repository/sesssions.REPOSITORY"

async function authValidation(req,res,next){
    const {authorization} = req.headers

    if(!authorization.includes("Bearer ")){
        res.sendStatus(401)
        return
    }

    const token = authValidation.replace("Bearer ", "")

    try{
        const session = await checkToken(token)

        if(session.length === 0){
            res.sendStatus(401)
            return
        }

        if(session[0].active === "FALSE"){
            res.sendStatus(401)
            return
        }

        next()
        
    }catch(err){
        res.status(500).send({message: err})
    }

}

export default authValidation