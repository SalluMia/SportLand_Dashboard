import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import { FaMobile, FaUsers } from "react-icons/fa";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DialogDefault } from "@/components/Modal";
import { DetailSession } from "./sessions/DetailSession";
import { Link, useNavigate } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";

export function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [upComingSessions, setUpComingSessions] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [detail, setDetail] = useState(null);
  const handleDeleteModalOpen = () => setisDelete(!isDelete);
  const handleDetailModalOpen = () => setDetail(!detail);
  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/api/class/deleteClass/${
          selectedItem?._id
        }`,
      );
      getUpcomingSessions();
      toast.success(data.message);
      setisDelete(false);
      setselectedItem(null);
    } catch (error) {
      setisDelete(false);
      setselectedItem(null);
      console.log(error);
      toast.error("Server error,Please refresh the page...");
    }
  };
  const getDashboardStats = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard/getDashboardStats`,
      );
      let result = data?.data;
      let arrangeData = [
        {
          color: "white",
          icon: <FaUsers size={24} className="text-primary" />,
          title: "Total Users",
          value: result?.users,
        },

        {
          color: "white",
          icon: <GiTeacher size={24} className="text-primary" />,
          title: "Total Instructor",
          value: result?.instructor,
        },
        {
          color: "white",
          icon: <SiGoogleclassroom size={24} className="text-primary" />,
          title: "Total Sessions",
          value: result?.sessions,
        },
      ];
      setStats(arrangeData);
      setStatsLoading(false);
    } catch (error) {
      setStatsLoading(false);
      console.log(error);
      toast.error("Server error.Please refresh the page..");
    }
  };
  const getUpcomingSessions = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard/getUpcomingSessions`,
      );
      setUpComingSessions(data?.sessions);
      setSessionLoading(false);
    } catch (error) {
      setSessionLoading(false);
      console.log(error);
      toast.error("Server error.Please refresh the page..");
    }
  };
  useEffect(() => {
    getDashboardStats();
    getUpcomingSessions();
  }, []);

  return (
    <>
      {isDelete && (
        <DialogDefault
          handleChange={handleDelete}
          handleOpen={handleDeleteModalOpen}
          icon={<GoAlertFill size={45} />}
          open={isDelete}
          text="Are you sure you want to delete this session?"
          buttonText="Confirm"
        />
      )}
      {detail && (
        <DetailSession
          handleOpen={handleDetailModalOpen}
          data={detail}
          open={detail}
        />
      )}
      <div className="mt-12">
        {statsLoading ? (
          <div role="status" className="w-full flex justify-center mt-32 mb-32">
            <svg
              aria-hidden="true"
              class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
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
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
              {stats?.map(({ icon, title, footer, ...rest }) => (
                <StatisticsCard
                  key={title}
                  {...rest}
                  title={title}
                  icon={icon}
                  // footer={
                  //   <Typography className="font-normal text-blue-gray-600">
                  //     <strong className={footer.color}>{footer.value}</strong>
                  //     &nbsp;{footer.label}
                  //   </Typography>
                  // }
                />
              ))}
            </div>
          </>
        )}
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-blue-gray-400"
                  />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
          <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Upcoming Sessions
                </Typography>
              </div>
              <div>
                <Link to="/dashboard/sessions">
                  <Button
                    type="submit"
                    className="w-full text-dark bg-primary hover:bg-opacity-90 px-12 rounded-3xl"
                  >
                    View All Sessions
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "S#No",

                      "instructor",
                      "Title",
                      "date",
                      "start Time",
                      "length",
                      "attendees",
                      "Action",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessionLoading ? (
                    <td colSpan={8}>
                      <div role="status" className="text-center p-3">
                        <svg
                          aria-hidden="true"
                          class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                    </td>
                  ) : (
                    <>
                      {upComingSessions?.length ? (
                        upComingSessions?.map(
                          (
                            {
                              _id,
                              name,
                              purpose,
                              description,
                              instructor,
                              date,
                              startTime,
                              length,
                              attendees,
                            },
                            key,
                          ) => {
                            const className = `py-3 px-5 text-center ${
                              key === upComingSessions?.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {key + 1}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center gap-4">
                                    <Avatar
                                      src={`${import.meta.env.VITE_BASE_URL}/${
                                        instructor?.image
                                      }`}
                                      alt={instructor?.image}
                                      size="sm"
                                      // variant="rounded"
                                    />
                                    <div className="overflow-hidden whitespace-nowrap">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                        style={{ textOverflow: "ellipsis" }}
                                      >
                                        {instructor?.name}
                                      </Typography>
                                    </div>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {name}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {moment(date).format("DD/MM/YYYY")}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {startTime}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {length}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {attendees?.length}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Menu>
                                    <MenuHandler>
                                      <Button
                                        variant="text"
                                        className="bg-transparent hover:bg-transparent hover:shadow-none focus:bg-transparent focus:shadow-none"
                                      >
                                        {" "}
                                        <BsThreeDotsVertical className="text-black" />
                                      </Button>
                                    </MenuHandler>
                                    <MenuList>
                                      <MenuItem
                                        onClick={() => {
                                          setDetail({
                                            _id,
                                            name,
                                            purpose,
                                            description,
                                            instructor,
                                            date,
                                            startTime,
                                            length,
                                            attendees,
                                          });
                                        }}
                                      >
                                        Detail
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          navigate(
                                            `/dashboard/edit-session/${_id}?go=dashboard`,
                                          );
                                        }}
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          setisDelete(true);
                                          setselectedItem({ _id });
                                        }}
                                      >
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </td>
                              </tr>
                            );
                          },
                        )
                      ) : (
                        <td colSpan={8} className="text-center">
                          <span className="text-sm"> No record found</span>
                        </td>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
