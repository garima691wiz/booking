import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookSlot } from "../store/Slice";
import { slots } from "../data";
import { FaCalendarAlt,  } from 'react-icons/fa'; // For icons

const TimeBooking = ({ slotToHome }) => {
  const dispatch = useDispatch();
  const [slotData, setSlotData] = useState("");

  const handleChangeTime = (selectedSlot) => {
    setSlotData(selectedSlot);
    slotToHome(selectedSlot);
    dispatch(bookSlot(selectedSlot));
  };

  return (
    
    <div className="flex flex-col gap-4 border-2  rounded-md p-4 ">
          <div className="flex gap-6 items-center">
          <FaCalendarAlt className="text-white text-xl" />
      <h1 className=" text-white flex font-serif font-bold text-xl  underline">
        Time </h1>
        </div>
      <div className="flex flex-wrap gap-4">
        
        {slots.map((time, index) => (
          <button
          key={index}
          className={`px-6 py-3 border-2 rounded-lg font-semibold text-center cursor-pointer transition-colors duration-200 ${
            time === slotData
              ? "bg-green-500 text-white "
              : "bg-lime-200 text-black border-black hover:bg-blue-500 hover:border-blue-700"
          }`}
          onClick={() => handleChangeTime(time)}
        >
          {time}
        </button>
        
        ))}
      </div>
    </div>
  );
};

export default TimeBooking;
