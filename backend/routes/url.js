import express from 'express'
import {getUrls, redirectToUrl, shorturl} from '../controllers/url.js'


 const router=express.Router();

router.post('/',shorturl)
router.get('/',getUrls)
router.get('/:shortId',redirectToUrl)

 export default router;