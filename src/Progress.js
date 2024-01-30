export default function Progress({ percent }) {
  const strokeWidth = 10;
  const size = 250;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent);

  return (
    <svg width={size} height={size} viewBox={"0 0 " + size + " " + size} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(-90deg)"}}>
      <circle r={radius} cx={size/2} cy={size/2} fill="transparent" className="stroke-gray-200" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset="0"></circle>
      <circle r={radius} cx={size/2} cy={size/2} className="stroke-sky-500" strokeWidth={strokeWidth} strokeLinecap="round" strokeDashoffset={offset} fill="transparent" strokeDasharray={circumference}></circle>
    </svg>
  );
}
