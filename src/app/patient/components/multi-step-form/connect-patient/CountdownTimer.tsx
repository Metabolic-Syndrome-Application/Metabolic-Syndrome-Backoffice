"use client"
import { useEffect, useState } from 'react';

interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface Props {
  expiryTimestamp: number;
  onTimerExpired: () => void;
}

const CountdownTimer = ({ expiryTimestamp, onTimerExpired }: Props) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = expiryTimestamp - Date.now();
    let timeLeft: TimeLeft = { minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        onTimerExpired(); // Call the onTimerExpired function when the timer expires
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { minutes, seconds } = timeLeft;

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <span className="text-default-red">0</span>

      ) : (
        <span className="text-default-red">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
