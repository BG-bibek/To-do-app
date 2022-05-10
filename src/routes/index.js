import express from 'express';
let router = express.Router();

router.get('/',(req,res,next)=>{res.send('Hello !')})

export default router;