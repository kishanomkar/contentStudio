import express from 'express';
import { enhancePrompt,generateImage } from '../controllers/controller.js';

const router = express.Router();

// Maps to: POST http://localhost:3001/api/enhance
router.post('/api/enhance', enhancePrompt);

// Maps to: POST http://localhost:3001/api/generate
router.post('/api/generate', generateImage);

router.get('/',(req,res)=>{
    res.send("Welcome to the Thumbnail Studio API! Use it to enhance prompts and to create images.");
})

export default router;