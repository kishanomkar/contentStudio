import dotenv from 'dotenv';
// Initialize dotenv before importing any other files that might need env vars
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Thumbnail Studio Backend running on http://localhost:${PORT}`);
});