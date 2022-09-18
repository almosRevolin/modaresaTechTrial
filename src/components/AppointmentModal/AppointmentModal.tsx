import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, InputGroup, Modal } from "../index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../Select/Select";
import { AgendaContextData } from "../../contexts/AgendaContext";

import AddNewBuyerInputs from "./AddNewBuyerInputs/AddNewBuyerInputs";
import {
  areAppointmentInputsComplete,
  checkVendorAvailable,
} from "../../utils/utils";

const AppointmentModal = ({
  appointment,
  appointments,
  campaign,
  saveAppointment,
  onInputChange,
  isOpen,
  onClose,
  addBuyer,
  deleteAppointment,
}: AppointmentModalProps) => {
  const {
    title: campaignTitle,
    startDate: campaignStartDate,
    endDate: campaignEndDate,
    defaultAppointmentDuration,
  } = campaign;

  const { vendors, buyers } = useContext(AgendaContextData);

  const {
    title,
    start,
    duration,
    vendorId,
    buyerId,
    _id: appointmentId,
  } = appointment;

  const [excludedMeetingIntervals, setExcludedMeetingIntervals] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    if (vendorId) {
      const vendorAppointments = appointments.filter(
        ({ vendorId: appointmentVendorId }) => vendorId === appointmentVendorId
      );

      const datesUnavailable = vendorAppointments.map(appointment => {
        const { start, end } = appointment;

        return { start, end };
      });

      setExcludedMeetingIntervals(datesUnavailable);
    }
  }, [vendorId]);

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;

    const numValue = Number(value);

    // @ts-ignore
    const fakeEventObj = {
      target: { value: numValue, name: "duration" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const vendorOptions = useMemo(() => {
    return vendors.map(vendor => {
      const { name, _id } = vendor;

      return { name, value: _id };
    });
  }, []);

  const buyerOptions = useMemo(() => {
    return buyers.map(buyer => {
      const { name, companyName, _id } = buyer;

      return { name: `${name} - ${companyName}`, value: _id };
    });
  }, [buyers]);

  const handleStartDateChange = (date: Date): void => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: date, name: "start" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const handleVendorSelect = (vendorId: string): void => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: vendorId, name: "vendorId" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const handleBuyerSelect = (buyerId: string): void => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: buyerId, name: "buyerId" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isVendorAvailable = checkVendorAvailable(
      appointment,
      excludedMeetingIntervals
    );

    const areAllInputsFilled = areAppointmentInputsComplete(appointment);

    if (!isVendorAvailable || !areAllInputsFilled) return;

    saveAppointment();
    onClose();
  };

  const handleAddNewBuyer = (buyer: Buyer): void => {
    const { _id } = buyer;

    addBuyer(buyer);
    handleBuyerSelect(_id);
  };

  const handleDeleteAppointment = () => {
    if (!deleteAppointment || !appointmentId) return;

    deleteAppointment(appointmentId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col bg-white h-createModal w-createModal max-h-createModal bg-white rounded-xl shadow-dark p-6">
        <h1 className="text-2xl font-bold text-black">{campaignTitle}</h1>
        <form
          onSubmit={handleSave}
          className="flex flex-col w-8/12 h-full mx-auto my-8"
        >
          <div className="w-full my-4">
            <InputGroup
              labelName="appointmentTitle"
              label="Title:"
              name="title"
              value={title}
              type="text"
              onChange={onInputChange}
              placeholder="Enter appointment title"
            />
          </div>
          <div className="flex flex-row justify-between items-center h-20 my-4">
            <div className="w-5/12 z-20">
              <label
                htmlFor="appointmentStart"
                className="text-lg font-semibold text-black"
              >
                Start:
              </label>

              <DatePicker
                id="appointmentStart"
                selected={start}
                onChange={handleStartDateChange}
                includeDateIntervals={[
                  {
                    start: new Date(campaignStartDate),
                    end: new Date(campaignEndDate),
                  },
                ]}
                className="p-2 border-grey-300 border-2 h-14 rounded-md w-full"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="w-5/12 h-full">
              <InputGroup
                labelName="appointmentDuration"
                label="Duration (minutes):"
                name="title"
                value={duration}
                type="number"
                step={defaultAppointmentDuration}
                min={defaultAppointmentDuration}
                onChange={handleDurationChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-4 justify-between items-center">
            <div className="w-5/12 h-full">
              <label
                className="text-lg font-semibold text-black"
                htmlFor="appointmentVendor"
              >
                Vendor:
              </label>
              <Select
                options={vendorOptions}
                onSelect={handleVendorSelect}
                selectedValue={vendorId}
                placeholder="Please select a vendor"
              />
            </div>
            <div className="w-5/12 h-full">
              <label
                className="text-lg font-semibold text-black"
                htmlFor="appointmentBuyer"
              >
                Buyer:
              </label>
              <Select
                options={buyerOptions}
                onSelect={handleBuyerSelect}
                selectedValue={buyerId}
                placeholder="Please select a buyer"
              />
            </div>
          </div>
          <AddNewBuyerInputs onAddNewBuyer={handleAddNewBuyer} />
          <div className="flex justify-between mt-auto mx-auto w-8/12 h-12">
            <Button
              type="button"
              buttonType="danger"
              onClick={handleDeleteAppointment}
              customStyle="w-24"
              disabled={!appointmentId}
            >
              Delete
            </Button>
            <Button type="submit" customStyle="w-24">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

type AppointmentModalProps = {
  appointment: AppointmentInputs;
  appointments: AppointmentInputs[];
  isOpen: boolean;
  campaign: Campaign;
  onClose: () => void;
  saveAppointment: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addBuyer: (buyer: Buyer) => void;
  deleteAppointment?: (appointmentId: string) => void;
};

export default AppointmentModal;
