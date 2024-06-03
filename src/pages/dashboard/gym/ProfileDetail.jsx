import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
export function ProfileModal({ open, handleOpen, data }) {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <DialogHeader>
            <Typography variant="h4">Coach Details</Typography>
          </DialogHeader>
          <div
            className="mr-6 w-6 h-6 flex items-center justify-center border-2 border-dark rounded-full cursor-pointer"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="h-4 w-4 font-extrabold"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <DialogBody className="text-center font-normal">
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/${data?.photo}`}
            alt={data?.photo}
            size="xl"
            // variant="rounded"
          />
          <Typography className="text-primary font-bold mt-3">
            {data?.name}
          </Typography>
          <Typography className="text-gray-500 font-normal text-sm mt-3">
            {data?.email}
          </Typography>
          <Typography className="text-gray-500 font-normal text-sm mt-3">
            {data?.bio}
          </Typography>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center"></DialogFooter>
      </Dialog>
    </>
  );
}
