import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/Loader/Images/ImageUpload";
import axiosInstance from "@/utils/axiosConfigure";

const initialValues = {
  name: "",
  description: "",
  address: "",
  photo: null,
  balance: 0,
  activities: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Gym Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  photo: Yup.mixed().required("Photo is required"),
  // balance: Yup.number().required("Balance is required").positive("Balance must be positive"),
});

const AddGym = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createdBy= "665a0348a55483bcd72e9cee";

  const createGym = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", values.photo);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("address", values.address);
      // formData.append("balance", values.balance);
      formData.append("createdBy", createdBy);
      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/gym/add-gyms`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      toast.success("Gym created");
      navigate("/dashboard/gyms");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again");
      }
      setLoading(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await createGym(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFieldValue("photo", file);
  };

  return (
    <Card sx={{ marginTop: "2rem", borderRadius: "15px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "25px" }}>
      <CardHeader title="Add Gym" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">Gym Name</Typography>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">Description</Typography>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">Address</Typography>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">Photo</Typography>
              <ImageUpload
                error={errors.photo}
                handleImageChange={handleImageChange}
                description="Upload a photo for the gym"
              />
              {errors.photo && <p className="ml-4 mt-1 flex items-center font-normal tracking-wide text-red-500 text-xs">{errors.photo}</p>}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className="bg-primary text-dark hover:bg-opacity-90 px-12"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddGym;
