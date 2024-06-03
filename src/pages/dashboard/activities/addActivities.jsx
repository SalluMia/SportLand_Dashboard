import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import axiosInstance from "@/utils/axiosConfigure";

const initialValues = {
  name: "",
  type: "",
  schedule: [{ day: "", startTime: "", endTime: "" }],
  coachId: "",
  gymId: "",
  createdBy: "665a0348a55483bcd72e9cee",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  schedule: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("Day is required"),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
    })
  ),
  coachId: Yup.string().required("Coach is required"),
  gymId: Yup.string().required("Gym is required"),
});

const AddActivities = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/gym/gyms`
        );
        setGyms(response.data.gyms);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
    };

    const fetchCoaches = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/coach/coaches`
        );
        setCoaches(response.data.coaches);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchGyms();
    fetchCoaches();
  }, []);

  const createActivity = async (values) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/activity/activities`,
        values,
      );
      toast.success("Activity created");
      navigate("/dashboard/activities");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Something went wrong to create the activity");
      } else {
        toast.error("Server error. Please try again");
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await createActivity(values);
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

  return (
    <Card>
      <CardHeader
        title="Add Activities"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Name
              </Typography>
              <TextField
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="font-normal text-sm text-[#00000099] mb-3">
                Type
              </Typography>
              <TextField
                type="text"
                fullWidth
                variant="outlined"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.type && Boolean(errors.type)}
                helperText={touched.type && errors.type}
              />
            </Grid>
            <Grid item xs={12}>
  <Typography className="font-normal text-sm text-[#00000099] mb-3">
    Schedule
  </Typography>
  <div>
    {values.schedule.map((schedule, index) => (
      <div key={index} className="flex items-center space-x-3 mb-3">
        <TextField
          type="text"
          fullWidth
          variant="outlined"
          name={`schedule[${index}].day`}
          value={schedule.day}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].day &&
            Boolean(errors.schedule?.[index]?.day)
          }
          helperText={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].day &&
            errors.schedule?.[index]?.day
          }
          placeholder="Day"
          size="small"
        />
        <TextField
          type="text"
          fullWidth
          variant="outlined"
          name={`schedule[${index}].startTime`}
          value={schedule.startTime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].startTime &&
            Boolean(errors.schedule?.[index]?.startTime)
          }
          helperText={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].startTime &&
            errors.schedule?.[index]?.startTime
          }
          placeholder="Start Time"
          size="small"
        />
        <TextField
          type="text"
          fullWidth
          variant="outlined"
          name={`schedule[${index}].endTime`}
          value={schedule.endTime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].endTime &&
            Boolean(errors.schedule?.[index]?.endTime)
          }
          helperText={
            touched.schedule &&
            touched.schedule[index] &&
            touched.schedule[index].endTime &&
            errors.schedule?.[index]?.endTime
          }
          placeholder="End Time"
          size="small"
        />
      </div>
    ))}
    <Button
      variant="contained"
      onClick={() =>
        setFieldValue("schedule", [
          ...values.schedule,
          { day: "", startTime: "", endTime: "" },
        ])
      }
    >
      Add Schedule
    </Button>
  </div>
</Grid>


            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="gym-label">Select Gym</InputLabel>
                <Select
                  labelId="gym-label"
                  id="gym"
                  name="gymId"
                  value={values.gymId}
                  onChange={handleChange}
                  label="Select Gym"
                >
                  {gyms.map((gym) => (
                    <MenuItem key={gym._id} value={gym._id}>
                      {gym.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="coach-label">Select Coach</InputLabel>
                <Select
                  labelId="coach-label"
                  id="coach"
                  name="coachId"
                  value={values.coachId}
                  onChange={handleChange}
                  label="Select Coach"
                >
                  {coaches.map((coach) => (
                    <MenuItem key={coach._id} value={coach._id}>
                      {coach.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className="bg-primary text-dark hover:bg-opacity-90 px-12"
                disabled={loading}
              >
                {loading ? (
                  <div role="status">
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>Add</>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddActivities;
