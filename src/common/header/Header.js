import React, { Fragment, useState } from "react";
import LogoImg from "../../assets/logo.svg";
import Modal from "react-modal";
import "./forms.css"
import {
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import "./Header.css";
import TabsPanel from "../tabsPanel/TabsPanel";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Header({ bookShow, bookShowId }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  function loginFormHandler() {
    setIsLoggedIn(true);
    setIsLoginFormOpen(false);
  };

  function loginHandler() {
    setIsLoginFormOpen(true);
  };

  function changeHandler(event, newValue) {
    setValue(newValue);
  };

  function registerFormHandler() {
    setIsLoggedIn(true);
    setSuccess(true);
  };

  return (
    <Fragment>
      <Router>
        <div className="header">
          <Link to="/">
            <img className="logo" src={LogoImg} alt="logo" />
          </Link>
          <div className="button-collection">
            {!isLoggedIn ? (
              <Button variant="contained" name="Login" onClick={loginHandler}>
                Login
              </Button>
            ) : (
              <Button variant="contained" name="Logout" onClick={() => { setIsLoggedIn(false); }}>
                Logout
              </Button>
            )}

            {bookShow ? (
              <Link to={"/book-show/" + bookShowId} style={{ textDecoration: "none" }} >
                <Button variant="contained" name="Book Show" color="primary">
                  Book Show
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        <Modal
          isOpen={isLoginFormOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "750px",
              right: "500px",
              bottom: "40px",
              width: "300px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <Tabs value={value} onChange={changeHandler}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <TabsPanel value={value} index={0}>
            <TextField label="Username" required className="register-login-form-fields" />
            <TextField label="Password" required type="password" className="register-login-form-fields" />
            <Button variant="contained" onClick={loginFormHandler} color="primary" className="submit-button">
              Login
            </Button>
          </TabsPanel>
          <TabsPanel value={value} index={1}>
            <TextField label="First Name" required className="register-login-form-fields" />
            <TextField label="Last Name" className="register-login-form-fields" />
            <TextField label="Email" required className="register-login-form-fields" />
            <TextField label="Password" required type="password" className="register-login-form-fields" />
            <TextField label="Contact No" required className="register-login-form-fields" />
            {success ? (
              <Typography variant="subtitle1">
                Registration Successful. Please login!
              </Typography>
            ) : null}

            <Button variant="contained" onClick={registerFormHandler} color="primary" className="submit-button" >
              Register
            </Button>
          </TabsPanel>
        </Modal>
      </Router>
    </Fragment>
  );
};
