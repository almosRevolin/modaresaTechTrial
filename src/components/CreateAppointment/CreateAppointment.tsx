import React, { useState } from "react";
import { AppointmentModal, Button } from "../index";

const CreateAppointment = ({
  campaign,
  createAppointment,
}: CreateAppointmentProps) => {
  const { _id, defaultAppointmentDuration, title } = campaign;

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
    createAppointment(appointment);
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
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          appointment={appointment}
          saveAppointment={handleSaveNewAppointment}
          onInputChange={handleInputChange}
          campaignTitle={title}
        />
      )}
    </>
  );
};

type CreateAppointmentProps = {
  campaign: Campaign;
  createAppointment: (appointment: AppointmentInputs) => void;
};

export default CreateAppointment;
