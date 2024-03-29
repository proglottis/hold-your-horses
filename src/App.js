import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import Timepad from './Timepad';
import Timer from './Timer';

function App() {
  const [emoji, setEmoji] = useState("🐴");
  const [timers, setTimers] = useState(() => {
    const timers = JSON.parse(localStorage.getItem("timers"));
    if (timers) {
      return timers;
    } else {
      return [];
    }
  });
  const [addTimer, setAddTimer] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function onPlay(hours, minutes, seconds) {
    var span = Number(hours) * 60 * 60 * 1000;
    span += Number(minutes) * 60 * 1000;
    span += Number(seconds) * 1000;

    if (span < 1) {
      return;
    }

    setAddTimer(false);
    setTimers([...timers, {
      id: uuidv4(),
      emoji: emoji,
      startedAt: new Date().getTime(),
      timespan: span,
    }]);
  }

  function onRestart(id) {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          startedAt: new Date().getTime()
        };
      } else {
        return timer;
      }
    }));
  }

  function onRemove(id) {
    setTimers(timers.filter(timer => timer.id !== id));
  }

  function onAdd() {
    setAddTimer(true);
  }

  function onCancel() {
    setAddTimer(false);
  }

  let display;
  if(addTimer || timers.length < 1) {
    display = <Timepad setEmoji={setEmoji} emoji={emoji} onPlay={onPlay} showCancel={timers.length > 0} onCancel={onCancel} />;
  } else {
    display = (
      <div>
        <div>
          {timers.map((timer) =>
            <Timer
              key={timer.id}
              emoji={timer.emoji}
              startedAt={new Date(timer.startedAt)}
              timespan={timer.timespan}
              onRestart={() => onRestart(timer.id)}
              onRemove={() => onRemove(timer.id)}
              now={now}
            />
          )}
        </div>
        <div className="flex place-content-center">
          <button
            onClick={onAdd}
            className="text-4xl size-24 rounded-full bg-sky-500 hover:bg-sky-700">+</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {display}
    </div>
  );
}

export default App;
