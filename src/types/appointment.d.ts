type Appointment = {
  _id: string;
  title: string;
  start: number;
  end: number;
  duration: number;
  campaignId: string;
  buyerId: string;
  vendorId: string;
};

type AppointmentInputs = Omit<
  Appointment,
  "start" | "end" | "buyerId" | "_id" | "vendorId"
> & {
  _id?: string;
  start: Date;
  end: Date;
  buyerId?: string;
  vendorId?: string;
};
