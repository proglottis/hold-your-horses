import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Keypad from './Keypad';

export default function Timepad({ onPlay, emoji, setEmoji, showCancel, onCancel }) {
  const [time, setTime] = useState("");
  const [showPlay, setShowPlay] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  function toggleEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function onEmojiSelect(data) {
    setEmoji(data.native);
    setShowEmojiPicker(false);
  }

  function onClickOutside(e) {
    if (e.target.id === "emoji-button") {
      return;
    }

    setShowEmojiPicker(false);
  }

  const timePadded = time.padStart(6, '0');
  const hours = timePadded.slice(0, 2);
  const minutes = timePadded.slice(2, 4);
  const seconds = timePadded.slice(4, 6);

  var emojiPicker;
  if (showEmojiPicker) {
    emojiPicker = (
      <div className="absolute">
        <Picker data={data} onEmojiSelect={onEmojiSelect} onClickOutside={onClickOutside} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex text-4xl m-4">
        <div className="flex-none p-4">
          <button id="emoji-button" onClick={toggleEmojiPicker}>{emoji}</button>
          {emojiPicker}
        </div>
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
          showCancel={showCancel}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
