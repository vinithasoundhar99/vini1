import React , {useEffect, useState}from 'react';

import {Addmovie,ViewParticularMovie, updateMovie} from '../../Action/Admin';
import { useDispatch,useSelector } from 'react-redux';
import { useParams  } from 'react-router-dom';














const MovieForm = () => {

 const [data,setdata] = useState({
  title:"",
  description:"",
  director:"",
  cast: "",
  genres: "",
  releaseDate: Date,
  duration: 0,
  language: "",
  subtitles: "",
  trailerUrl: "",
 });

 const {id} = useParams();
 const dispatch = useDispatch();


 useEffect(()=>{
  if(id){
    dispatch(ViewParticularMovie(id) as any);
  }
 },[id,dispatch]);

 const particularmovie = useSelector((state:any)=>state.admin.particularmovie);

useEffect(()=>{
  if(particularmovie){
      setdata({
        ...data,
        ...particularmovie.movie,
      });
  }
},[particularmovie]);

 const [posterUrl,setposterUrl] = useState<File |null>(null);

 const handleimage =(e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLFieldSetElement | any>)=>{
  setposterUrl(e.target?.files[0])
 }


 const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement |HTMLTextAreaElement>)=>{
  setdata({...data,[e.target.name]:[e.target.value]})
 }





 const handleSubmit = (e:React.FormEvent)=>{
  e.preventDefault();
  const newfomdata = new FormData();
  newfomdata.append('title',data.title || '');
  newfomdata.append('description',data.description || '');
  newfomdata.append('director',data.director || '');
  newfomdata.append('cast',data.cast || '');
  newfomdata.append('genres',data.genres || '');
  newfomdata.append('releaseDate',data.releaseDate.toString());
  newfomdata.append('duration',data.duration.toString());
  newfomdata.append('language',data.language || '');
  newfomdata.append('subtitles',data.subtitles || '');
  newfomdata.append('trailerUrl',data.trailerUrl || '');
  newfomdata.append('posterUrl',posterUrl as Blob);
  if(id){
    dispatch(updateMovie(id,newfomdata) as any);
  }else{
    dispatch(Addmovie(newfomdata) as any);  
  }
 }



  const heading = id ? "Update Movie" : "Add Movie";









  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded w-full mb-4"
        //   rows="4"
          required
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <input
          type="text"
          name="cast"
          onChange={handleChange}
          placeholder="Cast (comma separated)"
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />

        <input
          type="text"
          name="genres"
          onChange={handleChange}
          placeholder="Genres (comma separated)"
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />

        <input
          type="date"
          name="releaseDate"
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <input
          type="number"
          name="duration"
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <input
          type="text"
          name="language"
          onChange={handleChange}
          placeholder="Language"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <input
          type="text"
          name="subtitles"
          onChange={handleChange}
          placeholder="Subtitles (comma separated)"
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />

        <input
          type="file"
          name="posterUrl"
          onChange={handleimage}
          placeholder="Poster URL"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <input
          type="text"
          name="trailerUrl"
          onChange={handleChange}
          placeholder="Trailer URL"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
