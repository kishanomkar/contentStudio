import express from "express";
import {authenticate} from "../middleware/auth.js";
import { processComments } from "../services/commentProcessorService.js";
import User from "../models/User.js";
import { fetchComments } from "../services/youtubeService.js";



const youtubeRouter = express.Router();

youtubeRouter.post("/process/:videoId", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const result = await processComments(user, req.params.videoId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


youtubeRouter.get("/comments/:videoId", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const comments = await fetchComments(user, req.params.videoId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default youtubeRouter;
