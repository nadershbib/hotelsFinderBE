import express from 'express';
import morgan from 'morgan'
import HotelRouter from './routes/HotelRouter'
import cors from 'cors'

const app = express ();

// GLOBAL MIDDLEWARES

app.use(express.json())


app.use(cors())

app.use(morgan('tiny'))






// Routes

app.use('/api/v1/hotels',HotelRouter);


export default app;