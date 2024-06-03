import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
export const statisticsCardsData = [
  {
    color: "white",
    icon: <FaUsers size={24} className="text-primary" />,
    title: "Total Users",
    value: "3,587",
    footer: {
      color: "text-green-500",
      value: "+35%",
      label: "than last week",
    },
  },

  {
    color: "white",
    icon: <GiTeacher size={24} className="text-primary" />,
    title: "Total Instructor",
    value: "1,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last month",
    },
  },
  {
    color: "white",
    icon: <SiGoogleclassroom size={24} className="text-primary" />,
    title: "Total Sessions",
    value: "145",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  // {
  //   color: "white",
  //   icon: ChartBarIcon,
  //   title: "Inventory Levels",
  //   value: "43,430",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+5%",
  //     label: "than last 3 month",
  //   },
  // },
];

export default statisticsCardsData;
