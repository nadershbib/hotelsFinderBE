import express from 'express';
import { addHotel, addReview, deleteHotel, getHotels, getSingleHotel, getSingleReviews, updateHotel } from '../controllers/hotelController';


const router = express.Router();



router
 .route('/')
 .get(getHotels)
 .post(addHotel)


router
 .route('/:id')
 .get(getSingleHotel)
 .put(updateHotel)
 .delete(deleteHotel)
 
 
 router
   .route('/:id/reviews')
   .post(addReview)
   .get(getSingleReviews)




export default router;

