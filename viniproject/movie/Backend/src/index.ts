import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import customer from './Controller/Customer';
import admin from './Controller/Admin';
import cookieparser from 'cookie-parser';
import path from 'path';



dotenv.config();

const app = express();
app.use(cors(
  
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000;

const server = async () => {
  try {
   db();
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

server();


app.use('/api/user', customer);
app.use('/api/admin', admin);