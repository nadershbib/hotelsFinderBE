import express from 'express'

import db from '../db/index'


// '/'

export const getHotels = async(req:any,res:any) =>{

 try{

     const results = await db.query(`select * from hotels left join (select hotel_id,count(*),trunc(AVG(rating),2)as avrg_rating from reviews group by hotel_id ) 
     reviews on hotels.id = reviews.hotel_id;`);
     
     res.status(200).json({
        message:'success',
        data:{
           hotels:results.rows
        }
     })
 }   

 catch(err){

     res.status(400).json({
         message:err.message
     })

 }



}



export const addHotel = async(req:any,res:any) =>{

    try{
        const {name,location,price_range} = req.body;
   
        const result = await db.query('INSERT INTO hotels(name,location,price_range)values($1,$2,$3) returning *',[name,location,price_range]);
        
        res.status(200).json({
           message:'successfully added hotel',
           data:{
              hotels:result.rows[0]
           }
        })
    }   
   
    catch(err){
   
        res.status(400).json({
            message:err.message
        })
   
    }
   
   
   
   }


// '/:id'


export const getSingleHotel = async(req:any,res:any) =>{

    try{
   
        const result = await db.query(`select * from hotels left join (select hotel_id,count(*),trunc(AVG(rating),2)as avrg_rating from reviews group by hotel_id ) 
        reviews on hotels.id = reviews.hotel_id where id=$1;`,[req.params.id]);
        
        res.status(200).json({
           message:'success',
           data:{
              hotel:result.rows[0]
           }
        })
    }   
   
    catch(err){
   
        res.status(400).json({
            message:err.message
        })
   
    }
   
   
   
   }



   export const updateHotel = async(req:any,res:any) =>{

    try{
        const {name,location,price_range} = req.body;
   
        const result = await db.query('UPDATE hotels SET name=$1,location=$2,price_range=$3 WHERE id=$4 returning *',[name,location,price_range,req.params.id]);
        
        res.status(200).json({
           message:'successfully updated hotel',
           data:{
              hotels:result.rows[0]
           }
        })
    }   
   
    catch(err){
   
        res.status(400).json({
            message:err.message
        })
   
    }
   
   
   
   }


   export const deleteHotel = async(req:any,res:any) =>{

    try{
   
        const foreignDelete = await db.query('DELETE FROM reviews where hotel_id=$1 ',[req.params.id])
        const result = await db.query('DELETE FROM hotels where id=$1',[req.params.id]);
        
        res.status(200).json({
           message:'successfuly deleted hotel',
           data:{
              hotel:result.rows[0]
           }
        })
    }   
   
    catch(err){
   
        res.status(400).json({
            message:err.message
        })
   
    }
   
   
   
   }



// Reviews


export const addReview = async (req:any,res:any) =>{

  try{

      const {name,rating,review,hotel_id} = req.body;  
      const result = await db.query('INSERT INTO reviews(hotel_id,name,review,rating) values($1,$2,$3,$4) returning *',[hotel_id,name,review,rating]);

     res.status(200).json({
         message:'successfuly added a review',
         data:{
            review:result.rows[0]
         }
     })
  }  
    
  catch(err){

    res.status(400).json({
        message:err.message

    })


  }



}



export const getSingleReviews = async (req:any,res:any) =>{

   try{

       const results = await db.query(`select * from reviews where hotel_id=$1`,[req.params.id]);

       res.status(200).json({
           message:'success',
           data:{
               reviews:results.rows
           }
       })

   } 
   catch(err){
 
    res.status(400).json({
        message:err.message

    })

   }

   

}






