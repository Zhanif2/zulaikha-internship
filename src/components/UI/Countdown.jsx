import React, { useEffect, useState } from "react";

function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining);

  // Function to calculate time remaining
  function calculateTimeRemaining() {
    const millisLeft = new Date(expiryDate) - Date.now();
    if (millisLeft <= 0) return null;

    const hours = Math.floor(millisLeft / (1000 * 60 * 60));
    const minutes = Math.floor((millisLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((millisLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = calculateTimeRemaining();
      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [expiryDate]);

  return <>{timeLeft ? timeLeft : "Expired"}</>;
}

export default Countdown;
