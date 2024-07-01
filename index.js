import express from 'express';
import Router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';

const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);

const PORT = 3001;

app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`));
Connection;
