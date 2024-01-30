import { useState } from 'react';
import Keypad from './Keypad';

export default function Timepad({ onPlay, emoji }) {
  const [time, setTime] = useState("");
  const [showPlay, setShowPlay] = useState(false);

  function isZero(s) {
    return /^0*$/.test(s);
  }

  function onKeyPress(value) {
    if(time.length >= 6) {
      return;
    }
    if(isZero(value) && isZero(time)) {
      return;
    }

    const t = time.concat(value);

    setTime(t);
    setShowPlay(!isZero(t));
  }

  function onDelete() {
    const t = time.slice(0, -1);

    setTime(t);
    setShowPlay(!isZero(t));
  }

  const timePadded = time.padStart(6, '0');
  const hours = timePadded.slice(0, 2);
  const minutes = timePadded.slice(2, 4);
  const seconds = timePadded.slice(4, 6);

  return (
    <div>
      <div className="flex text-4xl m-4">
        <div className="flex-none p-4">{emoji}</div>
        <div className="flex-auto text-right bg-gray-200 rounded-lg p-4">
          <span className={hours > 0 ? "text-sky-500" : ""}>{hours}h</span>
          <span className={hours > 0 || minutes > 0 ? "text-sky-500" : ""}>{minutes}m</span>
          <span className={hours > 0 || minutes > 0 || seconds > 0 ? "text-sky-500" : ""}>{seconds}s</span>
        </div>
      </div>
      <div className="flex place-content-center">
        <Keypad
          showPlay={showPlay}
          onKeyPress={onKeyPress}
          onDelete={onDelete}
          onPlay={() => onPlay(hours, minutes, seconds)}
        />
      </div>
    </div>
  );
}
