import { useState, useEffect } from 'react';
import Progress from './Progress';

export default function Timer({ startedAt, timespan, onRestart, onRemove }) {
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

  var display = (
    <span className="text-3xl">
      <span>{hours.toString().padStart(2, '0')}h</span>
      <span>{minutes.toString().padStart(2, '0')}m</span>
      <span>{seconds.toString().padStart(2, '0')}s</span>
    </span>
  );
  if (done) {
    display = <button className="text-5xl" onClick={onRestart}>🐴</button>;
  }

  return (
    <div>
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
