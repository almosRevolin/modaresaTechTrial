import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Icon } from "../index";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const innerClasses = "z-50 relative mx-auto shadow-lg rounded-lg";

  const wrapperClasses = clsx(
    "z-50 fixed h-screen flex items-center justify-center top-0 backdrop-filter backdrop-blur-sm w-screen",
    isOpen ? "" : "opacity-0 pointer-events-none"
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} as="div" className={wrapperClasses}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute w-full h-full bg-black bg-opacity-40" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={innerClasses}>
            <div
              className="absolute z-50 top-5 right-4"
              onClick={onClose}
              role="button"
              tabIndex={0}
            >
              <Icon name="close" size="w-5 h-5" />
            </div>

            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default Modal;
