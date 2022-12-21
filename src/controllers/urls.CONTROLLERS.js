import { nanoid } from "nanoid";
import { insertUrl, getUrl, getUrlByShortUrl, updateVisitCount, deleteUrlById } from "../repository/urls.REPOSITORY.js";


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

export async function sendSpecificUrl(req, res){
    const {id} = req.params

    try{
        const url = await getUrl(id)

        res.status(200).send(url.rows[0])
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function redirectUser(req,res){
    const {shortUrl} = req.params

    try{
        const url = await getUrlByShortUrl(shortUrl)

        await updateVisitCount(url.rows[0].id)

        res.redirect(url.rows[0].url)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function deleteUrl(req,res){
    const {id} = req.params

    try{
        await deleteUrlById(id)

        res.sendStatus(204)
        return
    }catch{
        res.status(500).send({message: err})
        return
    }
}