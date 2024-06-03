// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import { Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageShow from "@/components/Loader/Images/ImageShow";
import ImageUpload from "@/components/Loader/Images/ImageUpload";
import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  description: "",
  photo: [],
  rating: 0,
  balance: 0,
  activities: [],
  createdBy: "",
  role: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  photo: Yup.array().required("Photo is required").min(1, "Photo is required"),
  // rating: Yup.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").required("Rating is required"),
  // balance: Yup.number().min(0, "Balance must be at least 0").required("Balance is required"),
  // activities: Yup.array().of(Yup.string()).required("Activities are required"),
  // createdBy: Yup.string().required("Created By is required"),
  // role: Yup.string().required("Role is required"),
});

const AddCoaches = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createdBy= "665a0348a55483bcd72e9cee";
  const createCoach = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", values.photo[0]);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rating", values.rating);
      formData.append("balance", values.balance);
      formData.append("activities", JSON.stringify(values.activities));
      formData.append("createdBy", createdBy );
      formData.append("role", values.role);

      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/coach/coaches`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setLoading(false);
      toast.success("Coaches add Successfully");
      navigate("/dashboard/coaches");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Please try again");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await createCoach(values);
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
    setFieldValue("photo", []);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFieldValue("photo", [file]);
  };

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
        title="Add Coach"
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
                  className={`text-sm w-full p-3 border ${touched.name && errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-primary`}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="John Doe"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">{errors.name}</p>
                )}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Description
              </Typography>
              <div className="w-full">
                <input
                  type="text"
                  className={`text-sm w-full p-3 border ${touched.description && errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-primary`}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Coach description"
                  // rows={2}
                />
                {touched.description && errors.description && (
                  <p className="text-red-500 ml-3 mt-1 text-xs">{errors.description}</p>
                )}
              </div>
            </Grid>
         
           
            
            <Grid item xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Photo
              </Typography>
              {values.photo.length ? (
                <ImageShow
                  buttonText="Change Photo"
                  selectedImage={values.photo}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
                />
              ) : (
                <ImageUpload
                  error={errors.photo}
                  handleImageChange={handleImageChange}
                  description="You can add only one photo"
                />
              )}
              {errors.photo && (
                <p className="ml-4 mt-1 flex items-center font-normal tracking-wide text-red-500 text-xs">
                  {errors.photo}
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
                      className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
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
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <> Add Coach </>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCoaches;
