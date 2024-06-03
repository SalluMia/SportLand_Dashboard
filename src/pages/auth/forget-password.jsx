import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import toast from "react-hot-toast";
import successAnimation from "../../../public/success.json";
import Lottie from "lottie-react";
const initialValues = {
  email: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export function ForgetPassword() {
  const [authLoad, setAuthLoad] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    setAuthLoad(true);
    try {
      seterrorMessage(null);
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/forget-password`,
        values,
      );
      // toast.success(result.data.message)
      // localStorage.setItem("verify-email",values.email)
      // navigate(`/auth/verify-otp/${result.data.id}/${result.data.token}`)
      setAuthLoad(false);
      setSuccess(true);
    } catch (error) {
      setAuthLoad(false);
      if (error.response.data.status === 404) {
        seterrorMessage(error.response.data.message);
      } else {
        toast.error("Server error. Please try again");
      }

      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await handleLogin(values);
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
  return (
    <section className="md:bg-secondary  min-h-screen flex justify-center items-center">
      {success ? (
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3   bg-white rounded-3xl p-10 md:m-5">
          <div className="text-center">
            <Typography variant="h3" className="font-bold mb-4 text-primary ">
              Head Start
            </Typography>
          </div>
          <div className=" h-48 flex  justify-center w-full">
            <Lottie
              loop={false}
              autoPlay={false}
              animationData={successAnimation}
            />
          </div>
          <div className="text-center">
            <Typography
              variant="h2"
              className="font-bold mb-8 text-primary  text-2xl "
            >
              Reset Password link sent successfully!
            </Typography>
            <Typography
              variant="h2"
              className="font-medium mb-8 text-gray-600  text-md "
            >
              Please check your email to reset your password
            </Typography>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3   bg-white rounded-3xl p-10 md:m-5">
          <div className="text-center">
            <Typography variant="h3" className="font-bold mb-4 text-primary ">
              Head Start
            </Typography>
            <Typography
              variant="h2"
              className="font-medium mb-3 text-xl text-dark"
            >
              Forget Password
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-base font-normal"
            >
              Enter your Email for a verification code
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto max-w-screen-lg "
            onSubmit={handleSubmit}
          >
            <div className=" flex flex-col gap-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:border-primary focus:!border-t-primary focus:outline-none bg-transparent"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {touched.email && errors.email && (
                <p class="flex items-center font-medium tracking-wide text-red-500 text-xs">
                  *{errors.email}
                </p>
              )}
            </div>

            {errorMessage && (
              <div className="mt-2 mb-4">
                <div className="flex items-center  border border-red-500 text-white bg-transparent rounded p-3">
                  {errorMessage && (
                    <>
                      {" "}
                      <RiErrorWarningLine className="text-red-500 me-2" />
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-1">
              <Typography variant="small" className="font-medium text-primary">
                <Link to="/auth/sign-in" className="hover:underline">
                  Sign in?
                </Link>
              </Typography>
            </div>
            <Button
              type="submit"
              className="mt-6 bg-primary text-dark text-sm hover:shadow-lg shadow-secondary"
              fullWidth
              disabled={authLoad}
            >
              {authLoad ? (
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
                <> Forget Password</>
              )}
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

export default ForgetPassword;
