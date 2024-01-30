import { useState, useEffect } from 'react';
import Progress from './Progress';

export default function Timer({ emoji, startedAt, timespan, onRestart, onRemove }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const elapsed = now.getTime() - startedAt.getTime();
  const done = elapsed >= timespan;

  var percent;
  if (done) {
    percent = 0;
  } else {
    percent = 1 - elapsed / timespan;
  }

  var seconds = Math.ceil((timespan - elapsed) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;

  var remaining;
  if (hours > 0) {
    remaining = hours.toString() + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
  } else if (minutes > 0) {
    remaining = minutes + ":" + seconds.toString().padStart(2, '0');
  } else {
    remaining = seconds.toString();
  }

  var display = (
    <span className="text-5xl">{remaining}</span>
  );
  if (done) {
    display = <button className="text-5xl animate-bounce" onClick={onRestart}>{emoji}</button>;
  }

  return (
    <div className="m-4">
      <div class="relative">
        <Progress percent={percent} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {display}
        </div>
        <button onClick={onRemove} className="absolute right-0 top-0 size-10 rounded-full bg-gray-200 hover:bg-gray-400">✖</button>
      </div>
    </div>
  );
}
