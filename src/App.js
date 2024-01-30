import { useState } from 'react';
import Timepad from './Timepad';
import Timer from './Timer';

let timerID = 0;

function App() {
  const emoji = "🐴";
  const [timers, setTimers] = useState([]);
  const [addTimer, setAddTimer] = useState(false);

  function onPlay(hours, minutes, seconds) {
    var span = Number(hours) * 60 * 60 * 1000;
    span += Number(minutes) * 60 * 1000;
    span += Number(seconds) * 1000;

    if (span < 1) {
      return;
    }

    setAddTimer(false);
    setTimers([...timers, {
      id: timerID++,
      emoji: emoji,
      startedAt: new Date(),
      timespan: span,
    }]);
  }

  function onRestart(id) {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          startedAt: new Date()
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
    display = <Timepad emoji={emoji} onPlay={onPlay} showCancel={timers.length > 0} onCancel={onCancel} />;
  } else {
    display = (
      <div>
        <div>
          {timers.map((timer) =>
            <Timer key={timer.id} emoji={timer.emoji} startedAt={timer.startedAt} timespan={timer.timespan} onRestart={() => onRestart(timer.id)} onRemove={() => onRemove(timer.id)} />
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
