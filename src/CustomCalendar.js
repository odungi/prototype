import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function CustomCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value}></Calendar>
    </div>
  );
}

export default CustomCalendar;
