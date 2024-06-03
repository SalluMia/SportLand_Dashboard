import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Layout({children, userRole}) {
  console.log(routes); // Check the original routes array
  
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        // routes={sideNavRoute
        // }
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        userRole={userRole}
      />
      <div >
        <div className="xl:ml-72 ">
        <DashboardNavbar />
        </div>
        <div className="p-4 xl:ml-80">
        {/* <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        {children}
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
    </div>
  );
}

Layout.displayName = "/src/layout/dashboard.jsx";

export default Layout;
