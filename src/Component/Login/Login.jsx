import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { useFormik } from "formik";
import { LoginSchema } from "../../Services/schema";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [authForm] = useState({ userName: "", password: "" });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: authForm,
    validationSchema: LoginSchema,
    onSubmit: async (values, action) => {
      console.log("values++===============>", values);
      await authFormHandler(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  const authFormHandler = async (values) => {
    await AccountService.adminlogin(values) // Corrected here to pass values directly
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("user", res.data.token.accessToken);
          sessionStorage.setItem("role", res.data.token.role);
          console.log("===>", auth);
          console.log("admin");
          toast.success("Login Successfully");
          auth.login();
          navigate("/welcome");
          window.location.reload();
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
      });
  };

  return (
    <div>
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(244,183,255,1) 0%, rgba(98,202,245,1) 100%)",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card text-white"
                style={{ borderRadius: "1rem", backgroundColor: "#6739B7" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">obhiasb</h2>
                    <p className="text-white-50 mb-5">
                      Hi! Admin Please enter your login credentials!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="userName" // Added name attribute
                        className="form-control form-control-lg"
                        placeholder="Enter Username"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.userName && touched.userName ? (
                        <p>{errors.userName}</p>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password" // Added name attribute
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password ? (
                        <p>{errors.password}</p>
                      ) : null}
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
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
