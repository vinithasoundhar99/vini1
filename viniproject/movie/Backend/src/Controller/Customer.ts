import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Customer from "../models/Customer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import Movie from "../models/Movies";
import mongoose from "mongoose";


dotenv.config();







const router = Router();

// register controller


const storage = multer.diskStorage({
    destination:(req:Request, file:Express.Multer.File,cb:Function)=>{
        const dir = path.join(__dirname, "../uploads/customer");

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }
        cb(null,dir);

    },
    filename:(req:Request, file:Express.Multer.File,cb:Function)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
})


const upload = multer({
    storage:storage,
});

router.post('/register',upload.single('image'),async(req:any,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password,conformPassword,phone,address} = req.body;
        const image = req.file?.filename;
        const customer = await Customer.findOne({email:email});
        if(customer){
            return res.status(400).json({
                message:"Customer already exists"
            });
        }
        if(password !== conformPassword){
            return res.status(400).json({
                message:"Password does not match"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newCustomer = new Customer({
            name,
            email,
            password:hashedPassword,
            conformPassword:hashedPassword,
            phone,
            address,
            image
        });

         const savedCustomer = await newCustomer.save();

         if(savedCustomer){
             return res.status(201).json({
                 message:"Customer created successfully",
                 customer:savedCustomer
             });
            }else{
                return res.status(400).json({
                    message:"Failed to create customer"
                });
            }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});





// login controller
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body;

        const customer = await Customer.findOne({email:email});
        if(!customer){
            return res.status(400).json({
                message:"Customer does not exist"
            });
        }


        const isMatch = await bcrypt.compare(password,customer.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        const payload = {
            customer:{
                id:customer._id
            }
        }

      const token =  jwt.sign(payload,process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNjkxODE1MCwiaWF0IjoxNzI2OTE4MTUwfQ.4EkABq7L8xTmroLT3L8UunGFH3uayO4V1yJRmYEVnCc",{expiresIn:3600});
      res.cookie("accesstoken",token,{httpOnly:true,secure:true,sameSite:"none"});
        return res.status(200).json({
            message:"Login successful",
            token,
            customer
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});





// verify token
const verifytoken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies?.accesstoken;
    console.log(token,"tokenss");
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNjkxODE1MCwiaWF0IjoxNzI2OTE4MTUwfQ.4EkABq7L8xTmroLT3L8UunGFH3uayO4V1yJRmYEVnCc");
        if(decoded){
            req.body.customer = decoded;
            next();
        }else{
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
    }catch(error){
        console.log(error);
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
};




// get the profile
router.get('/profile/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
     
     try{
        const customer = await Customer.findById(req.params.id);
        if(!customer){
            return res.status(404).json({
                message:"Customer not found"
            });
        }
        return res.status(200).json({
            message:"Customer found",
            customer
        });



     }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
     }

    









});









// update profile
router.put('/profile/:id',upload.single('image'),async(req:any,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password,conformPassword,phone,address} = req.body;
        const image = req.file?.filename;
        const customer = await Customer.findById(req.params.id);
        if(!customer){
            return res.status(404).json({
                message:"Customer not found"
            });
        }
        if(password !== conformPassword){
            return res.status(400).json({
                message:"Password does not match"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id,{
            name,
            email,
            password:hashedPassword,
            conformPassword:hashedPassword,
            phone,
            address,
            image
        },{new:true});

        if(updatedCustomer){
            return res.status(200).json({
                message:"Customer updated successfully",
                customer:updatedCustomer
            });
        }else{
            return res.status(400).json({
                message:"Failed to update customer"
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});



router.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
    try {
       const movies = await Movie.aggregate([
        {
            $group: {
                _id: "$language",
                movies: { $push: "$$ROOT" }
            }

        }
         ]);

        if (!movies) {
            return res.status(404).json({
                message: "Movies not found"
            });
        }

        return res.status(200).json({
            message: "Movies found",
            movies
        });



       
       

        

    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});




router.get('/movie/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        const recomendation = await Movie.aggregate([
            {
                $match:{
                    genres:movie?.genres
                }
            }
        ]);

       
        if(!movie && !recomendation){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        return res.status(200).json({
            message:"Movie found",
            movie,
            recomendation
        });
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});




// give rating to movie
router.post('/movie/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rating, review,customerid } = req.body;
        console.log(rating, review,customerid);
        const movie = await Movie.findById(req.params.id);
        
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        const newRating = {
            user: customerid,
            rating,
            review,
        };

        // Check if the user has already rated this movie
        const findRatingAlready = movie.ratings.find((r: any) => r.user === customerid);

        if (findRatingAlready) {
            return res.status(400).json({
                message: "Rating already given"
            });
        } else {
           
            movie.ratings.push(newRating);
       
            movie.numberOfRatings = movie.ratings.length;
           
            //  movie.calculateAverageRating(); 

            // calaculate average rating
            if (movie.ratings.length > 0) {
                const sum = movie.ratings.reduce((acc: number, rating: { rating: number }) => acc + rating.rating, 0);
                movie.averageRating = sum / movie.ratings.length;
            } else {
                movie.averageRating = 0;
            }

            
            
           
            const updatedMovie = await movie.save();
            return res.status(200).json({
                message: "Rating added successfully",
                movie: updatedMovie
            });
        }

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
}) 




// get the rating of movie
router.get('/movie-rating/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.aggregate([
            {
                $match:{
                    'ratings.user':new mongoose.Types.ObjectId(id)
                }
            },
        ]);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }else{
            return res.status(200).json({
                message:"Movie found",
                movie
            });
        }
    }catch(error:any){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
});




// logout
router.delete('/logout',async(req:Request,res:Response,next:NextFunction)=>{
    res.clearCookie("accesstoken");
    return res.status(200).json({
        message:"Logout successfully"
    });
});




export default router;
