import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Input, Modal } from "../index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../Select/Select";
import { AgendaContextData } from "../../contexts/AgendaContext";

const AppointmentModal = ({
  appointment,
  campaignTitle,
  saveAppointment,
  onInputChange,
  isOpen,
  onClose,
}: AppointmentModalProps) => {
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveAppointment();
    onClose();
  };

  const { vendors, buyers } = useContext(AgendaContextData);

  const { title, start, duration, vendorId, buyerId } = appointment;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const numValue = Number(value);

    // @ts-ignore
    const fakeEventObj = {
      target: { value: numValue * 60000, name: "duration" },
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
  }, []);

  const handleStartDateChange = (date: Date): void => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: date, name: "start" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const handleVendorSelect = (vendorId: string) => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: vendorId, name: "vendorId" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  const handleBuyerSelect = (buyerId: string) => {
    // @ts-ignore
    const fakeEventObj = {
      target: { value: buyerId, name: "buyerId" },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(fakeEventObj);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col bg-white h-createModal w-createModal max-h-createModal bg-white rounded-xl shadow-dark p-6">
        <h1 className="text-2xl font-bold text-black">{campaignTitle}</h1>
        <form
          onSubmit={handleSave}
          className="flex flex-col w-8/12 h-full mx-auto my-8"
        >
          <div className="flex flex-col my-4">
            <label
              htmlFor="appointmentTitle"
              className="text-lg font-semibold text-black"
            >
              Title:
            </label>
            <Input
              id="appointmentTitle"
              name="title"
              value={title}
              type="text"
              onChange={onInputChange}
              placeholder="Enter appointment title"
            />
          </div>
          <div className="flex flex-row justify-between items-center h-20 my-4">
            <div className="w-5/12">
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
                  { start: new Date(), end: new Date("2022-10-01") },
                ]}
                className="p-2 border-grey-300 border-2 h-14 rounded-md"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="h-full">
              <label
                htmlFor="appointmentDuration"
                className="text-lg font-semibold text-black"
              >
                Duration:
              </label>
              <Input
                id="appointmentDuration"
                name="title"
                value={duration / 60000}
                type="number"
                step={1}
                min={1}
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
          <div className="flex justify-between mt-auto mx-auto w-8/12 h-12">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

type AppointmentModalProps = {
  appointment: AppointmentInputs;
  isOpen: boolean;
  campaignTitle: string;
  onClose: () => void;
  saveAppointment: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default AppointmentModal;
