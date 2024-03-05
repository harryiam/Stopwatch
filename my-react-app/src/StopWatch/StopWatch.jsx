import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          // Check if the elapsed time has reached 2 minutes (120 seconds)
          if (prevTime >= 120) {
            clearInterval(intervalId);
            setIsRunning(false);
            return prevTime;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleStopwatch = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    if (time === 0) {
      return '0:00';
    }
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>Time: {formatTime()}</div>
      {isRunning ? (
        <button onClick={toggleStopwatch}>Stop</button>
      ) : (
        <button onClick={toggleStopwatch}>Start</button>
      )}
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;
