import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
const app = express();

import('express-async-errors');
import connectDB from './db/connect.js';
require('dotenv').config();

import path from 'path';

import authRouter from './routes/authRouter.js';
import withdrawRouter from './routes/withdrawRouter.js';

import notificationRouter from './routes/notificationRouter.js';
import addFundRouter from './routes/addFundRouter.js';
import accountRouter from './routes/accountRouter.js';

// import uploadRouter from './routes/uploadRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import fileUpload from 'express-fileupload';

import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';

let originUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5173'
    : 'https://pledge-bank.com';

// let originUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:5173'
//     : 'https://pledgebank.netlify.app';

app.use(
  cors({
    origin: originUrl,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());

app.use(fileUpload());

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/withdraw', withdrawRouter);
app.use('/api/addFund', addFundRouter);

app.use('/api/upload', uploadRouter);
app.use('/api/account', accountRouter);
app.use('/api/notification', notificationRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

start();
