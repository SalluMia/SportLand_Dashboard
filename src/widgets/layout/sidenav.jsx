import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { routes } from "../../routes"; // Import routes defined earlier

export function Sidenav({ brandImg, brandName, userRole }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-primary shadow-sm",
    transparent: "bg-transparent",
  };

  // Filter routes based on user's role
  const filteredRoutes = routes[userRole];

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50  h-[calc(100vh)] w-72  transition-transform duration-300 xl:translate-x-0 border border-primary`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="flex justify-center items-center flex-col"
          >
            <img src="/img/logo.png" alt="" className="w-40 h-40  " />
            <h1 className="italic">Lemak land Sport</h1>
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {filteredRoutes?.map(({ layout, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={isActive ? "white" : "transparent"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <div className={`${isActive ? "text-primary" : ""}`}>
                        {icon}
                      </div>
                      <Typography
                        color="inherit"
                        className={`font-medium capitalize ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Head Start",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  userRole: PropTypes.string.isRequired,
};

export default Sidenav;
