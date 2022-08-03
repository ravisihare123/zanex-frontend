import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OutletCheck from "./outletCheck/OutletCheck";
import Context from "./components/context/Context";

//App
const App = React.lazy(() => import("./components/app"));
const Custompages = React.lazy(() => import("./components/custompages"));

//Dashboard
const Dashboard = React.lazy(()=> import("./components/Dashboard/Dashboard"));


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
             
                <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
                  <Route index element={<Dashboard />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/dashboard`}
                    element={<Dashboard />}
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
            </Routes>'
            </Context>
          </React.Suspense>
        </BrowserRouter>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
