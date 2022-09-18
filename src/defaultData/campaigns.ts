import { v4 } from "uuid";

const campaigns: Campaign[] = [
  {
    _id: v4(),
    title: "My very first campaign",
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    defaultAppointmentDuration: 3600000,
  },
];

export default campaigns;
