
export default function Keypad({ showPlay, onKeyPress, onDelete, onPlay }) {
  var play;
  if (showPlay) {
    play = <button
      onClick={onPlay}
      className="col-start-2 text-2xl size-16 rounded-full bg-sky-500 hover:bg-sky-700">▶</button>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 place-items-center place-content-center">
      <Key onClick={(value) => onKeyPress(value)} value="1" />
      <Key onClick={(value) => onKeyPress(value)} value="2" />
      <Key onClick={(value) => onKeyPress(value)} value="3" />
      <Key onClick={(value) => onKeyPress(value)} value="4" />
      <Key onClick={(value) => onKeyPress(value)} value="5" />
      <Key onClick={(value) => onKeyPress(value)} value="6" />
      <Key onClick={(value) => onKeyPress(value)} value="7" />
      <Key onClick={(value) => onKeyPress(value)} value="8" />
      <Key onClick={(value) => onKeyPress(value)} value="9" />
      <Key onClick={(value) => onKeyPress(value)} value="00" />
      <Key onClick={(value) => onKeyPress(value)} value="0" />
      <Key onClick={onDelete} value="⌫" />
      {play}
    </div>
  );
}

function Key({ value, onClick }) {
  return (
    <button onClick={() => onClick(value)} className="text-2xl size-16 rounded-full bg-gray-200 hover:bg-gray-400">
      {value}
    </button>
  );
}
