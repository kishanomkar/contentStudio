import express from 'express';
import { verifyGoogleToken, authenticateUser, getOAuth2Client } from '../services/googleAuthService.js ';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Google OAuth callback
router.post('/google-auth', async (req, res) => {
  try {
    console.log("Body:", req.body);

    const { accessToken, refreshToken } = req.body;

    const googleData = await verifyGoogleToken(accessToken);
    console.log("Google:", googleData);

    const result = await authenticateUser(googleData, accessToken, refreshToken);

    res.json(result);

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Logout (optional - client-side token removal is primary)
router.post('/logout', authenticate, (req, res) => {
  res.json({ success: true });
});

export default router;
