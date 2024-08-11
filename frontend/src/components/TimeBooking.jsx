import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookSlot } from "../store/Slice";
import { slots } from "../data";
import { FaCalendarAlt,  } from 'react-icons/fa'; // For icons


// TimeBooking component to select and display available time slots
const TimeBooking = ({ slotToHome }) => {
  const dispatch = useDispatch();

  // State to keep track of the selected time slot
  const [slotData, setSlotData] = useState("");

  // Handler function for when a time slot is selected
  const handleChangeTime = (selectedSlot) => {
    setSlotData(selectedSlot); // Update local state with the selected slot
    slotToHome(selectedSlot); // Send the selected slot data to the parent component
    dispatch(bookSlot(selectedSlot)); // Dispatch the selected slot to the Redux store
  };


  return (
    
    <div className="flex flex-col gap-4 border-2  rounded-md p-4 ">
          <div className="flex gap-6 items-center">
          <FaCalendarAlt className="text-white text-xl" />
      <h1 className=" text-white flex font-serif font-bold text-xl  underline">
        Time </h1>
        </div>

          {/* Display time slots in a flexible, wrapping layout */}
      <div className="flex flex-wrap gap-4">
        {slots.map((time, index) => (
          <button
          key={index}
          className={`px-6 py-3 border-2 rounded-lg font-semibold text-center cursor-pointer transition-colors duration-200 ${
            time === slotData
              ? "bg-green-500 text-white "
              : "bg-lime-200 text-black border-black hover:bg-blue-500 hover:border-blue-700"
          }`}
          onClick={() => handleChangeTime(time)} // Call handler when a slot is clicked
        >
          {time}
        </button>
        
        ))}
      </div>
    </div>
  );
};

export default TimeBooking;
