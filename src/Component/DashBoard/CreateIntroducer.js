import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import { useFormik } from "formik";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountService from "../../Services/AccountService";
import SingleCard from "../../common/singleCard";
import { CreateIntroducerSchema } from "../../Services/schema";

const CreateIntroducer = () => {
  const auth = useAuth();
  const [formData] = useState({
    firstname: "",
    lastname: "",
    userName: "",
    password: "",
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: formData,
    validationSchema: CreateIntroducerSchema,
    onSubmit: (values, action) => {
      console.log("values++===============>", values);
      introducerFormHandler(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  const introducerFormHandler = (values) => {
    AccountService.createIntroducer(values, auth.user)
      .then((res) => {
        console.log("res", res);
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        // console.log('error',err.response.data.message)
        toast.error(err.response.data.message);
        return;
      });
  };

  useEffect(() => {
    // Disable scrolling when this component is mounted
    document.body.style.overflow = "hidden";

    // Enable scrolling when this component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="d-flex justify-content-center "
      style={{ overflow: "hidden" }}
    >
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="row justify-content-center">
              <SingleCard
                style={{
                  backgroundColor: "#e6f7ff",
                }}
              >
                <SingleCard
                  className="card shadow-lg p-3 mb-5 bg-white rounded"
                  style={{
                    boxShadow:
                      "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="userName" className="form-label">
                          <FaEnvelope /> Introducer User Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          name="userName"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="UserName"
                        />
                        {touched.userName && errors.userName ? (
                          <div className="text-danger">{errors.userName}</div>
                        ) : null}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="firstname" className="form-label">
                          <FaUser /> First Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          name="firstname"
                          value={values.firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="First Name"
                        />
                        {touched.firstname && errors.firstname ? (
                          <div className="text-danger">{errors.firstname}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastname" className="form-label">
                          <FaUser /> Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          name="lastname"
                          value={values.lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Last Name"
                        />
                        {touched.lastname && errors.lastname ? (
                          <div className="text-danger">{errors.lastname}</div>
                        ) : null}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">
                          <FaLock /> Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                        />
                        {touched.password && errors.password ? (
                          <div className="text-danger">{errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row justify-content-center mt-4">
                        <div className="col-md-6 submit-button">
                          <button
                            type="submit"
                            className="btn btn-dark w-100 fw-bold"
                          >
                            Create Introducer
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </SingleCard>
              </SingleCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIntroducer;
