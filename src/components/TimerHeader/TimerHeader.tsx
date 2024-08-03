"use client";

import { useEffect, useState } from "react";

export default function TimerHeader() {
  const [time, setTime] = useState({ hoursTime: 0, minutesTime: 0 });
  console.log(time);

  useEffect(() => {
    const updateEpoch = () => {
      let localEpoch = new Date().getTime();
      let epoch = localEpoch * 20.571428571428573;
      let minutes = (epoch / (1000 * 60)) % 60;
      let minutesTime = parseInt(`${minutes}`);
      let hours = (epoch / (1000 * 60 * 60)) % 24;
      let hoursTime = parseInt(`${hours}`);

      setTime({ hoursTime, minutesTime });
    };

    updateEpoch();
    const intervalId = setInterval(updateEpoch, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {time.hoursTime > 9 ? (
        <p>
          <span>{time.hoursTime}:</span>
          {time.minutesTime > 9 ? (
            <span>{time.minutesTime}</span>
          ) : (
            <span>0{time.minutesTime}</span>
          )}
        </p>
      ) : (
        <p>
          <span>0{time.hoursTime}:</span>
          {time.minutesTime > 9 ? (
            <span>{time.minutesTime}</span>
          ) : (
            <span>0{time.minutesTime}</span>
          )}
        </p>
      )}
    </div>
  );
}
