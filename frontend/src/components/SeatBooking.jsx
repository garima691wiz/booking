import { useState, useEffect,  } from "react";
import { seats } from "../data";
import { useDispatch } from "react-redux";
import { bookSeat } from "../store/Slice";
import { FaFilm } from 'react-icons/fa'; // For icons

// SeatBooking component to allow users to select the number of seats for booking
const SeatBooking = ({ seatsData }) => {
  const dispatch = useDispatch();
  
 // State to manage the inputs for each seat
  const [inputs, setInputs] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });

  // Handle input changes
  const handleChangeSeats = (seatName, newValue) => {
    const value = Number(newValue);// Convert input to a number
    setInputs(prevInputs => {
      const updatedInputs = { ...prevInputs, [seatName]: value };
      dispatch(bookSeat(updatedInputs)); // Dispatch the updated seat data to the Redux store
      return updatedInputs;
    });
  };

   // Notify the parent component about the changes in seat inputs whenever they change
  useEffect(() => {
    seatsData(inputs);
  }, [inputs, seatsData]);

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex gap-6 items-center">
        <FaFilm className="text-2xl text-white" />
        <h1 className="flex font-serif font-bold text-xl underline text-white">Seats</h1>
      </div>

       {/* Seat selection inputs */}
      <div className="flex flex-wrap gap-4 text-white font-semibold">
        {seats.map((seatName, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="flex font-semibold px-[10px]" htmlFor={index}>
              {seatName}
            </label>
              {/* Input field for seat quantity */}
            <input
              id={index}
              className={`
                px-6 py-3 text-center text-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform text-white
                ${
                  inputs[seatName] > 0
                    ? "bg-green-500 text-white border-2 border-white"
                    : "bg-lime-200 text-black border-2 border-black hover:bg-blue-500 hover:border-blue-700"
                }
              `}
              min="0"
              max="20"
              type="number"
              placeholder="0"
              name={seatName}
              value={inputs[seatName] || ""} // Use an empty string if the input value is undefined
              onChange={(e) => handleChangeSeats(seatName, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;
