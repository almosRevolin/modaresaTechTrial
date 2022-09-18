type AgendaContext = {
  vendors: Vendor[];
  buyers: Buyer[];
  campaign: Campaign;
  addBuyer: (buyer: Buyer) => void;
};
