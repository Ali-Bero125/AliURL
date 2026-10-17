import { nanoid } from 'nanoid';
import {URL} from '../models/url.js';


export async function shorturl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    let destination;
    try {
        destination = new globalThis.URL(body.url);
    } catch {
        return res.status(400).json({error:"url must be a valid http or https URL"})
    }
    if (!['http:', 'https:'].includes(destination.protocol)) {
        return res.status(400).json({error:"url must be a valid http or https URL"})
    }
const shortId=nanoid(8);

await URL.create({
    shortId:shortId,
    redirectURL:destination.href,
    visitHistory:[]
})
    return res.json({id:shortId,message:"short url created"})
}

export async function getUrls(req,res){
    const urls=await URL.find()
        .sort({createdAt:-1})
        .select('shortId redirectURL visitHistory createdAt updatedAt')
    return res.json(urls)
}

export async function redirectToUrl(req,res){
    const url=await URL.findOneAndUpdate(
        {shortId:req.params.shortId},
        {$push:{visitHistory:{timeStamp:Date.now()}}},
        {returnDocument:'after'}
    )
    if(!url) return res.status(404).json({error:"short url not found"})
    return res.redirect(url.redirectURL)
}