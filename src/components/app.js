import React, { Fragment } from "react";
import Header from "../layouts/Header/Header";
import Sidebar from "../layouts/SideBar/SideBar";
import Footer from "../layouts/Footer/Footer";
import Switcher from "../layouts/Switcher/Switcher";

import * as Switcherdata from "../data/Switcher/Switcherdata";
import { Outlet } from "react-router-dom";
import TabToTop from "../layouts/TabToTop/TabToTop";
import Context from "./context/Context";

export default function App() {
  return (
    <Fragment>
      <div className="horizontalMenucontainer">
        <TabToTop />
        <div className="page">
          <div className="page-main">
            <Context>

            <Header />
            </Context>
            <Sidebar />
            <div className="main-content app-content ">
              <div className="side-app">
                <div
                  className="main-container container-fluid"
                  onClick={() => {
                    Switcherdata.responsiveSidebarclose();
                    Switcherdata.Horizontalmenudefultclose();
                  }}
                >
                    <Outlet />
                </div>
              </div>
            </div>
          </div>
         
          <Switcher />
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
