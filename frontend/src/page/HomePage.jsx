import { useCallback, useMemo, useState } from "react";
import MovieBooking from "../components/MovieBooking";
import TimeBooking from "../components/TimeBooking";
import SeatBooking from "../components/SeatBooking";
import MyBookings from "../components/MyBookings";
import { useDispatch } from "react-redux";
import { Bookings } from "../store/Slice";
import { newBooking } from "../api-helpers/Api-helpers";
import Modal from "../components/Modal";
import { FaChair } from 'react-icons/fa'; // For icons

const HomePage = () => {
  const dispatch = useDispatch();


  // State to manage the shared data across components
  const [sharedData, setSharedData] = useState({
    movie: "",
    slot: "",
    seats: "",
  });
  console.log("data:", sharedData);

// Handlers to update shared data from child components
  const movieData = (data) => setSharedData({ ...sharedData, movie: data });
  const slotData = (data) => setSharedData({ ...sharedData, slot: data });

   // Memoized callback to update seat data to avoid unnecessary renders
  const seatsData = useCallback((data) => setSharedData((prevData) => ({
    ...prevData,
    seats: data
  })), []);

  // Memoized function to check if any seat has a negative value
  const checkNegativeValueOfSeats = useMemo(() => {
    return (seats) => Object.values(seats).some(seat => Number(seat) < 0);
  }, []);

  // Memoized function to check if all seats are set to zero
  const checkZeroValueOfSeats = useMemo(() => {
    return (seats) => Object.values(seats).every(seat => Number(seat) === 0);
  }, []);

   // State for managing the modal visibility and error messages
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to handle the "Book Tickets" button click
  const handleClick = () => {
    switch (true) {
      case !sharedData.movie:
        setShowModal(true);
        setErrorMsg("Select  movie!");
        break;
      case !sharedData.slot:
        setShowModal(true);
        setErrorMsg("Select a time!");
        break;
      case checkNegativeValueOfSeats(sharedData.seats) ||
        checkZeroValueOfSeats(sharedData.seats):
        setShowModal(true);
        setErrorMsg("Select valid seats!");
        break;
      default:
         // Dispatching the booking action to the Redux store
        dispatch(Bookings({ ...sharedData }));
        // Making an API call to save the booking data
        newBooking({ ...sharedData })
          .then((res) => {
            setErrorMsg(res.message);
            setShowModal(true);
          })
          .catch((err) => console.log(err));
          // Reloading the page after a short delay
        setTimeout(() => {
          location.reload();
        }, 1000);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col gap-5 px-8 py-6 border-2 rounded-md shadow-lg bg-gradient-to-r from-gray-900 to-gray-700">
       {/* Modal component to show error messages */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        errormsg={errorMsg}
      />
        {/* Layout for MovieBooking and MyBookings components */}
        <div className="flex flex-wrap-reverse lg:flex-nowrap gap-4 justify-between items-center">
      <MovieBooking movieToHome={movieData} />
      <MyBookings />


      </div>

       {/* Layout for TimeBooking and SeatBooking components */}
      <div className="flex flex-col gap-4">
        <TimeBooking slotToHome={slotData} />
        <SeatBooking seatsData={seatsData} />
      </div>
      <div className="flex justify-center">
         {/* Button to trigger booking action */}
        <button
          className="flex items-center gap-2 px-6 py-4 border-2 border-white rounded-full bg-green-700 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleClick}
        >
          <FaChair className="text-2xl text-white" />
          <span className="text-lg font-semibold text-white">Book Tickets</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
