import { useState } from "react";
import { moviesList } from "../data";
import { bookMovie } from "../store/Slice";
import { useDispatch } from "react-redux";

import { BiCameraMovie } from "react-icons/bi";


const MovieBooking = ({ movieToHome }) => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const [selectedMovie, setSelectedMovie] = useState(""); // State to track the selected movie

  // Function to handle movie selection
  const handleChange = (movie) => {
    setSelectedMovie(movie); // Update the selected movie in the component's state
    movieToHome(movie); // Send the selected movie back to the parent component via props
    dispatch(bookMovie(movie)); // Dispatch the selected movie to the Redux store
  };

  return (
    <div className="flex flex-col gap-4 border-2  rounded-md p-4" >
      <div className="flex gap-6 items-center">
      <BiCameraMovie className="text-3xl text-white" />
      <h1 className="flex font-serif font-bold text-xl  underline text-white">Movies</h1>
      </div>
      <div className="flex flex-wrap border-black gap-4">

         {/* List of movies */}
        {moviesList.map((movie, index) => (
          <button
          key={index}
          onClick={() => handleChange(movie)}// Set movie as selected on click
          className={`px-4 py-3 text-center text-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            movie === selectedMovie
            ? "bg-green-500 text-white border border-white "// Apply active styling if movie is selected
              : "bg-lime-200 text-black border-2  border-black hover:bg-blue-500 hover:border-blue-700" // Default styling
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
