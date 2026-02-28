import express from 'express';
import cors from 'cors';
import thumbnailRoutes from './routes/route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routes under the '/api' prefix
app.use('/contentStudio', thumbnailRoutes);


export default app;