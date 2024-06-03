import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import successAnimation from "../../../public/success.json";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Loading from "@/components/Loader";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const initialValues = {
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export function ChangePassword() {
  const { id, token } = useParams();
  const [verifyLink, setverifyLink] = useState(true);
  const [authLoad, setAuthLoad] = useState(false);
  const [isMobileReq, setisMobileReq] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleChangePassword = async (values) => {
    setAuthLoad(true);
    try {
      seterrorMessage(null);
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/resetPassword`,
        {
          password: values.password,
          _id: id,
          token,
        },
      );
      if (result.data?.data === "user") {
        setisMobileReq(true);
        setAuthLoad(false);
      } else {
        toast.success(result.data.message);
        navigate("/auth/sign-in");
        setAuthLoad(false);
      }
    } catch (error) {
      setAuthLoad(false);
      if (
        error.response.data.status === 400 ||
        error.response.data.status === 401
      ) {
        seterrorMessage(error.response.data.message);
        navigate("/auth/forget-password");
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
      await handleChangePassword(values);
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
  const validate = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/linkValidate/${id}/${token}`,
      );
      console.log(result);
      setverifyLink(false);
    } catch (error) {
      setverifyLink(false);
      toast.error("Link expire.Please try again");
      navigate("/auth/forget-password");
      console.log(error);
    }
  };
  useEffect(() => {
    validate();
  }, []);

  return (
    <>
      {verifyLink ? (
        <Loading />
      ) : (
        <section className="md:bg-secondary  min-h-screen flex justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3   bg-white rounded-3xl p-10 md:m-5">
            {isMobileReq ? (
              <>
                <div className="text-center">
                  <Typography variant="h2" className="font-bold  text-primary ">
                    Head Start
                  </Typography>
                  <div className="h-36 flex  justify-center w-full">
                    <Lottie
                      loop={false}
                      autoPlay={false}
                      animationData={successAnimation}
                    />
                  </div>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-normal text-gray-600"
                  >
                    You can now sign in to the mobile app using your new
                    password.
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <Typography
                    variant="h3"
                    className="font-bold mb-4 text-primary "
                  >
                    Head Start
                  </Typography>
                  <Typography
                    variant="h2"
                    className="font-medium mb-4 text-xl text-dark"
                  >
                    Reset password
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="text-md font-normal"
                  >
                    Create a strong password
                  </Typography>
                </div>
                <form
                  className="mt-4 mb-2 mx-auto max-w-screen-lg"
                  onSubmit={handleSubmit}
                >
                  <div className=" flex flex-col gap-1">
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
                      <p class="flex items-center font-normal tracking-wide text-red-500 text-xs">
                        *{errors.password}
                      </p>
                    )}
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 mt-3 font-medium"
                    >
                      Confirm Password
                    </Typography>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        size="lg"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        placeholder="********"
                        className="!border-t-blue-gray-200 focus:border-primary focus:!border-t-primary focus:outline-none bg-transparent"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {showConfirmPassword ? (
                        <FaEyeSlash
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      ) : (
                        <FaEye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      )}
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p class="flex items-center font-normal tracking-wide text-red-500 text-xs">
                        *{errors.confirmPassword}
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
                            <p className="text-red-500 text-sm">
                              {errorMessage}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="mt-6 bg-primary text-sm text-dark hover:shadow-lg shadow-secondary"
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
                      <> Reset password</>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default ChangePassword;
