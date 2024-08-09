import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../Utils/Auth";
// import useLocalStorage from "use-local-storage";

const Welcome = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [theme, setTheme] = useLocalStorage(
  //   "theme",
  //   defaultDark ? "dark" : "light"
  // );
const auth =useAuth();
console.log("auth", auth);
  return (
    <div className="container-fluid  mb-3 ">
      <nav className="navbar navbar-dark bg-dark py-2 ">
        <div className="container d-flex justify-content-center">
          <a className="navbar-brand " href="#">
            obhiasb
            <br />
          </a>
        </div>
      </nav>
      <div className="d-flex flex-column ">
        <div
          className="flex-grow-1 d-flex justify-content-center align-items-center"
          style={{
            minHeight: "calc(100vh - 120px)",
            background:
              "radial-gradient(circle, rgba(244,183,255,1) 0%, rgba(98,202,245,1) 100%)",
          }}
        >
          <div className="container text-center">
            <h1 className="display-5">Welcome to obhiasb</h1>

            <p className="lead">
              This is The central hub for managing accounts.
            </p>
            <div className="Guidance p-4 border rounded">
              <h2>Getting Started</h2>
              <p>Follow these steps to start using the CRM:</p>

              <ol
                className="mt-4 p-5  text-white rounded list-group list-group-numbered"
                style={{
                  textAlign: "left",
                  backgroundImage:
                    "radial-gradient(circle, rgba(245,255,183,1) 0%, rgba(98,202,245,1) 100%)",
                }}
              >
                <li className="list-group-item">
                  Ask Admin to Create an account.
                </li>
                <li className="list-group-item">
                  Utilize essential menu items in the sidebar.
                </li>
                <li className="list-group-item">
                  Checkout Transaction for Deposit/Withdraw .
                </li>
                <li className="list-group-item">
                  Access the Bank option for Banking Related Functions.
                </li>
                <li className="list-group-item">
                  Select the Website option for Website Related Functions.
                  {/* Transactions created are automatically updated in the
                  dashboard. */}
                </li>
                <li className="list-group-item">
                  Create Admin/User/Introducer From Create
                </li>
                <li className="list-group-item">
                  See All Profiles From Profile
                </li>
                <li className="list-group-item">
                  Utilize analytics to gain insights.
                </li>
              </ol>
            </div>
          </div>
          <footer
            className="bg-dark text-white text-center py-1"
            style={{
              position: "fixed",
              bottom: "0",
              width: "100%",
              zIndex: "10",
            }}
          >
            &copy; 2023 obhiasb All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
