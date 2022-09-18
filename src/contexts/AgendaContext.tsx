import React, { createContext, useState } from "react";
import { default as defaultVendors } from "../defaultData/vendors";
import { default as defaultBuyers } from "../defaultData/buyers";

//Normally these would come from the BE and probably instead of using a context I'd use react-query or some other library to manage and reach this data from pages instead of drilling/context

export const AgendaContextData = createContext({} as AgendaContext);

const AgendaContext = ({ children }: { children: React.ReactNode }) => {
  const [buyers, setBuyers] = useState<Buyer[]>(defaultBuyers);

  const addBuyer = (buyer: Buyer) => {
    setBuyers(prevBuyers => ({ ...prevBuyers, ...buyer }));
  };

  return (
    <AgendaContextData.Provider
      value={{ vendors: defaultVendors, buyers, addBuyer }}
    >
      {children}
    </AgendaContextData.Provider>
  );
};

export default AgendaContext;
