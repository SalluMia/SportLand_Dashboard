import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { MuiOtpInput } from "mui-one-time-password-input";
import Loading from "@/components/Loader";

export function OTP() {
  const { token, id } = useParams();
  const [verifyLink, setverifyLink] = useState(true);
  const [authLoad, setAuthLoad] = useState(false);
  const [resendLoad, setresendLoad] = useState(false);
  const email = localStorage.getItem("verify-email");
  const [otp, setOtp] = useState("");
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 4 && email) {
      setAuthLoad(true);
      try {
        seterrorMessage(null);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/verifyOtp`,
          {
            code: otp,
            email: email,
          },
        );
        toast.success(result.data.message);
        setAuthLoad(false);
        localStorage.removeItem("verify-email");
        navigate(
          `/auth/change-password/${result.data.userId}/${result.data.token}`,
        );
      } catch (error) {
        setAuthLoad(false);
        if (error.response.status === 401) {
          seterrorMessage(error.response.data.message);
        } else {
          toast.error("Server error. Please try again");
        }

        console.log(error);
      }
    }
  };

  const visiblePart = email?.substring(0, 2);
  const atIndex = email?.indexOf("@");
  const hiddenPart = atIndex !== -1 ? email?.substring(atIndex) : "";

  const handleOTP = (newValue) => {
    setOtp(newValue);
  };
  const handleResend = async () => {
    try {
      setresendLoad(true);
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/resendVerificationCode`,
        {
          email,
        },
      );
      console.log(result);
      toast.success(result.data.message);
      setresendLoad(false);
    } catch (error) {
      setresendLoad(false);
      toast.error("Server error. Please try again");

      console.log(error);
    }
  };
  const validate = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/linkValidate`,
        {
          id,
          token,
        },
      );
      console.log(result);
      setverifyLink(false);
    } catch (error) {
      setverifyLink(false);
      if (error.response.status === 400) {
        toast.error("Session expire.Please try again");
        navigate("/auth/forget-password");
      } else {
        toast.error("Server error. Please try again");
      }

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
        <>
          <section className="m-8 flex gap-4">
            <div className="w-full lg:w-3/5 mt-24">
              <div className="text-center">
                <Typography variant="h2" className="font-bold mb-4">
                  Email Verification
                </Typography>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="text-lg font-normal"
                >
                  We have sent a code to your email{" "}
                  <span className="font-bold">
                    {visiblePart}**
                    {hiddenPart}
                  </span>
                </Typography>
              </div>
              <form
                className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                onSubmit={handleSubmit}
              >
                <div className=" flex flex-col gap-1">
                  <div class="flex flex-col space-y-16">
                    <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <MuiOtpInput value={otp} onChange={handleOTP} />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mt-5 mb-4">
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

                <div className="flex items-center justify-end gap-2 mt-6">
                  <Typography
                    variant="small"
                    className="font-medium text-gray-900"
                  >
                    <div to="/auth/sign-in" className="flex items-center">
                      Didn't recieve code?
                      {resendLoad ? (
                        <div role="status" className="ms-2">
                          <svg
                            aria-hidden="true"
                            class="inline w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-black"
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
                        <span
                          onClick={handleResend}
                          className="text-blue-600 hover:underline ms-1 cursor-pointer"
                        >
                          Resend
                        </span>
                      )}
                    </div>
                  </Typography>
                </div>
                <Button
                  type="submit"
                  className="mt-6"
                  fullWidth
                  disabled={otp.length !== 4}
                  onClick={(e) => handleSubmit(e)}
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
                    <> Verify OTP</>
                  )}
                </Button>
              </form>
            </div>
            <div className="w-2/5 h-2/5 hidden lg:block">
              <img
                src="/img/pattern.png"
                className="h-full w-full object-cover rounded-3xl"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default OTP;
