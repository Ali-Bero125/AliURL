import 'dotenv/config';
import express from 'express';
import { connectDB } from './connect.js';
import router from './routes/url.js';

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(express.json());
app.use('/url', router);

async function startServer() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error('MONGODB_URI is required. Set it in backend/.env to your MongoDB Atlas connection string.');
    }

    await connectDB(mongoUri);
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
}

startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
});
