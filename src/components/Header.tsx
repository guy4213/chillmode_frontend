import { useAppState } from "../AppState";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import CustomModal from "./CustomModal"; // Adjust the import path as needed
import './CustomModal.css'; // Import the CSS file for modal styling

const Header: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();

  const { Name } = useAppState();
  const { logout, isLoggedIn } = useContext(AuthContext);

  // Timer references
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alertTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // State to store the elapsed time and modal visibility
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const logoutTime: number = 30 * 60 * 1000; // 30 minutes in milliseconds
  const alertTime: number = 28 * 60 * 1000; // 28 minutes in milliseconds

  useEffect(() => {
    if (isLoggedIn) {
      // Clear any existing timers and intervals
      clearTimersAndInterval();

      // Start the timers
      startTimers();
    } else {
      // Clear the interval and reset elapsed time when user is not logged in
      clearTimersAndInterval();
      setElapsedTime(0);
    }

    return () => {
      // Cleanup function to clear the timeout and interval
      clearTimersAndInterval();
    };
  }, [isLoggedIn]);

  useEffect(() => {
    // Update elapsed time every second
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      if (isLoggedIn) {
        console.log("Elapsed time: " + elapsedTime); // Log the updated value of elapsedTime
      }
    }, 1000);

    return () => {
      // Clear interval on cleanup
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [elapsedTime, isLoggedIn]); // Include elapsedTime in dependency array

  const clearTimersAndInterval = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    if (alertTimerRef.current !== null) {
      clearTimeout(alertTimerRef.current);
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  const startTimers = () => {
    // Set the timeout for 30 minutes to log out
    timerRef.current = setTimeout(() => {
      logout();
      nav("/MainPage");
    }, logoutTime);

    // Set the timeout to show alert before logout
    alertTimerRef.current = setTimeout(() => {
      setShowModal(true);
    }, alertTime);
  };

  const handleConfirm = () => {
    handleResetTimer();
    setElapsedTime(0);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleResetTimer = () => {
    clearTimersAndInterval();
    setElapsedTime(0);
    startTimers();
  };

  return (
    <header>
      <div className="font-extrabold text-3xl text-blue-500 shadow-2xl rounded-lg">
        {isLoggedIn &&
          location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          location.pathname !== "/MainPage" &&
          location.pathname !== "/" &&
          `Hello ${Name}!`}
      </div>
      <h1>
        {Name && location.pathname === "/seriesList" && "Welcome To SeriesList Screen"}
        {Name && location.pathname === "/Choose" && (
          <div>
            Welcome to Admin Screen!
            <br />
            Choose your action to proceed:
          </div>
        )}
        {location.pathname === "/seriesDetails" && "Welcome To Series Details Screen"}
        {location.pathname === "/" && "Welcome To ChillMode"}
        {location.pathname === "/MainPage" && "Welcome To ChillMode"}
        {location.pathname === "/about" && "About ChillMode"}
      </h1>

      {showModal &&isLoggedIn&& (
        <CustomModal
          message={`You will be logged out in ${(logoutTime/1000) - (elapsedTime)} seconds. Do you want to keep browsing?  `}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          timeout={10000} // 10 seconds for the user to respond
        />
      )}
    </header>
  );
};

export default Header;
