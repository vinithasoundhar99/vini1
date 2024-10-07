import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { ViewMovie,updateMovie,deleteMovie } from '../../Action/Admin';
import { useNavigate } from 'react-router-dom';





















const MovieList = () => {

const dispatch = useDispatch();

const [movieId,setmovieId] = React.useState('');



useEffect(()=>{
  dispatch(ViewMovie() as any);
},[dispatch])


const movies = useSelector((state:any)=>state.admin.movies);
console.log(movies,"movies");


const handledelete = (id:string)=>{
  dispatch(deleteMovie(id) as any);
}






const navigateTo = useNavigate();



const addmovie = ()=>{
  navigateTo('/admin/addmovie');
};


const updateMovie = (id:string)=>{
  navigateTo(`/admin/addmovie/${id}`);
}








  return (
    <div className="flex flex-col items-center p-4 bg-gray-100">
        <div className=" justify-end items-end relative">
            <button onClick={addmovie} className=' sm:absolute sm:left-80 bg-blue-500 p-2 rounded-xl w-40 text-white text-xl font-serif'>add movie</button>
        </div>
      <h2 className="text-2xl font-bold mb-6">Movie List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies && movies.map((movie:any, index:any) => (
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
            <button onClick={()=>updateMovie(movie._id)}  className="bg-blue-500 text-white w-16 p-2 rounded mt-4">Edit</button>
            <button onClick={()=>handledelete(movie._id)}  className="bg-red-500 text-white p-2 rounded mt-2 ml-4">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
