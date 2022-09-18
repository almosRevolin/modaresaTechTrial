import React, { useContext, useState } from "react";
import { AppointmentModal, Button } from "../index";
import { AgendaContextData } from "../../contexts/AgendaContext";
import { generateRandomId } from "../../utils/utils";

const CreateAppointment = ({
  createAppointment,
  appointments,
}: CreateAppointmentProps) => {
  const { campaign, addBuyer } = useContext(AgendaContextData);
  const { _id, defaultAppointmentDuration } = campaign;

  const baseInputs = {
    title: "",
    start: new Date(),
    end: new Date(),
    duration: defaultAppointmentDuration,
    campaignId: _id,
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<AppointmentInputs>(baseInputs);

  const handleSaveNewAppointment = () => {
    const appointmentWithId = { ...appointment, _id: generateRandomId() };
    createAppointment(appointmentWithId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAppointment(prevAppointment => ({ ...prevAppointment, [name]: value }));
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setAppointment(baseInputs);
  };

  return (
    <>
      <div className="mt-4">
        <Button onClick={handleCreateClick}>Create appointment</Button>
      </div>
      {isCreateModalOpen && (
        <AppointmentModal
          appointments={appointments}
          campaign={campaign}
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          appointment={appointment}
          saveAppointment={handleSaveNewAppointment}
          onInputChange={handleInputChange}
          addBuyer={addBuyer}
        />
      )}
    </>
  );
};

type CreateAppointmentProps = {
  appointments: AppointmentInputs[];
  createAppointment: (appointment: AppointmentInputs) => void;
};

export default CreateAppointment;
