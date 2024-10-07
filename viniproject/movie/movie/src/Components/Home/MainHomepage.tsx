import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from './Navbar';



const MainHomepage = () => {
  
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        pauseOnFocus: true,
        slickNext: true,
       slickPrev: true,
        // previousArrow: ,
        // nextArrow: true,
    };



    const images = [
        '/new.png',
        '/class.png',
        '/home.png',
        '/home2.png',
        '/mi.png',
    ];


    const setting2 = {
        dots: false,
        infinite: true,
        speed: 500,
        // slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        slidesToShow: 7, // Default value for larger screens
        responsive: [
            {
                breakpoint: 640, // Small screens
                settings: {
                    slidesToShow: 4, // Show 4 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Medium screens
                settings: {
                    slidesToShow: 7, // Show 7 slides
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const movies = [
      '/bigi.png',
      '/kabali.png',
      '/vikram.png',
      '/movie1.png',
      '/movie2.png',
      '/movie3.png',
      '/movie4.png',
    ]


    return (
      <div className=" m-0 p-0">
         <Navbar />
        <div className="relative ">
            <Slider ref={sliderRef} {...settings} >
                {images.map((image, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <img src={image} alt={`Slide ${index + 1}`} className='mt-16 w-full min-h-[150px] max-h-[150px] sm:min-h-[500px] sm:max-h-[700px]  p-4  h-[80%] sm:rounded-2xl' />
                    </div>
                ))}
            </Slider>
            <div className="">

            <div className=" mt-9">

              <h3 className=' text-sm sm:text-2xl font-serif uppercase underline ml-4'> telugu movies</h3>
                <Slider {...setting2}>
                    {movies.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={image} alt={`Slide ${index + 1}`} className='img w-[300px] h-32     sm:w-[300px] sm:h-[300px] sm:p-4' />
                          
                        </div>
                    ))}
                </Slider>
            </div>

            <div className=" mt-4">

            <h3 className=' text-sm sm:text-2xl font-serif uppercase underline ml-4'> tamil movies</h3>

                <Slider {...setting2}>
                    {movies.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={image} alt={`Slide ${index + 1}`} className='img w-[300px] h-32     sm:w-[300px] sm:h-[300px] sm:p-4' />
                            
                        </div>
                    ))}
                </Slider>
            </div>

            <div className=" mt-4">
            <h3 className='text-sm sm:text-2xl font-serif uppercase underline ml-4'> All movies</h3>

                <Slider {...setting2}>
                    {movies.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={image} alt={`Slide ${index + 1}`} className='img w-[300px] h-32     sm:w-[300px] sm:h-[300px] sm:p-4' />
                            
                        </div>
                    ))}
                </Slider>
            </div>
            </div>
              
            
            
            
        </div>
      </div>
    );
};

export default MainHomepage;
