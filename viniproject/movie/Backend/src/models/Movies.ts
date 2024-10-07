import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export interface IRating {
    user: mongoose.Schema.Types.ObjectId; // Reference to the User model
    rating: number; // User's rating
    review?: string; // Optional review text
}

export interface IMovie extends mongoose.Document {
    title: string;
    description: string;
    director: string;
    cast: string[];
    genres: string[];
    releaseDate: Date;
    duration: number;
    ratings: IRating[]; // Array of ratings
    averageRating: number; // Field for average rating
    numberOfRatings: number; // Field for total number of ratings
    language: string;
    subtitles: string[];
    posterUrl: string;
    trailerUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,   
        trim: true,       
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: [{
        type: String,      
        required: true,
    }],
    genres: [{
        type: String,
        required: true,    // Array of genres (as strings)
    }],
    releaseDate: {
        type: Date,
        required: true,    // Date of movie release
    },
    duration: {
        type: Number,      // Duration in minutes
        required: true,
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer', 
            required: true   
        },
        rating: {
            type: Number,   
            min: 0,
            max: 10,
            required: true   
        },
        review: {
            type: String,
            default: ""      
        }
    }],
    averageRating: {
        type: Number,
        default: 0,       
    },
    numberOfRatings: {
        type: Number,
        default: 0,       
    },
    language: {
        type: String,      
        required: true,
    },
    subtitles: [{
        type: String,       
    }],
    posterUrl: {
        type: String,       
    },
    trailerUrl: {
        type: String,       
    },
    createdAt: {
        type: Date,
        default: Date.now,  
    },
    updatedAt: {
        type: Date,
        default: Date.now,  
    }
});

// Middleware to update the `updatedAt` field
movieSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Calculate average rating method
movieSchema.methods.calculateAverageRating = function () {
    if (this.ratings.length > 0) {
        const sum = this.ratings.reduce((acc: number, rating: { rating: number }) => acc + rating.rating, 0);
        this.averageRating = sum / this.ratings.length; 
    } else {
        this.averageRating = 0;
    }
    return this.averageRating;
};

// Update number of ratings method
movieSchema.methods.updateNumberOfRatings = function () {
    this.numberOfRatings = this.ratings.length; // Update the count of ratings
    return this.numberOfRatings;
};

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
