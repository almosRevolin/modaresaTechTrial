import { v4 } from "uuid";

const campaigns: Campaign[] = [
  {
    _id: v4(),
    title: "My very first campaign",
    startDate: new Date().getTime(),
    endDate: new Date(Date.now() + 12096e5).getTime(),
    defaultAppointmentDuration: 60,
  },
];

export default campaigns;
