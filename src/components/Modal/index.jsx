import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GoAlertFill } from "react-icons/go";
export function DialogDefault({
  open,
  handleOpen,
  icon,
  text,
  buttonText,
  handleChange,
}) {
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader className="flex items-center justify-center text-red-600">
          {icon}
        </DialogHeader>
        <DialogBody className="text-center font-normal">{text}</DialogBody>
        <DialogFooter className="flex items-center justify-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            variant="gradient"
            className="bg-primary px-8 py-1.5 rounded-full text-dark font-medium hover:bg-secondary hover:text-opacity-80"
            onClick={handleChange}
          >
            <span>{buttonText}</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
