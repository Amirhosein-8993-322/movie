import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fade, Slide } from "react-awesome-reveal";
import { FaImdb } from "react-icons/fa";
import axios from 'axios';
const MovieBio = () => {
  const [bio, setBio] = useState([])
  const [similar, setSimilar] = useState([])
  let { id } = useParams();

  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://seeko.film/api/v1/ghost/get/movie/${id}`,
    headers: {}
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data.data.casts));
      setBio(response.data.data.movie)
      setInterval(() => {
        setSimilar(response.data.data.similar)                
      }, 100);
     
      // console.log('amir',response.data.data.similar);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    const a = similar.slice(0, 4)
    console.log();
    

  return (
    <>
      <div dir='rtl' className="w-full h-[25rem] relative">
        <div className="w-full h-full flex items-center justify-center">
          <img className="w-full h-full object-cover object-center" src={`https://thumb.upera.shop/thumb?w=1120&h=500&q=95&a=t&zc=1&src=https://cdn.upera.shop/s3/backdrops/${bio.backdrop}`} />
          <div className="bg-black/50 w-full h-full absolute"></div>
        </div>
        <div className="absolute top-0 mt-28 mr-12 flex">
          <div>
            <img className='object-cover object-center rounded-lg' src={`https://thumb.upera.shop/thumb?w=187&h=227&q=100&a=c&src=https://cdn.upera.shop/s3/posters/${bio.poster}`} />
          </div>
          <div className="mr-6 mt-2">
            <div>
              <h1 className="text-white font-bold text-2xl">{bio.name_fa}</h1>
            </div>
            <div className="mt-1">
              <span className="text-white text-sm">{bio.name}</span>
            </div>
            <div className="flex items-center text-white gap-4 mt-4">
              <p className="">{bio.genre_fa}</p>
            </div>
            <div className="flex items-center gap-2 text-white text-sm font-sans mt-6">
              <span>{bio.year}</span>
              |
              <span>{bio.age}</span>
              |
              <span>{bio.runtime + " " + "دقیقه"}</span>
              |
              <div className="flex items-center">
                <p className="ml-1 text-yellow-400 font-bold">IMDB</p>
                <span>{bio.rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 dir='rtl' className="text-white font-bold text-2xl mt-4 mr-4">داستان</h1>
      <div className="w-full h-auto px-4 py-2">
        <p dir='rtl' className="text-white">{bio.overview_fa}</p>
      </div>

      <h1 dir="rtl" className="text-white font-bold text-2xl sm:mr-10 mr-6 sm:mt-20 mt-28">مشابه</h1>
            <div className="w-full flex items-center justify-center">
                <div dir="rtl" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 gap-2 px-3 mt-4">
                    {a.map((x) => {
                        return (
                            <section className="w-52 h-72">
                                <a href={`/animation/${x.id}`}>
                                    <div key={x.id} className="w-52 h-64 mt-2 relative group">
                                        <img className="rounded-lg object-cover object-center sm:w-full sm:h-full w-[165px] h-56" alt={`${x.name_fa}`} title={`${x.name_fa}`} src={`https://thumb.upera.shop/thumb?w=208&h=257&q=256&a=c&src=https://cdn.upera.shop/s3/posters/${x.poster}`} />
                                        <span className="text-white text-sm line-clamp-1 mt-1 ">{x.name_fa}</span>
                                        <div className="absolute left-0 top-[-10%] opacity-0 rounded-lg group-hover:opacity-100 group-hover:top-[0] w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500">
                                            <div className="flex items-center w-full justify-between p-2">
                                                <Slide cascade>
                                                    <h1 className="text-black bg-yellow-400 px-5 rounded-lg py-3 text-sm w-0 h-0 flex items-center justify-center">{x.year}</h1>
                                                    <Fade cascade damping={0.05}>
                                                        <div className="flex items-center text-sm">
                                                            <p className="text-white ml-1">{x.rate}</p>
                                                            <FaImdb size={30} color='yellow' />
                                                        </div>
                                                    </Fade>
                                                </Slide>
                                            </div>
                                            <div dir='ltr'>
                                            <p className="text-white text-sm mt-3 px-4 line-clamp-1">{x.name}</p>
                                            <p className="text-white bg-emerald-400 w-12 ml-3 rounded-full h-5 text-sm mt-2 flex items-center justify-center line-clamp-1">{x.age}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </section>
                        )
                    })}
                </div>
            </div>
    </>
  )
}

export default MovieBio