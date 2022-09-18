type AgendaContext = {
  vendors: Vendor[];
  buyers: Buyer[];
  addBuyer: (buyer: Buyer) => void;
};
