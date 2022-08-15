import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OutletCheck from "./outletCheck/OutletCheck";
import Context from "./components/context/Context";
// import UserInfo from "./components/pages/User/UserInfo";


//App
const App = React.lazy(() => import("./components/app"));
const Custompages = React.lazy(() => import("./components/custompages"));

//Dashboard
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
//Masters
const Airport = React.lazy(() => import("./components/Pages/Master/Airport/AirportInfo"));
const AircraftCategory = React.lazy(() => import("./components/Pages/Master/AircraftCategory/AircraftCategoryInfo"))
const Aircraft = React.lazy(() => import("./components/Pages/Master/Aircraft/AircraftInfo"))
const FarGrade = React.lazy(() => import("./components/Pages/Master/FarGrade/FarGradeInfo"));
const Pilot = React.lazy(() => import('./components/Pages/Master/Pilot/PilotInfo'));
const Pax = React.lazy(() => import('./components/Pages/Master/Pax/PaxInfo'));
const ChargeTable = React.lazy(() => import("./components/Pages/Master/ChargeTable/ChargeTableInfo"));


//user
const UserInfo = React.lazy(() => import("./components/Pages/user/UserInfo"));

//custom Pages
const Login = React.lazy(()=>import("./components/CustomPages/Login/Login"));
const Register = React.lazy(()=>import("./components/CustomPages/Register/Register"));
const ForgotPassword = React.lazy(()=>import("./components/CustomPages/ForgotPassword/ForgotPassword"));
const LockScreen = React.lazy(()=>import("./components/CustomPages/LockScreen/LockScreen"));


const Loaderimg = () => {
  return (
    <div id="global-loader">
      <img
        src={require("./assets/images/loader.svg").default}
        className="loader-img"
        alt="Loader"
      />
    </div>
  );
};
const Root = () => {

  console.log(process.env.PUBLIC_URL)

  return (
    <Fragment>
      <BrowserRouter>
        <React.Suspense fallback={Loaderimg()}>
          <Context>
            <Routes>
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/login`}
                element={<Login />}
              />
              <Route path={"/"} element={<OutletCheck />}>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
                  <Route index element={<Dashboard />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/dashboard`}
                    element={<Dashboard />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/master/airport`}
                    element={<Airport />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/master/aircraftcategory`}
                    element={<AircraftCategory />}
                  />
                  <Route path={`${process.env.PUBLIC_URL}/master/aircraft`}
                    element={<Aircraft />} />
                  
                  <Route path={`${process.env.PUBLIC_URL}/master/fargrade`}
                    element={<FarGrade />}
                  />
                  <Route path={`${process.env.PUBLIC_URL}/master/pilot`}
                    element={<Pilot/>}
                  />
                  <Route path={`${process.env.PUBLIC_URL}/master/pax`}
                    element={<Pax/>}
                  />
                  <Route path={`${process.env.PUBLIC_URL}/master/chargetable`}
                    element={<ChargeTable/>}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/userinfo`}
                    element={<UserInfo />}
                  />
                </Route>

                <Route
                  path={`${process.env.PUBLIC_URL}/`}
                  element={<Custompages />}
                >
                  <Route
                    path={`${process.env.PUBLIC_URL}/custompages/register`}
                    element={<Register />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/custompages/forgotPassword`}
                    element={<ForgotPassword />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/custompages/lockScreen`}
                    element={<LockScreen />}
                  />
                </Route>
              </Route>
            </Routes>
          </Context>
        </React.Suspense>
      </BrowserRouter>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
