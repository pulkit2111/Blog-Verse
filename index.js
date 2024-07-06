import express from 'express';

import session from 'express-session';
import passport from 'passport';
import './controller/passport-controller.js';

import MongoStore from 'connect-mongo';

import Router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials (cookies)
  };

app.use(cors(corsOptions));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: process.env.ACCESS_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI
      collectionName: 'sessions'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: 'lax' // Adjust based on your requirements
    }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',Router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = 3001;

app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`));
Connection;