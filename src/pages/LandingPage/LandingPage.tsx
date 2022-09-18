import { AppointmentCalendar } from "../../components";
import { useEffect, useState } from "react";
import campaigns from "../../defaultData/campaigns";
import CreateAppointment from "../../components/CreateAppointment/CreateAppointment";
import AgendaContext from "../../contexts/AgendaContext";

const LandingPage = () => {
  const events = [
    {
      _id: "1",
      title: "Yolo",
      start: new Date(),
      end: new Date("2022-09-18"),
      duration: 3600000,
      campaignId: "1",
      buyerId: "1",
    },
  ];

  const [appointments, setAppointments] = useState<AppointmentInputs[]>(events);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentInputs | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(
    campaigns[0]
  );

  const { title: campaignTitle } = selectedCampaign;

  useEffect(() => {
    if (selectedCampaign) {
      const { _id } = selectedCampaign;

      const campaignAppointments = events.filter(event => {
        const { campaignId } = event;
        return campaignId === _id;
      });

      setAppointments(campaignAppointments);
    }
  }, [selectedCampaign]);

  const handleAppointmentClick = (appointmentId: string): void => {
    console.log(appointmentId);
  };

  const handleCreateAppointment = (appointment: AppointmentInputs): void => {
    setAppointments(prevAppointments => {
      return [...prevAppointments, appointment];
    });
  };

  return (
    <AgendaContext>
      <div className="w-8/12 mx-auto h-screen flex justify-center items-center">
        <div className="w-3/12 h-2/3 flex flex-col">
          <h3 className="text-2xl font-bold">{campaignTitle}</h3>
          <CreateAppointment
            campaign={selectedCampaign}
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
    </AgendaContext>
  );
};

export default LandingPage;
