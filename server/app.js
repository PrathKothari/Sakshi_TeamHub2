import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utiles/db.js';
import cookieParser from 'cookie-parser';

import userRouter from './routers/userRouter.js';
import teamRouter from './routers/teamRouter.js';
import joinRequestRouter from './routers/joinRequestRouter.js';
dotenv.config();

const app = express();

connectDB();

app.use(cors(
  {
    origin: 'http://localhost:5001', // Adjust this to your frontend UR
    credentials: true,
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/join-requests', joinRequestRouter);
app.get('/', (req, res) => {
  res.send('Welcome to TeamHub Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});