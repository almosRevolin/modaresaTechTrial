import { AppointmentCalendar, EditAppointment } from "../../components";
import { useContext, useState } from "react";

import CreateAppointment from "../../components/CreateAppointment/CreateAppointment";
import { AgendaContextData } from "../../contexts/AgendaContext";
import { calculateAppointmentEndDate } from "../../utils/utils";

const AgendaPage = () => {
  const { campaign } = useContext(AgendaContextData);

  const [appointments, setAppointments] = useState<AppointmentInputs[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentInputs | null>(null);

  const { title: campaignTitle } = campaign;

  const handleAppointmentClick = (appointment: AppointmentInputs): void => {
    setSelectedAppointment(appointment);
  };

  const handleCreateAppointment = (appointment: AppointmentInputs): void => {
    const newAppointment = { ...appointment };
    newAppointment.end = calculateAppointmentEndDate(appointment);

    setAppointments(prevAppointments => {
      return [...prevAppointments, newAppointment];
    });
  };

  const handleModifyAppointments = (appointment: AppointmentInputs): void => {
    const newAppointment = { ...appointment };
    newAppointment.end = calculateAppointmentEndDate(appointment);

    setAppointments(prevAppointments => {
      const filteredAppointments = [...prevAppointments].filter(
        ({ _id }) => _id !== newAppointment._id
      );

      return [...filteredAppointments, newAppointment];
    });
  };

  const handleDeleteAppointment = (): void => {
    if (!selectedAppointment) return;

    const idToDelete = selectedAppointment._id;

    setAppointments(prevState => {
      const modifiedState = [...prevState];

      return modifiedState.filter(({ _id }) => _id !== idToDelete);
    });
  };

  return (
    <>
      <EditAppointment
        appointment={selectedAppointment}
        appointments={appointments}
        setAppointment={setSelectedAppointment}
        editAppointments={handleModifyAppointments}
        deleteAppointment={handleDeleteAppointment}
      />
      <div className="w-8/12 mx-auto mt-8 flex justify-center items-start">
        <div className="w-3/12 h-2/3 flex flex-col">
          <h3 className="text-2xl font-bold">{campaignTitle}</h3>
          <CreateAppointment
            appointments={appointments}
            createAppointment={handleCreateAppointment}
          />
        </div>
        <div className="w-9/12 h-2/3">
          <AppointmentCalendar
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
          />
        </div>
      </div>
    </>
  );
};

export default AgendaPage;
