import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import ToolBar from "./components/ToolBar";
import DateHeader from "./components/DateHeader";
import Event from "./components/Event";
import "./calendar-style.css";
import { useState } from "react";
import EventModal from "./components/EventModal";

const CustomCalendar = ({ accountList }) => {
  const [eventInfo, setEventInfo] = useState(null);
  console.log(accountList);

  const convertCalendarData = (accountList) => {
    let mappedData = new Map();
    accountList !== undefined &&
      accountList.map((list) => {
        let original;
        let insertData = [];

        if (mappedData.has(list.date)) original = mappedData.get(list.date);
        else original = [0, 0];

        if (list.type < 3) {
          insertData.push(original[0] + list.price);
          insertData.push(original[1]);
        } else {
          insertData.push(original[0]);
          insertData.push(original[1] + list.price);
        }
        mappedData.set(list.date, insertData);
      });

    let convertData = [];

    Array.from(mappedData.keys()).map((key) => {
      const value = mappedData.get(key);

      if (value[0] > 0) {
        convertData.push({
          title:
            "+" + String(value[0]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
          allDay: false,
          start: new Date(key),
          end: new Date(key),
        });
      }
      if (value[1] > 0) {
        convertData.push({
          title:
            "-" + String(value[1]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
          allDay: false,
          start: new Date(key),
          end: new Date(key),
        });
      }
    });

    return convertData;
  };

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Calendar
        style={{ height: 100 + "%", width: 100 + "%" }}
        localizer={localizer}
        events={convertCalendarData(accountList)}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        selectable={true}
        components={{
          month: {
            dateHeader: DateHeader,
          },
          toolbar: ToolBar,
        }}
        onSelectEvent={(eventInfo) => {
          setEventInfo(eventInfo);
          toggleModal();
        }}
        eventPropGetter={Event}
      />
      {isOpen && (
        <EventModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          eventInfo={eventInfo}
          accountList={accountList}
        />
      )}
    </>
  );
};

export default CustomCalendar;
