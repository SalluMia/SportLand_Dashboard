import { HomeIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { GiTeacher } from "react-icons/gi";
import { UserTable } from "./pages/dashboard/Users";
import { BiSolidCategory } from "react-icons/bi";
import { InstructorTable } from "./pages/dashboard/instructor/tables";
import { SiGoogleclassroom } from "react-icons/si";
import { SessionTable } from "./pages/dashboard/sessions/tables";
import { MdSupportAgent } from "react-icons/md";
import { CoachesTable } from "./pages/dashboard/coaches/tables";
import { ActivitiesTable } from "./pages/dashboard/activities/tables";
import GymsPaneltable from "./pages/gympanel/gyms/GymsPaneltable";
import GymPlansTable from "./pages/gympanel/gymPlans/GymPlansTable";
import GymUserstable from "./pages/gympanel/gymUsers/GymUserstable";
const icon = {
  className: "w-5 h-5 text-inherit",
};

// Define routes for each role
export const routes = {
  admin: [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/home",
          element: <Home />,
        },
        {
          icon: <MdSupportAgent {...icon} />,
          name: "Coaches",
          path: "/coaches",
          element: <CoachesTable />,
        },
        {
          icon: <MdSupportAgent {...icon} />,
          name: "Gyms",
          path: "/gyms",
          element: <CoachesTable />,
        },
        {
          icon: <MdSupportAgent {...icon} />,
          name: "Activities",
          path: "/activities",
          element: <ActivitiesTable />,
        },
        {
          icon: <MdSupportAgent {...icon} />,
          name: "User Support",
          path: "/user-support",
          element: <SessionTable />,
        },
      ],
    },
  ],
  gym: [
    {
      layout: "gym",
      pages: [
        {
          icon: <MdSupportAgent {...icon} />,
          name: "Gym Coaches",
          path: "/gym-coaches",
          element: <GymsPaneltable />,
        },

        {
          icon: <MdSupportAgent {...icon} />,
          name: "Gym Plans",
          path: "/gym-plans",
          element: <GymPlansTable />,
        },

        {
          icon: <MdSupportAgent {...icon} />,
          name: "Gym Users",
          path: "/gym-users",
          element: <GymUserstable />,
        },


      ],
    },
  ],
  coach: [
    {
      layout: "coach",
      pages: [
        // Define coach-specific routes here
      ],
    },
  ],
};

export default routes;
