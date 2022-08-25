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
const ChargeTableProvider = React.lazy(() => import('./components/Pages/Master/ChargeTable/ChargeTableContext'));
const ChargeTableForm  = React.lazy(()=>import("./components/Pages/Master/ChargeTable/ChargeTableForm"))


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

  // console.log(process.env.PUBLIC_URL)

  return (
    <Fragment>
      <BrowserRouter>
        <React.Suspense fallback={Loaderimg()}>
          <Context>
            <Routes>
              <Route path={`/custompages/login`} element={<Login />} />
              <Route path={"/"} element={<OutletCheck />}>
                <Route path={`/`} element={<App />}>
                  {/* <Route index element={<Dashboard />} /> */}
                  <Route path={`/dashboard`} element={<Dashboard />} />
                  <Route path={`/master/airport`} element={<Airport />} />
                  <Route
                    path={`/master/aircraftcategory`}
                    element={<AircraftCategory />}
                  />
                  <Route path={`/master/aircraft`} element={<Aircraft />} />

                  <Route path={`/master/fargrade`} element={<FarGrade />} />
                  <Route path={`/master/pilot`} element={<Pilot />} />
                  <Route path={`/master/pax`} element={<Pax />} />
                  <Route path={`/master/chargetable`} element={<ChargeTable />}/>
                  <Route
                    path={`/master/chargetable/form`}
                    element={
                      <ChargeTableProvider>
                        <ChargeTableForm />
                      </ChargeTableProvider>
                    }
                  />

                  <Route path={`/userinfo`} element={<UserInfo />} />
                </Route>

                <Route path={`/`} element={<Custompages />}>
                  <Route
                    path={`/custompages/register`}
                    element={<Register />}
                  />
                  <Route
                    path={`/custompages/forgotPassword`}
                    element={<ForgotPassword />}
                  />
                  <Route
                    path={`/custompages/lockScreen`}
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
