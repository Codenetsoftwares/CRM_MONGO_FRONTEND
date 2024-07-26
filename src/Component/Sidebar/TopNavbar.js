/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
const TopNavbar = ({ selectedMenuItem }) => {
  console.log("=====>>> menu item", selectedMenuItem);
  const nav = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out of this site?"
    );
    if (confirmed) {
      auth.logout();
      toast.success("Logout successfully");
      nav("/");
    }
  };
  const handelresetpass = () => {
    nav("/resetpassword");
  };

  let heading = "Dashboard";

  // Set heading based on selectedMenuItem
  if (selectedMenuItem === "dashboard") {
    heading = "Dashboard";
  } else if (selectedMenuItem === "Deposit") {
    heading = "Deposit";
  } else if (selectedMenuItem === "Withdraw") {
    heading = "Withdraw";
  } else if (selectedMenuItem === "Bank") {
    heading = "Bank Details";
  } else if (selectedMenuItem === "Website") {
    heading = "Website Details";
  } else if (selectedMenuItem === "createSubAdmin") {
    heading = "Create Sub-Admin";
  } else if (selectedMenuItem === "createUser") {
    heading = "Create User";
  } else if (selectedMenuItem === "createIntroducer") {
    heading = "Create Introducer";
  } else if (selectedMenuItem === "userProfile") {
    heading = "user Profile";
  } else if (selectedMenuItem === "introducerProfile") {
    heading = "Introducer Profile";
  } else if (selectedMenuItem === "subAdminProfile") {
    heading = "Sub-Admin Profile";
  } else if (selectedMenuItem === "AllTransactionDetails") {
    heading = "All Transaction Details";
  } else if (selectedMenuItem === "MyTransactions") {
    heading = "My Transactions";
  } else if (selectedMenuItem === "AllTransactionRequest") {
    heading = "All Transaction Requests";
  } else if (selectedMenuItem === "introducerTransactionRequest") {
    heading = "Introducer Transactions Requests";
  } else if (selectedMenuItem === "BankEdit") {
    heading = "Bank Edit";
  } else if (selectedMenuItem === "BankDelete") {
    heading = "Bank Delete";
  } else if (selectedMenuItem === "NewBank") {
    heading = "New Bank Details";
  } else if (selectedMenuItem === "WebsiteEdit") {
    heading = "Website Edit";
  } else if (selectedMenuItem === "WebsiteDelete") {
    heading = "Website Delete";
  }else if (selectedMenuItem === "newWebsite") {
    heading = "New Website Details";
  }else if (selectedMenuItem === "AllTransactionTrash") {
    heading = "All Transaction Trash Details";
  }
  return (
    <>
      <nav
        className="main-header navbar navbar-expand navbar-white navbar-light  "
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1001,
          backgroundColor: "#B1A5FA",
        }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              role="button"
              data-widget="pushmenu"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            {/* <Link to="welcome" className="nav-link">
              Home
            </Link> */}
          </li>
        </ul>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <span
        className="navbar-brand"
        style={{ color: "white", fontWeight: "bold" }}
      >
        {heading}
      </span>
    </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              title="Reset Password"
              role="button"
              onClick={handelresetpass}
            >
              <i className="fas fa-edit"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              title="Fullscreen"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              title="Log Out"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt" style={{ color: "red" }}></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavbar;
