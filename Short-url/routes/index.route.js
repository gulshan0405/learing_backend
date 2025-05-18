const express =require('express');
const {handleGenrateNewShortURL, handleGetAnalytics} =require('../controllers/url.controller');

const router = express.Router();

router.post('/',handleGenrateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports=router;