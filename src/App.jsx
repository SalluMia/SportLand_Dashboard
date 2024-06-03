import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChangePassword, ForgetPassword, OTP, SignIn } from "./pages/auth";
import Layout from "./layouts/Layout";
import { Home, Notifications, Profile, Tables } from "./pages/dashboard";
import { UserTable } from "./pages/dashboard/Users";
import { PrivateRoutes } from "./components/privateRoutes.js";
import { UserSupportTable } from "./pages/dashboard/userSupport";
import { CoachesTable } from "./pages/dashboard/coaches/tables";
import AddCoaches from "./pages/dashboard/coaches/addCoaches";
import { GymTable } from "./pages/dashboard/gym/tables";
import AddGym from "./pages/dashboard/gym/addGym";
import AddActivities from "./pages/dashboard/activities/addActivities";
import { ActivitiesTable } from "./pages/dashboard/activities/tables";
import EditCoach from "./pages/dashboard/coaches/editCoaches";
import GymsPaneltable from "./pages/gympanel/gyms/GymsPaneltable";
import Invite from "./pages/dashboard/invitePage/Invite";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateUserRole = useCallback(() => {
    const storedUserData = JSON.parse(localStorage.getItem("head_start"));
    if (storedUserData) {
      setUserRole(storedUserData.user.role);
      navigateToRolePage(storedUserData.user.role);
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    updateUserRole();
  }, []);

  const navigateToRolePage = (role) => {
    if (role === 'admin') {
      navigate("/dashboard/home");
    } else if (role === 'gym') {
      navigate("/gym/gym-coaches");
    } else if (role === 'coach') {
      navigate("/dashboard/home");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any loading component
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="*"
          element={
            <Layout setUserRole={setUserRole} userRole={userRole}>
              <Routes>
                <Route path="" element={<PrivateRoutes />}>
                  {userRole === "admin" && (
                    <>
                      <Route path="/" element={<Navigate to="/dashboard/home" />} />
                      <Route path="/dashboard/home" element={<Home />} />
                      <Route path="/dashboard/users" element={<UserTable />} />
                      <Route path="/dashboard/add-coaches" element={<AddCoaches />} />
                      <Route path="/dashboard/edit-coaches/:id" element={<EditCoach />} />
                      <Route path="/dashboard/coaches" element={<CoachesTable />} />
                      <Route path="/dashboard/add-gym" element={<AddGym />} />
                      <Route path="/dashboard/gyms" element={<GymTable />} />
                      <Route path="/dashboard/add-activities" element={<AddActivities />} />
                      <Route path="/dashboard/activities" element={<ActivitiesTable />} />
                      <Route path="/dashboard/user-support" element={<UserSupportTable />} />
                    </>
                  )}
                  {userRole === "gym" && (
                    <>
                      <Route path="/" element={<Navigate to="/gym/gym-coaches" />} />
                      <Route path="/gym/gym-coaches" element={<GymsPaneltable />} />
                    </>
                  )}
                  {userRole === "coach" && (
                    <>
                      {/* Render coach-specific routes */}
                    </>
                  )}
                </Route>
              </Routes>
            </Layout>
          }
        />
        <Route path="/auth/sign-in" element={<SignIn setUserRole={setUserRole} navigateToRolePage={navigateToRolePage} />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/verify-otp/:id/:token" element={<OTP />} />
        <Route path="/auth/reset-password/:id/:token" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/auth/invite/:token" element={<Invite/>} />
      </Routes>
    </>
  );
}

export default App;
