import Router from 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import Customer from '../models/Customer';
import Movie from '../models/Movies';
import mongoose from 'mongoose';


dotenv.config();


const router = Router();


// login admin
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email,password} = req.body;
        
        if(email === "admin@gmail.com" && password === "admin"){
            const token = jwt.sign({email:email},process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNjkxODE1MCwiaWF0IjoxNzI2OTE4MTUwfQ.4EkABq7L8xTmroLT3L8UunGFH3uayO4V1yJRmYEVnCc",{expiresIn:"1h"});
            res.cookie("accesstoken",token,{httpOnly:true,secure:true,sameSite:"none"});
            return res.status(200).json({
                message:"Login successful",
                token
            });
        }
    }catch(error:any){
        res.status(500).json({
            message:error.message
        });
    }
});



// verify the token
const verifytoken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies?.accesstoken;
 
    if(!token){
        return res.status(401).json({
            message:"Unauthorized! Login"
        });
    }
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNjkxODE1MCwiaWF0IjoxNzI2OTE4MTUwfQ.4EkABq7L8xTmroLT3L8UunGFH3uayO4V1yJRmYEVnCc");
        req.body.verified = verified;
        next();
    }catch(error){
        return res.status(400).json({
            message:"Unauthorized! Login"
        });
    }
}



// add movie
const storage = multer.diskStorage({
    destination : (req:Request,file:Express.Multer.File, cb:Function)=>{
       const dir = path.join(__dirname,`../uploads/posters`);
       if(!fs.existsSync(dir)){
              fs.mkdirSync(dir,{recursive:true});
       }
         cb(null,dir);
    },
    filename:(req:Request,file:Express.Multer.File,cb:Function)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});


const upload = multer({
    storage:storage,
});


router.post('/add-movie',upload.single('posterUrl'),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {title,cast,genres,releaseDate,duration,language,subtitles,trailerUrl,description,director} = req.body;
        const posterUrl = req.file?.filename;
        const movie = await Movie.findOne({title:title});
        if(movie){
            return res.status(400).json({
                message:"Movie already exists"
            });
        }
        const newMovie = new Movie({
            title,
            cast,
            genres,
            releaseDate,
            duration,
            language,
            subtitles,
            trailerUrl,
            posterUrl,
            description,
            director
        });
        await newMovie.save();
        res.status(200).json({
            message:"Movie added successfully"
        });
    }catch(error:any){
        res.status(500).json({
            message:error.message
        });
    }
});



// get all movies or search by title
router.get('/movies',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = page * limit - limit;

        const {title,director,genres,language,cast}  = req.query;
        
        let query = {};

        if(title || director || genres || language || cast){
            query = {
                title:{$regex:title,$options:"i"},
                director:{$regex:director,$options:"i"},
                genres:{$in:genres},
                language:{$regex:language,$options:"i"},
                cast:{$in:cast}
            }
        }
        let movies 
        if(query){

            movies = await Movie.aggregate([
               {
                   $match:query
               },
               {
                   $limit:limit
   
               },
               {
                   $skip:skip
               }
           ]);
        }else{
            movies = await Movie.find().limit(limit).skip(skip);
        }

        res.status(200).json({
            message:"Movies fetched successfully",
            movies
        });



    }catch(error:any){
        console.log(error);
        res.status(500).json({
            message:error.message
        });
    }
});



// get movie by id
router.get('/movie/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        return res.status(200).json({
            message:"Movie found",
            movie
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});



// update movie
router.put('/update-movie/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json({
            message:"Movie updated successfully",
            updatedMovie
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});

// delete movie
router.delete('/delete-movie/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        await Movie.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Movie deleted successfully"
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});




// get the all customer 
router.get('/customers',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const customers = await Customer.find();
        return res.status(200).json({
            message:"Customers fetched successfully",
            customers
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});


// get the rating of the movie
router.get('/ratings/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.aggregate([
            {
                $match:{_id:new mongoose.Types.ObjectId(req.params.id)}
            },
           {
            $lookup:{
                from:"customers",
                localField:"ratings.user",
                foreignField:"_id",
                as:"ratings"
            }
           }
        ]);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        return res.status(200).json({
            message:"Ratings fetched successfully",
            movie:movie[0]
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});




// view the rating
router.get('/view-rating',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.aggregate([
            {
                $match:{
                    numberOfRatings:{
                        $gt:0
                    }
                }
            }
            
        ]);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        return res.status(200).json({
            message:"Rating fetched successfully",
            movie
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
}   );  



// dashboard
router.get('/dashboard',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log("dashboard")
        const totalMovies = await Movie.countDocuments();
        const totalCustomers = await Customer.countDocuments();
        const totalRatings = await Movie.aggregate([
            {
                $group:{
                    _id:null,
                    totalRatings:{$sum:"$numberOfRatings"}
                }
            }
        ]);
   
        const totalMoviesinMonth = await Movie.aggregate((
            [
                {
                    $group:{
                        _id:{$month:"$createdAt"},
                        totalMovies:{$sum:1}
                    }
                }
            ]
        ))
        
        // here i want the total customers by month wise using group by
        const totalCustomersinMonth = await Customer.aggregate((
            [
                {
                    $group:{
                        _id:{$month:"$createdAt"},
                        totalCustomers:{$sum:1}
                    }
                }
            ]
        ));


        // const totalRatingsinMonth = await Movie.aggregate([
        //     {
        //         $match:{
        //             createdAt:{
        //                 $gte:new Date(new Date().setDate(new Date().getDate()-30))
        //             }
        //         }
        //     },
        //     {
        //         $group:{
        //             _id:null,
        //             totalRatings:{$sum:"$numberOfRatings"}
        //         }
        //     }
        // ]);









        return res.status(200).json({
            message:"Dashboard fetched successfully",
            totalMovies,
            totalCustomers,
            totalRatings:totalRatings[0].totalRatings,
            totalMoviesinMonth:totalMoviesinMonth,
            totalCustomersinMonth:totalCustomersinMonth,
           

        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});


router.get('/logout',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        res.clearCookie("accesstoken");
        return res.status(200).json({
            message:"Logged out successfully"
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});








export default router;
