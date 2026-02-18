
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import config from './config';
import connectToMongoDB from './lib/mongoose';
import { errorHandler } from './middleware/errorHandler';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import path from 'path';
import router from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

connectToMongoDB()

// app.use(loggerMiddleware)

app.use('/', router)

app.use(errorHandler)

app.listen(config.commonConfig.port, () => {
  console.log(`Server is running on port ${config.commonConfig.port}`);
});