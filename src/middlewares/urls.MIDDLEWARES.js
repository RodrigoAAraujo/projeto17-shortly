import { getUrl, getUrlByShortUrl } from "../repository/urls.REPOSITORY.js"
import { verifyTokenUrlPermission } from "../repository/sessions.REPOSITORY.js"

export async function validateUrlExistence(req,res,next){
    const {id} = req.params

    try{
        const url = await getUrl(id)

        if(url.rowCount === 0){
            res.sendStatus(404)
            return
        }

        next()
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function validateShortUrlExistence(req,res,next){
    const {shortUrl} = req.params

    try{
        const url = await getUrlByShortUrl(shortUrl)

        if(url.rowCount === 0){
            res.sendStatus(404)
            return
        }

        next()
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function validateUrlOwner(req,res,next){
    const {authorization} = req.headers
    const {id} = req.params

    const token = authorization.replace("Bearer ", "")

    try{
        const userOwner = await verifyTokenUrlPermission(token, id)
 
        if(userOwner.rowCount === 0){
            res.sendStatus(401)
            return
        }

        next()
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}