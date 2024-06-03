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
import { FaEye, FaEyeSlash } from "react-icons/fa";
const initialValues = {
  email: "",
  password: "",
  showPassword: false,
  role: "admin",
  deviceId: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function SignIn({ setUserRole, navigateToRolePage }) {
  const [authLoad, setAuthLoad] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    setAuthLoad(true);
    try {
      seterrorMessage(null);
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        values,
      );
      console.log(result);
      localStorage.setItem("head_start", JSON.stringify(result.data.data));
      const userRole = result.data.data.user.role;
      setUserRole(userRole);
      navigateToRolePage(userRole);
      setAuthLoad(false);
    } catch (error) {
      setAuthLoad(false);
      if (error.response.status === 401) {
        seterrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
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
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3   bg-white rounded-3xl p-8 md:m-5">
        <div className="text-center">
          <Typography variant="h3" className="font-bold mb-4 text-primary ">
            Lemakland Sport
          </Typography>
          <Typography
            variant="h2"
            className="font-medium mb-4 text-2xl text-gray-900"
          >
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-md font-normal"
          >
            Sign In to your Lemakland account
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto max-w-screen-lg"
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

            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 mt-3 font-medium"
            >
              Password
            </Typography>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="********"
                className="!border-t-blue-gray-200 focus:border-primary focus:!border-t-primary focus:outline-none bg-transparent"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {touched.password && errors.password && (
              <p class="flex items-center font-medium tracking-wide text-red-500 text-xs">
                *{errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 mt-1">
            <Typography variant="small" className="font-medium text-primary">
              <Link to="/auth/forget-password" className="hover:underline">
                Forgot Password
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
              <> Sign In</>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
