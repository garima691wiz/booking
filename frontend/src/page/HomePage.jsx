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

  const [sharedData, setSharedData] = useState({
    movie: "",
    slot: "",
    seats: "",
  });
  console.log("data:", sharedData);

  const movieData = (data) => setSharedData({ ...sharedData, movie: data });
  const slotData = (data) => setSharedData({ ...sharedData, slot: data });

  const seatsData = useCallback((data) => setSharedData((prevData) => ({
    ...prevData,
    seats: data
  })), []);

  const checkNegativeValueOfSeats = useMemo(() => {
    return (seats) => Object.values(seats).some(seat => Number(seat) < 0);
  }, []);

  const checkZeroValueOfSeats = useMemo(() => {
    return (seats) => Object.values(seats).every(seat => Number(seat) === 0);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = () => {
    switch (true) {
      case !sharedData.movie:
        setShowModal(true);
        setErrorMsg("Select a movie!");
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
        dispatch(Bookings({ ...sharedData }));
        newBooking({ ...sharedData })
          .then((res) => {
            setErrorMsg(res.message);
            setShowModal(true);
          })
          .catch((err) => console.log(err));
        setTimeout(() => {
          location.reload();
        }, 1000);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col gap-4 px-8 py-6 border-2 rounded-md shadow-lg bg-gradient-to-r from-gray-900 to-gray-700">
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        errormsg={errorMsg}
      />
      <div className="flex flex-wrap-reverse gap-4 justify-between items-center">
        <MovieBooking movieToHome={movieData} />
        <MyBookings />
      </div>
      <div className="flex flex-col gap-4">
        <TimeBooking slotToHome={slotData} />
        <SeatBooking seatsData={seatsData} />
      </div>
      <div className="flex justify-center">
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
