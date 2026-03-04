import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`
);

export const verifyGoogleToken = async (accessToken) => {
  try {
    // Use the access token to get user info
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to verify token with Google');
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    throw new Error('Invalid Google token: ' + error.message);
  }
};

export const authenticateUser = async (googleData, accessToken, refreshToken) => {
  try {
    console.log("Google Data:", googleData);

    let user = await User.findOne({ googleId: googleData.id });

    if (!user) {
      user = new User({
        googleId: googleData.id,
        email: googleData.email,
        name: googleData.name,
        picture: googleData.picture,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken
      });
      await user.save();
    } else {
      user.googleAccessToken = accessToken;
      if (refreshToken) user.googleRefreshToken = refreshToken;
      user.accessTokenExpiry = new Date(Date.now() + 3600 * 1000);
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user,
      token: jwtToken
    };

  } catch (error) {
    console.log("AUTH ERROR:", error);
    throw new Error('Authentication failed: ' + error.message);
  }
};
export const getOAuth2Client = () => oauth2Client;
