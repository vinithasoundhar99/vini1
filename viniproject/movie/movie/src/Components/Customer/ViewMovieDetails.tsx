import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Customernavbar from './Customernavbar';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ViewParticularMovie,GiveRating } from '../../Action/User';







// Dummy movie data
const movieDetails = {
  title: "Example Movie",
  description: "This is a brief description of the movie.",
  director: "Jane Doe",
  cast: ["Actor One", "Actor Two", "Actor Three"],
  genres: ["Action", "Drama"],
  releaseDate: new Date(2023, 0, 1),
  duration: 120,
  ratings: {
    length: 5,
    averageRating: 4.2,
    review: "Great movie!",
    rating: 5,
    numberOfRatings: 100,
  },
  language: "English",
  subtitles: ["English", "Spanish"],
  posterUrl: "/home2.png",
  trailerUrl: "/trailer.mp4",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ViewMovieDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
    ],
  };

 

 



  const {id}:any = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewParticularMovie(id) as any);
  }, [id,dispatch]);




  const movie = useSelector((state:any) => state.user.movie);

  console.log(movie,"movie");


  const recomendation = useSelector((state:any) => state.user.recomendation);

  console.log(recomendation,"recomend movie");

  const user = localStorage.getItem('userInfo');

  const userInfo = user ? JSON.parse(user) : null;


  const handleSubmit = async () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    await dispatch(GiveRating(id, userInfo?._id, rating, review) as any);
    setModalOpen(false);
    setRating(''); 
    setReview(''); 
  };

  const movieLink =(id:string) =>{
    window.location.href = `/viewmovie/${id}`;
  }



 





  return (
    <div>
      <Customernavbar />
      <div className="flex items-center justify-center min-h-screen">
        {
          movie && 
  <div className="mt-20 p-5 items-center justify-center bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-xl font-bold">{movie.title}</h2>
    <img src={`http://localhost:9000/uploads/posters/${movie.posterUrl}`} alt={movieDetails.title} className="mt-4 mb-4" />
    <p>{movieDetails.description}</p>
    <p><strong>Director:</strong> {movie.director}</p>
    <p><strong>Cast:</strong> {movie?.cast[0]}</p>
    <p><strong>Genres:</strong> {movie?.genres[0]}</p>
    <p><strong>Release Date:</strong> {movie?.releaseDate}</p>
    <p><strong>Duration:</strong> {movie?.duration} minutes</p>
    <p><strong>Average Rating:</strong> {movie?.averageRating} ({movie?.numberOfRatings > 0 ?movie?.numberOfRatings : '' } ratings)</p>
    <button onClick={() => setModalOpen(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Give Rating</button>
  </div>
        }
</div>


      <div className="mt-9">
        <h3>Recommended Movies</h3>
        <Slider {...settings}>
          {recomendation && recomendation.map((image:any, index:number) => (
            <div key={index} className="flex justify-center items-center">
              <img src={`http://localhost:9000/uploads/posters/${image.posterUrl}`} alt={`Slide ${index + 1}`} className='img w-[300px] h-32 sm:w-[300px] sm:h-[300px] sm:p-4' onClick={()=>movieLink(image._id)} />
              <h4 className="mt-2"><span className=' font-serif font-bold'>MovieName:</span> {image.title} </h4>
            </div>
          ))}
        </Slider>
      </div>

      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded-lg">
      <h3 className="text-lg font-bold">Rate the Movie</h3>
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((star:number) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setRating(star)}
            // onMouseLeave={() => setRating(0)}
            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        className="mt-2 border p-2 w-full h-20"
      />
      <div className="mt-4 flex justify-end">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        <button onClick={() => setModalOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewMovieDetails;
