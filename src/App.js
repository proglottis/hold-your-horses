import { useState } from 'react';
import Timepad from './Timepad';
import Timer from './Timer';

function App() {
  const [startedAt, setStartedAt] = useState(null);
  const [timespan, setTimespan] = useState(0);

  function onPlay(hours, minutes, seconds) {
    var span = Number(hours) * 60 * 60 * 1000;
    span += Number(minutes) * 60 * 1000;
    span += Number(seconds) * 1000;

    setStartedAt(new Date());
    setTimespan(span);
  }

  function onRestart() {
    setStartedAt(new Date());
  }

  function onRemove() {
    setStartedAt(null);
    setTimespan(0);
  }

  let display;
  if(startedAt == null) {
    display = <Timepad onPlay={onPlay} />;
  } else {
    display = <Timer startedAt={startedAt} timespan={timespan} onRestart={onRestart} onRemove={onRemove} />;
  }

  return (
    <div className="container mx-auto">
      {display}
    </div>
  );
}

export default App;
