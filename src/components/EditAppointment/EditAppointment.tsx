import { AppointmentModal } from "../index";
import { AgendaContextData } from "../../contexts/AgendaContext";
import React, { useContext } from "react";

const EditAppointment = ({
  appointment,
  appointments,
  setAppointment,
  editAppointments,
  deleteAppointment,
}: EditAppointmentProps) => {
  const { campaign, addBuyer } = useContext(AgendaContextData);

  if (!appointment) return null;

  const handleAppointmentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!appointment) return;

    const { name, value } = e.target;

    const modifiedAppointment = { ...appointment, [name]: value };

    setAppointment(modifiedAppointment);
  };

  const handleEditAppointments = () => {
    editAppointments(appointment);
  };

  const closeAppointmentModal = (): void => {
    setAppointment(null);
  };

  return (
    <AppointmentModal
      appointment={appointment}
      appointments={appointments}
      isOpen={!!appointment}
      campaign={campaign}
      onClose={closeAppointmentModal}
      saveAppointment={handleEditAppointments}
      onInputChange={handleAppointmentInputChange}
      addBuyer={addBuyer}
      deleteAppointment={deleteAppointment}
    />
  );
};

type EditAppointmentProps = {
  appointment: AppointmentInputs | null;
  appointments: AppointmentInputs[];
  setAppointment: React.Dispatch<
    React.SetStateAction<AppointmentInputs | null>
  >;
  editAppointments: (appointment: AppointmentInputs) => void;
  deleteAppointment: () => void;
};

export default EditAppointment;
