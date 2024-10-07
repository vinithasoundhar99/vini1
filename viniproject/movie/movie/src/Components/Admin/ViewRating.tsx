import React , {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getRating } from '../../Action/Admin';

const ViewRating = () => {




    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRating() as any);
    },[dispatch]);


    const rating = useSelector((state:any)=>state.admin.rating);

    console.log(rating,"rating");



  return (
    <div>
         <div className="flex flex-col items-center p-4 bg-gray-100">
      
      <h2 className="text-2xl font-bold mb-6">Movie List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rating && rating.map((movie:any, index:any) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={`http://localhost:9000/uploads/posters/${movie.posterUrl}`} alt={movie.title} className="w-full min-h-[500px] max-h-[500px] object-cover  rounded mb-4 " />
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-600 mb-2">{movie.description}</p>
            <p className="font-bold">Director: {movie.director}</p>
            <p>Cast: {movie.cast.join(', ')}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Language: {movie.language}</p>
            <p>Subtitles: {movie.subtitles.join(', ')}</p>
            <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
              Watch Trailer
            </a>
            <p>numberOfRatings: {movie.numberOfRatings}</p>
          </div>
        ))}
      </div>
    </div>
      
    </div>
  )
}

export default ViewRating;
