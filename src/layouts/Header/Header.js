import { setRef } from "@fullcalendar/core";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { Dropdown, Navbar, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetContext } from "../../components/context/Context";

export function Header() {
  const navigate = useNavigate()
  const { userInfo } = GetContext();
  // alert("header",JSON.stringify(userInfo?.name))

  // console.log(JSON.stringify(userInfo?.name));
  //full screen
  function Fullscreen() {
    if (
      (document.fullScreenElement && document.fullScreenElement === null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  //dark-mode
  const Darkmode = () => {
    document.querySelector(".app").classList.toggle("dark-mode");
  };
  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector(".app").classList.toggle("sidenav-toggled");
  };
  // responsivesearch
  const responsivesearch = () => {
    document.querySelector(".header-search").classList.toggle("show");
  };
  //swichermainright
  const swichermainright = () => {
    document.querySelector(".demo_changer").classList.toggle("active");
    document.querySelector(".demo_changer").style.right = "0px";
  };
  // const fetchAdminName = async() => {
  //   var result = await axios.post("http://localhost:5000/login/admindisplay", {password})
  //   setName(JSON.stringify(result.data))
  // }
  // alert(JSON.stringify(name))
  // useEffect(() => {
  //   fetchAdminName()
  // }, [])
  


  const handleSignOut = ()=>{
    alert("logout with clear token");
    localStorage.clear()
    navigate(`/custompages/login`)
  }
  return (
    <Navbar expand="md" className="app-header header sticky">
      <Container fluid className="main-container">
        <div className="d-flex align-items-center">
          <Link
            aria-label="Hide Sidebar"
            className="app-sidebar__toggle"
            to="#"
            onClick={() => openCloseSidebar()}
          ></Link>
          <div className="responsive-logo">
            <Link
              to={`/dashboard/`}
              className="header-logo"
            >
              <img
                src={require("../../assets/images/brand/logo-3.png")}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={require("../../assets/images/brand/logo.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <Link
            className="logo-horizontal "
            to={`/dashboard/`}
          >
            <img
              src={require("../../assets/images/brand/logo.png")}
              className="header-brand-img desktop-logo"
              alt="logo"
            />
            <img
              src={require("../../assets/images/brand/logo-3.png")}
              className="header-brand-img light-logo1"
              alt="logo"
            />
          </Link>
          <div className="main-header-center ms-3 d-none d-lg-block">
            <input
              className="form-control"
              placeholder="Search for anything..."
              type="search"
            />
            <Button variant="" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </div>
          <div className="d-flex order-lg-2 ms-auto header-right-icons">
            <Navbar.Toggle
              aria-controls="navbarScroll"
              className="navresponsive-toggler d-lg-none ms-auto"
              type="button"
            >
              <span className="navbar-toggler-icon fe fe-more-vertical text-dark"></span>
            </Navbar.Toggle>

            <div className="navbar navbar-collapse responsive-navbar p-0">
              <Navbar.Collapse
                className="navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <div className="d-flex order-lg-2">
                  <div className="dropdown d-block d-lg-none">
                    <Link
                      to="#"
                      className="nav-link icon"
                      onClick={() => responsivesearch()}
                    >
                      <i className="fe fe-search"></i>
                    </Link>
                    <div className="dropdown-menu header-search dropdown-menu-start">
                      <div className="input-group w-100 p-2 border">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search...."
                        />
                        <div className="input-group-text btn btn-primary">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown d-md-flex">
                    <Link
                      to="#"
                      className="nav-link icon theme-layout nav-link-bg layout-setting"
                      onClick={() => Darkmode()}
                    >
                      <span className="dark-layout">
                        <i className={`fe ${"fe-moon"}`}></i>
                      </span>
                      <span className="light-layout">
                        <i className={`fe ${"fe-sun"}`}></i>
                      </span>
                    </Link>
                  </div>
                  <div className="dropdown d-md-flex">
                    <Link
                      to="#"
                      className="nav-link icon full-screen-link nav-link-bg"
                      onClick={Fullscreen}
                    >
                      <i className="fe fe-minimize fullscreen-button"></i>
                    </Link>
                  </div>
                 
                
                  <Dropdown className=" d-md-flex profile-1">
                    <Dropdown.Toggle
                      className="nav-link profile leading-none d-flex px-1"
                      variant=""
                    >
                      <span>
                        <img
                          src={require("../../assets/images/users/8.jpg")}
                          alt="profile-user"
                          className="avatar  profile-user brround cover-image"
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading">
                        <div className="text-center">
                          <h5 className="text-dark mb-0">{ userInfo?.userName}</h5>
                          <small className="text-muted">Administrator</small>
                        </div>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      
                      <Dropdown.Item
                        href={`/custompages/login/`}
                      >
                        <i className="dropdown-icon fe fe-alert-circle"></i>
                        <span onClick={()=>handleSignOut()}>Sign out</span> 
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                 
                </div>
              </Navbar.Collapse>
            </div>
            
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
