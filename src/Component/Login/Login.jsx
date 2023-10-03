import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClickUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleClickPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.error("Username and password cannot be empty");
      return;
    }
    AccountService.adminlogin({
      userName: userName,
      password: password,
      // persist: persist,
    })
      .then((res) => {
        console.log("res", res);
        console.log("res", res.data.token.accessToken);
        if (res.status === 200) {
          localStorage.setItem("user", res.data.token.accessToken);
          localStorage.setItem("role", res.data.role);
          console.log("===>", auth);
          console.log("admin");
          toast.success("Login Successfully");
          // alert("login successfull");
          auth.login();
          navigate("/welcome");
        } else {
          toast.error(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Invalid User Id Or Password");
          return;
        }
        if (err.response.status === 403) {
          navigate("/admindash", {
            state: { user: userName },
            replace: false,
          });
          return;
        }
      });
  };

  return (
    <div>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">obhisab.com</h2>
                    <p class="text-white-50 mb-5">
                      Hi! Admin Please enter your login credentials!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        onChange={handleClickUserName}
                      />
                      <label class="form-label" for="typeEmailX">
                        UserName
                      </label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        onChange={handleClickPassword}
                      />
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
