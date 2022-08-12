import React, { useState,createContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata";
import jwt_decode from "jwt-decode";
import { GetContext } from "../../context/Context";
import * as  Notification from "../../../components/Notifications"
export default function Login() {
  // const { email, setEmail, password, setPassword } = GetContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isLoading, setIsLoading} = GetContext()
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      var result = await axios.post(
        "http://localhost:5000/login/admindisplay",
        {
          email: email,
          password: password,
        }
      );
      if (result.data) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
          "email",
          jwt_decode(result.data.token).email,
          result.data.token.name
        );
        Notification.success(result.msg)
       
        window.location.replace(`${process.env.PUBLIC_URL}/dashboard`);
        navigate(`${process.env.PUBLIC_URL}/dashboard`, { replace: true });
      } else {
        alert("invalid email or password!");
        alert(result.status)
        Notification.error(result.msg)
      }
      
    }
    catch (err) {
      alert(err)
      setIsLoading(false)
      Notification.error(err.message);
      
    }

    
  };
  return (
    <div className="login-img">
      <div className="page">
        <div className="dropdown float-end custom-layout">
          <div
            className="demo-icon nav-link icon mt-4 bg-primary"
            onClick={() => custompagesswitcherdata.Swichermainright()}
          >
            <i className="fe fe-settings fa-spin text_primary"></i>
          </div>
        </div>
        <div
          className=""
          onClick={() => custompagesswitcherdata.Swichermainrightremove()}
        >
          <div className="col col-login mx-auto">
            <div className="text-center">
              <img
                src={require("../../../assets/images/brand/logo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <form className="login100-form validate-form">
                  <span className="login100-form-title">Login</span>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="container-login100-form-btn">
                    <div className="btn-list btn-animation">
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSubmit()}
                      className={
                        isLoading
                          ? "login100-form-btn btn-primary btn-loaders"
                          : "login100-form-btn btn-primary"
                      }
                      variant="primary"
                    >
                      {
                        isLoading ? (
                          <span className="loading"> loading</span>
                        ) : (
                            <span>Login</span>
                        )
                      }
                    </Button>
                    </div>
                    </div>
                 
                </form>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-center my-3">
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-google"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </div>
              </Card.Footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
