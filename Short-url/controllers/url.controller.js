const shortid = require("shortid");
const URL=require('../models/model')
async function handleGenrateNewShortURL(req,res){
    const body =req.body;
    if(!body.url) return res.status(400).json({error:'url is requried'})
    const shortID=shortid();
    await URL.create({
        shortID:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.json({ id: shortID});
}
module.exports ={
    handleGenrateNewShortURL,
} 