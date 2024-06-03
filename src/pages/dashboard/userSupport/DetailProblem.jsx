import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Grid } from "@mui/material";
import moment from "moment";
export function DetailProblem({ open, handleOpen, data }) {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <DialogHeader>
            <Typography variant="h4">Problem Detail</Typography>
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
        <DialogBody className=" font-normal h-80 overflow-y-scroll">
          <Grid
            container
            sx={{
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item md={6} sm={12}>
              Date Posted: {moment(data?.createdAt).format("MM/DD/YYYY")}
            </Grid>
            <Grid item md={6} xs={12} sx={{ textAlign: "right" }}>
              <div className="">
                <span
                  className={` relative inline-flex items-center justify-between cursor-pointer ${
                    data?.status === "pending"
                      ? "bg-yellow-800"
                      : data?.status === "closed"
                      ? "bg-green-800"
                      : data?.status === "rejected"
                      ? "bg-red-800"
                      : "bg-orange-800"
                  } text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full`}
                >
                  {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
                </span>
              </div>
            </Grid>
          </Grid>
          <div className="text-center">
            {data?.userId?.image && (
              <Avatar
                src={`${import.meta.env.VITE_BASE_URL}/${data?.userId?.image}`}
                alt={data?.userId?.image}
                size="xl"
              />
            )}

            <Typography className="text-primary font-bold mt-3">
              {data?.userId?.email}
            </Typography>
            <Typography className="text-gray-500 font-normal text-sm mt-3">
              {data?.problem}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center"></DialogFooter>
      </Dialog>
    </>
  );
}
