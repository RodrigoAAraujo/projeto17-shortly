import { nanoid } from "nanoid";
import { insertUrl } from "../repository/urls.REPOSITORY.js";

export async function storageSendShorts(req, res){
    const {url} = req.body
    const {authorization} = req.headers

    const token = authorization.replace("Bearer ", "")


    try{
        const shortUrl = nanoid.apply(url)

        await insertUrl(url, shortUrl, token)

        res.send({shortUrl})
        return
    }catch(err){
        res.status(500).send({message: err}) 
        return
    }
}