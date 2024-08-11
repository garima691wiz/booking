import { useState, useEffect,  } from "react";
import { seats } from "../data";
import { useDispatch } from "react-redux";
import { bookSeat } from "../store/Slice";
import { FaFilm } from 'react-icons/fa'; // For icons

const SeatBooking = ({ seatsData }) => {
  const dispatch = useDispatch();
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
    const value = Number(newValue);
    setInputs(prevInputs => {
      const updatedInputs = { ...prevInputs, [seatName]: value };
      dispatch(bookSeat(updatedInputs)); // Update Redux store
      return updatedInputs;
    });
  };

  // Notify parent component about input changes
  useEffect(() => {
    seatsData(inputs);
  }, [inputs, seatsData]);

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex gap-6 items-center">
        <FaFilm className="text-2xl text-white" />
        <h1 className="flex font-serif font-bold text-xl underline text-white">Seats</h1>
      </div>
      <div className="flex flex-wrap gap-4 text-white font-semibold">
        {seats.map((seatName, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="flex font-semibold px-[10px]" htmlFor={index}>
              {seatName}
            </label>
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
              value={inputs[seatName] || ""}
              onChange={(e) => handleChangeSeats(seatName, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;
