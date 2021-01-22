import express from 'express';
import dotenv from 'dotenv';
import app from './app'
const result = dotenv.config();



const port = process.env.PORT || 8000;

app.listen(port,()=>console.log(`LISTENING TO REQUESTS on port ${port}`));





