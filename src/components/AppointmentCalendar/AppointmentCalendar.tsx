import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import enGB from "date-fns/locale/en-GB";
import { useState } from "react";

const locales = {
  "en-GB": enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentCalendar = ({
  appointments,
  onAppointmentClick,
}: EventsCalendarProps) => {
  const [calendarView, setCalendarView] = useState<string>("week");

  const handleAppointmentClick = (appointment: AppointmentInputs): void => {
    onAppointmentClick(appointment);
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view);
  };

  return (
    <Calendar
      localizer={localizer}
      events={appointments}
      onView={handleViewChange}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      view={calendarView as "day" | "week"}
      views={{ day: true, week: true }}
      onSelectEvent={handleAppointmentClick}
    />
  );
};

export default AppointmentCalendar;

type EventsCalendarProps = {
  appointments: AppointmentInputs[];
  onAppointmentClick: (appointment: AppointmentInputs) => void;
};
