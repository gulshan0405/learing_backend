const express =require('express');
const {handleGenrateNewShortURL} =require('../controllers/url.controller');

const router = express.Router();

router.post('/',handleGenrateNewShortURL);

module.exports=router;