import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utiles/db.js';

import userRouter from './routers/userRouter.js';
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRouter);
app.get('/', (req, res) => {
  res.send('Welcome to TeamHub Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});