import { useState } from "react";
import { moviesList } from "../data";
import { bookMovie } from "../store/Slice";
import { useDispatch } from "react-redux";

import { BiCameraMovie } from "react-icons/bi";


const MovieBooking = ({ movieToHome }) => {
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState("");

  // This function will handle the selection of the movie
  const handleChange = (movie) => {
    setSelectedMovie(movie);
    movieToHome(movie);
    dispatch(bookMovie(movie));
  };

  return (
    <div className="flex flex-col gap-4 border-2  rounded-md p-4" style={{ width: '600px', height: '240px' }}>
      <div className="flex gap-6 items-center">
      <BiCameraMovie className="text-3xl text-white" />
      <h1 className="flex font-serif font-bold text-xl  underline text-white">Movies</h1>
      </div>
      <div className="flex flex-wrap border-black gap-4">
        {moviesList.map((movie, index) => (
          <button
          key={index}
          onClick={() => handleChange(movie)}
          className={`px-4 py-3 text-center text-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            movie === selectedMovie
            ? "bg-green-500 text-white border border-white "
              : "bg-lime-200 text-black border-2  border-black hover:bg-blue-500 hover:border-blue-700"
          }`}
        >
          {movie}
        </button>
        
        ))}
        
      </div>
    </div>
  );
};

export default MovieBooking;
