// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Phone from "mdi-material-ui/Phone";
import EmailOutline from "mdi-material-ui/EmailOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";

import { Icon } from "@iconify/react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageShow from "@/components/Loader/Images/ImageShow";
import ImageUpload from "@/components/Loader/Images/ImageUpload";
import axiosInstance from "@/utils/axiosConfigure";
const initialValues = {
  name: "",
  email: "",
  bio: "",
  images: [],
};
const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bio: Yup.string().required("Bio is required"),
  images: Yup.array().required("Image is required").min(1, "Image is required"),
});

const EditCoach = () => {
  const { instructorId } = useParams();
  const [initialLoading, setInitialLoading] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const updateInstructor = async (values) => {
    setloading(true);
    try {
      setloading(true);
      const formData = new FormData();
      if (
        Array.isArray(values.images) &&
        values.images.length > 0 &&
        typeof values.images[0] === "object"
      ) {
        formData.append("image", values.images[0]);
      }
      formData.append("_id", instructorId);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("bio", values.bio);
      const { data } = await axiosInstance.put(
        `${import.meta.env.VITE_BASE_URL}/api/instructor/updateInstructor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(data);
      setloading(false);
      toast.success(data.message);
      navigate("/dashboard/instructor");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
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
      await updateInstructor(values);
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
  const handleRemoveImage = () => {
    setFieldValue("images", null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setFieldValue("images", [file]);
  };
  const getSpecificInstructor = async () => {
    try {
      setInitialLoading(true);
      const { data } = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/instructor/getSpecificInstructor/${instructorId}`,
      );
      setFieldValue("name", data?.data?.name);
      setFieldValue("email", data?.data?.email);
      setFieldValue("bio", data?.data?.bio);
      setFieldValue("images", [data?.data?.image]);
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
      setInitialLoading(false);

      toast.error("Server error,Please refresh the page...");
    }
  };
  useEffect(() => {
    getSpecificInstructor();
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
      {initialLoading ? (
        <div
          role="status"
          className="flex items-center justify-center h-screen"
        >
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
        <>
          <CardHeader
            title="Edit Instructor"
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
                      placeholder="Leonard Carter"
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
                    Email
                  </Typography>
                  <div className="w-full">
                    <input
                      type="email"
                      disabled
                      className={`text-sm w-full p-3 border border-gray-300
                      rounded-md focus:outline-none focus:border-primary`}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      handleBlur={handleBlur}
                      placeholder="Leonard Carter"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="font-normal text-sm text-[#00000099] mb-3">
                    Bio
                  </Typography>
                  <textarea
                    className={`text-sm w-full p-3 border ${
                      touched.bio && errors.bio
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:border-primary`}
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Write detail here..."
                    rows={6}
                  />
                  {touched.bio && errors.bio && (
                    <p className="text-red-500  ml-3 text-xs">{errors.bio}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography className="font-normal text-sm text-[#00000099] mb-3">
                    Image
                  </Typography>
                  {values?.images?.length ? (
                    <ImageShow
                      buttonText="Change Image"
                      selectedImage={values.images}
                      handleRemoveImage={handleRemoveImage}
                      handleImageChange={handleImageChange}
                    />
                  ) : (
                    <ImageUpload
                      error={errors.images}
                      handleImageChange={handleImageChange}
                      description="You can add only one image"
                    />
                  )}
                  {errors.images && (
                    <p class="ml-4 mt-1 flex items-center font-normal tracking-wide text-red-500 text-xs">
                      {errors.images}
                    </p>
                  )}
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
                      <>Update</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default EditCoach;
