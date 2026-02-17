
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import config from './config';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(config.commonConfig.port, () => {
  console.log(`Server is running on port ${config.commonConfig.port}`);
});