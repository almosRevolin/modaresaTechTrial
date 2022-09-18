import { Button, Icon, InputGroup } from "../../index";
import React, { useState } from "react";

import { generateRandomId } from "../../../utils/utils";

const AddNewBuyerInputs = ({ onAddNewBuyer }: AddNewBuyerInputsProps) => {
  const [newBuyer, setNewBuyer] = useState<Buyer | null>(null);

  const { name, companyName } = newBuyer || {};

  const handleAddNewBuyerInputs = (): void => {
    setNewBuyer({ name: "", companyName: "", _id: generateRandomId() });
  };

  const handleBuyerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    if (!newBuyer) return;

    const modifiedData = { ...newBuyer, [name]: value };
    setNewBuyer(modifiedData);
  };

  const handleAddBuyer = () => {
    if (!newBuyer || !name || !companyName) return;

    setNewBuyer(null);
    onAddNewBuyer(newBuyer);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      {!newBuyer ? (
        <>
          <div className="font-semibold my-2">Add buyer</div>
          <div
            className="flex items-center justify-center h-10 w-10 bg-black text-white rounded-full shadow-dark"
            role="button"
            tabIndex={0}
            onClick={handleAddNewBuyerInputs}
          >
            <Icon name="plus" size="w-6 h-6" />
          </div>
        </>
      ) : (
        <div className="h-24 flex items-center justify-between flex-row w-full">
          <div className="w-4/12">
            <InputGroup
              labelName="newBuyerName"
              label="Buyer name:"
              name="name"
              value={name}
              type="text"
              onChange={handleBuyerInputChange}
              placeholder="Enter buyer name"
            />
          </div>
          <div className="w-4/12">
            <InputGroup
              labelName="newBuyerCompany"
              label="Buyer company:"
              name="companyName"
              value={companyName}
              type="text"
              onChange={handleBuyerInputChange}
              placeholder="Enter buyer company"
            />
          </div>
          <div className="flex items-center justify-end h-full w-3/12 mt-6">
            <Button type="button" onClick={handleAddBuyer}>
              Save buyer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

type AddNewBuyerInputsProps = {
  onAddNewBuyer: (buyer: Buyer) => void;
};

export default AddNewBuyerInputs;
