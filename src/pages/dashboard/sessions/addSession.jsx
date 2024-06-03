// ** MUI Imports
import * as React from "react";
import { Card, Grid, CardHeader, CardContent } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import axiosInstance from "@/utils/axiosConfigure";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const initialValues = {
  name: "",
  purpose: "",
  description: "",
  instructor: "",
  date: "",
  startTime: "",
  length: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  purpose: Yup.string().required("Purpose is required"),
  description: Yup.string(),
  instructor: Yup.string().required("Instructor is required"),
  date: Yup.string().required("Date is required"),
  startTime: Yup.string().required("startTime is required"),
  length: Yup.string().required("Duration is required"),
});

const AddSession = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [allInstructor, setAllInstructor] = useState(null);
  const createSession = async (values) => {
    setloading(true);
    try {
      setloading(true);
      const body = {
        name: values.name,
        purpose: values.purpose,
        description: values.description,
        instructorId: values.instructor,
        date: values.date,
        startTime: moment(values.startTime).format("hh:mm A"),
        length: values.length,
      };
      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/class/createClass`,
        body,
      );
      console.log(data);
      setloading(false);
      toast.success(data.message);
      navigate("/dashboard/sessions");
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again");
      }
      setloading(false);
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await createSession(values);
    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  console.log(errors);
  console.log(values);
  const getAllInstrcutor = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/instructor/getAllInstructor`,
      );
      console.log(data);
      setAllInstructor(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Server error,Please refresh the page...");
    }
  };
  React.useEffect(() => {
    getAllInstrcutor();
  }, []);

  return (
    <Card
      sx={{
        marginTop: "2rem",
        borderRadius: "15px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "25px",
      }}
    >
      <CardHeader
        title="Add Session"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Name
              </Typography>
              <div className="w-full">
                <input
                  type="text"
                  className={`text-sm w-full p-3 border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-primary`}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Yoga Session"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.name}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Purpose
              </Typography>
              <div className="w-full">
                <input
                  type="text"
                  className={`text-sm w-full p-3 border ${
                    touched.purpose && errors.purpose
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-primary`}
                  name="purpose"
                  value={values.purpose}
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Write purpose of this session..."
                />
                {touched.purpose && errors.purpose && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.purpose}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Description
              </Typography>
              <textarea
                className={`text-sm w-full p-3 border border-gray-300
                 rounded-md focus:outline-none focus:border-primary`}
                name="description"
                value={values.description}
                onChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Write detail here..."
                rows={6}
              />
              {touched.description && errors.description && (
                <p className="text-red-500  ml-3 text-xs">
                  {errors.description}
                </p>
              )}
            </Grid>

            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Instructor
              </Typography>
              <div className="w-full">
                <select
                  id="instructor"
                  name="instructor"
                  value={values.instructor}
                  p
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class={` border ${
                    touched.instructor && Boolean(errors.instructor)
                      ? "border-red-500"
                      : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5  `}
                >
                  <option selected>Choose an instructor</option>
                  {allInstructor &&
                    allInstructor.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                {touched.instructor && errors.instructor && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.instructor}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Date
              </Typography>
              <div className="w-full">
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      InputLabelProps={{ shrink: false }}
                      placeholder="Select date"
                      value={values.date ? format(values.date, "PPP") : ""}
                      error={touched.date && Boolean(errors.date)}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      disabled={{ before: new Date() }}
                      selected={values.date}
                      onSelect={(date) => setFieldValue("date", date)}
                      showOutsideDays
                      className="border-0"
                      classNames={{
                        caption:
                          "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                        day_today: "rounded-md bg-secondary text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {touched.date && errors.date && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.date}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Start Time
              </Typography>
              <div className="w-full">
                <ReactDatePicker
                  placeholderText="Select start time"
                  selected={values.startTime}
                  onChange={(date) => setFieldValue("startTime", date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className={`border ${
                    touched.startTime && Boolean(errors.startTime)
                      ? "border-red-500"
                      : "border-gray-300"
                  }  p-2 rounded-lg focus:border-primary focus:outline-none`}
                />

                {touched.startTime && errors.startTime && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.startTime}
                  </p>
                )}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Duration
              </Typography>
              <div className="w-full">
                <div className="w-full">
                  <input
                    type="number"
                    className={`text-sm w-full p-3 border ${
                      touched.length && errors.length
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:border-primary`}
                    name="length"
                    value={values.length}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Duration in minutes"
                  />
                  {touched.length && errors.length && (
                    <p className="text-red-500 ml-3 mt-1 text-xs">
                      {errors.length}
                    </p>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className="bg-primary text-dark hover:bg-opacity-90 px-12"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <> Add</>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSession;
