import express from 'express';
import apiKeyRoutes from './routes/apiKeyRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.use('/', apiKeyRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});