import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>{formatTime()}</div>
      <button onClick={startStopwatch} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopStopwatch} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;
