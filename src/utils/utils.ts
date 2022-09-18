import { v4 } from "uuid";

export const generateRandomId = (): string => {
  return v4();
};

export const generateRandomVendors = (): Vendor[] => {
  return Array.from({ length: 5 }).map((_n, i) => {
    return { _id: generateRandomId(), name: `Fancy vendor name ${i}` };
  });
};

export const generateRandomBuyers = (): Buyer[] => {
  return Array.from({ length: 5 }).map((_n, i) => {
    return {
      _id: generateRandomId(),
      name: "Jane Doe",
      companyName: `Fancy company ${i}`,
    };
  });
};
