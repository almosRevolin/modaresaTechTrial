import { v4 } from "uuid";
import { areIntervalsOverlapping } from "date-fns";

export const generateRandomId = (): string => {
  return v4();
};

export const generateRandomVendors = (): Vendor[] => {
  return Array.from({ length: 5 }).map((_n, i) => {
    return { _id: generateRandomId(), name: `Fancy vendor name ${i + 1}` };
  });
};

export const generateRandomBuyers = (): Buyer[] => {
  return Array.from({ length: 5 }).map((_n, i) => {
    return {
      _id: generateRandomId(),
      name: "Jane Doe",
      companyName: `Fancy company ${i + 1}`,
    };
  });
};

export const calculateAppointmentEndDate = (
  appointment: AppointmentInputs
): Date => {
  const { start, duration } = appointment;

  return new Date(start.getTime() + duration * 60000);
};

export const checkVendorAvailable = (
  appointment: AppointmentInputs,
  excludedIntervals: { start: Date; end: Date }[]
): boolean => {
  const { start } = appointment;
  const appointmentEnd = calculateAppointmentEndDate(appointment);

  if (excludedIntervals.length < 1) return true;

  return excludedIntervals.every(interval => {
    return !areIntervalsOverlapping(interval, { start, end: appointmentEnd });
  });
};

export const areAppointmentInputsComplete = (
  appointment: AppointmentInputs
) => {
  const { buyerId, vendorId } = appointment;

  return (
    Object.values(appointment).every(value => !!value) && vendorId && buyerId
  );
};
