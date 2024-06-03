import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { GoAlertFill } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";

const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export function ChangePasswordModal({ open, handleOpen, icon, buttonText }) {
  const [loading, setloading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const changePassword = async (values) => {
    setloading(true);
    try {
      setError(null);
      setloading(true);
      let { _id } = JSON.parse(localStorage.getItem("head_start"));
      console.log(_id);
      const body = {
        userId: _id,
        ...values,
      };
      const { data } = await axiosInstance.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/changePassword`,
        body,
      );
      console.log(data);
      setloading(false);
      toast.success(data.message);
      handleOpen();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        toast.error("Server error. Please try again");
      }
      setloading(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await changePassword(values);
    },
  });
  console.log(formik.values);
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="rounded-t-3xl rounded-b-3xl"
      >
        <div className="flex items-center justify-between bg-secondary rounded-t-3xl">
          <DialogHeader>
            <Typography variant="h5" className="ms-3">
              Change Password
            </Typography>
          </DialogHeader>
          <div
            className="mr-6 w-5 h-5 flex items-center justify-center border-2 border-dark rounded-full cursor-pointer"
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
        <DialogBody className=" font-normal px-10 py-10">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Typography className="font-normal text-sm text-[#00000099] mb-1">
                  Old Password
                </Typography>

                <div className="w-full relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className={`text-sm w-full p-3 border ${
                      touched.oldPassword && errors.oldPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:border-primary`}
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Enter Old Password"
                  />
                  {showOldPassword ? (
                    <FaEyeSlash
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowOldPassword(false)} // Toggle state when eye icon is clicked
                    />
                  ) : (
                    <FaEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowOldPassword(true)} // Toggle state when eye icon is clicked
                    />
                  )}
                </div>
                {touched.oldPassword && errors.oldPassword && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.oldPassword}
                  </p>
                )}
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography className="font-normal text-sm text-[#00000099] mb-1">
                  New Password
                </Typography>

                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`text-sm w-full p-3 border ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:border-primary`}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Enter New Password"
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(false)} // Toggle state when eye icon is clicked
                    />
                  ) : (
                    <FaEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(true)} // Toggle state when eye icon is clicked
                    />
                  )}
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.password}
                  </p>
                )}
              </Grid>

              <Grid item md={12} xs={12}>
                <Typography className="font-normal text-sm text-[#00000099] mb-1">
                  Confirm Password
                </Typography>

                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`text-sm w-full p-3 border ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:border-primary`}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Confirm Password"
                  />
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowConfirmPassword(false)} // Toggle state when eye icon is clicked
                    />
                  ) : (
                    <FaEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowConfirmPassword(true)} // Toggle state when eye icon is clicked
                    />
                  )}
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </Grid>
              {error && (
                <Grid item md={12} xs={12}>
                  <p className="text-red-500 ml-3 mt-1 text-xs">{error}</p>
                </Grid>
              )}
              <Grid item md={12} xs={12}>
                <Button
                  type="submit"
                  className="w-full bg-primary text-dark hover:bg-opacity-90 px-12 rounded-lg"
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
                    <> Change Password</>
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
