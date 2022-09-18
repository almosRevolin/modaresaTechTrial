import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import enGB from "date-fns/locale/en-GB";

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
  const handleAppointmentClick = (appointment: AppointmentInputs) => {
    const { _id } = appointment;
    onAppointmentClick(_id);
  };

  return (
    <Calendar
      localizer={localizer}
      events={appointments}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={handleAppointmentClick}
    />
  );
};

export default AppointmentCalendar;

type EventsCalendarProps = {
  appointments: AppointmentInputs[];
  onAppointmentClick: (appointmentId: string) => void;
};
