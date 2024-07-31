import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../Utils/Auth";
import { FaUser, FaEnvelope, FaLock, FaMobile, FaKey, FaIdCard, FaPercent } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleCard from "../../common/singleCard";
import { CreateUserSchema } from "../../Services/schema";
import AccountService from "../../Services/AccountService";
import { debounce } from 'lodash';

const CreateActualUser = () => {
  // Get authentication context
  const auth = useAuth();

  // Initial form values
  const initialValues = {
    firstname: "",
    userName: "",
    lastname: "",
    password: "",
    contactNumber: "",
    introducersUserName: "",
    introducersUserName1: "",
    introducersUserName2: "",
    introducerPercentage: "",
    introducerPercentage1: "",
    introducerPercentage2: "",
  };

  // State hooks for storing introducer options and filtered results
  const [introducerOption, setIntroducerOption] = useState([]);
  const [introducerOption1, setIntroducerOption1] = useState([]);
  const [introducerOption2, setIntroducerOption2] = useState([]);
  const [filteredIntroducerOption, setFilteredIntroducerOption] = useState([]);
  const [filteredIntroducerOption1, setFilteredIntroducerOption1] = useState([]);
  const [filteredIntroducerOption2, setFilteredIntroducerOption2] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible1, setIsDropdownVisible1] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);

  // Debounced search handler for introducer user name
  const handleSearchIntroducerUserName = useCallback(
    debounce((value) => {
      if (value) {
        // Filter introducer options based on user input
        const filteredItems = introducerOption.filter(item =>
          item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredIntroducerOption(filteredItems);
        setIsDropdownVisible(true); // Show dropdown if there are results
      } else {
        setFilteredIntroducerOption([]);
        setIsDropdownVisible(false); // Hide dropdown if input is empty
      }
    }, 1300), [introducerOption]
  );

  // Debounced search handler for introducer user name 1
  const handleSearchIntroducerUserName1 = useCallback(
    debounce((value) => {
      if (value) {
        // Filter introducer options based on user input
        const filteredItems = introducerOption1.filter(item =>
          item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredIntroducerOption1(filteredItems);
        setIsDropdownVisible1(true); // Show dropdown if there are results
      } else {
        setFilteredIntroducerOption1([]);
        setIsDropdownVisible1(false); // Hide dropdown if input is empty
      }
    }, 1300), [introducerOption1]
  );

  // Debounced search handler for introducer user name 2
  const handleSearchIntroducerUserName2 = useCallback(
    debounce((value) => {
      if (value) {
        // Filter introducer options based on user input
        const filteredItems = introducerOption2.filter(item =>
          item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredIntroducerOption2(filteredItems);
        setIsDropdownVisible2(true); // Show dropdown if there are results
      } else {
        setFilteredIntroducerOption2([]);
        setIsDropdownVisible2(false); // Hide dropdown if input is empty
      }
    }, 1300), [introducerOption2]
  );

  // Fetch introducer options on component mount
  useEffect(() => {
    AccountService.IntroducerUserId(auth.user).then((res) => {
      setIntroducerOption(res.data);
      setIntroducerOption1(res.data);
      setIntroducerOption2(res.data);
      setFilteredIntroducerOption(res.data);
      setFilteredIntroducerOption1(res.data);
      setFilteredIntroducerOption2(res.data);
    });
  }, [auth]);

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    // Convert percentage fields to numbers
    values.introducerPercentage = parseFloat(values.introducerPercentage);
    values.introducerPercentage1 = parseFloat(values.introducerPercentage1);
    values.introducerPercentage2 = parseFloat(values.introducerPercentage2);

    // Check if passwords match before submitting
    if (values.password === values.confirmPassword) {
      AccountService.createActualuser(values, auth.user)
        .then((res) => {
          console.log("res", res);
          toast.success(res.data.message);
          resetForm();  // Reset the form after successful submission
        })
        .catch((err) => {
          console.log("error", err.response.data.message);
          toast.error(err.response.data.message); // Display error message
          return;
        });
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="row justify-content-center">
            <SingleCard className="mt-2" style={{ backgroundColor: "#e6f7ff" }}>
              <SingleCard
                className="card shadow-lg p-3 mb-5 bg-white rounded"
                style={{
                  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                }}
              >
                <div className="card-body">
                  <Formik
                    initialValues={initialValues} // Initial form values
                    validationSchema={CreateUserSchema} // Validation schema
                    onSubmit={handleSubmit} // Submit handler
                  >
                    {({ errors, touched, setFieldValue, handleChange, handleSubmit }) => (
                      <Form>
                        <div className="row g-3">
                          {/* User Name Field */}
                          <div className="col-md-4">
                            <label htmlFor="userName" className="form-label">
                              <FaEnvelope /> User Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="userName"
                              name="userName"
                              placeholder="Enter User Name"
                            />
                            <ErrorMessage name="userName" component="div" className="text-danger" />
                          </div>

                          {/* Contact Number Field */}
                          <div className="col-md-4">
                            <label htmlFor="contactNumber" className="form-label">
                              <FaMobile /> Enter Contact No.
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="contactNumber"
                              name="contactNumber"
                              placeholder="Contact Number"
                            />
                            <ErrorMessage name="contactNumber" component="div" className="text-danger" />
                          </div>

                          {/* First Name Field */}
                          <div className="col-md-4">
                            <label htmlFor="firstname" className="form-label">
                              <FaUser /> First Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="firstname"
                              name="firstname"
                              placeholder="Enter First Name"
                            />
                            <ErrorMessage name="firstname" component="div" className="text-danger" />
                          </div>

                          {/* Last Name Field */}
                          <div className="col-md-4">
                            <label htmlFor="lastname" className="form-label">
                              <FaUser /> Last Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="lastname"
                              name="lastname"
                              placeholder="Enter Last Name"
                            />
                            <ErrorMessage name="lastname" component="div" className="text-danger" />
                          </div>

                          {/* Password Field */}
                          <div className="col-md-4">
                            <label htmlFor="password" className="form-label">
                              <FaLock /> Password
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="password"
                              className={`form-control`}
                              id="password"
                              name="password"
                              placeholder="Enter Password"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>

                          {/* Confirm Password Field */}
                          <div className="col-md-4">
                            <label htmlFor="confirmPassword" className="form-label">
                              <FaKey /> Confirm Password
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control `}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Confirm Password"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                          </div>

                          {/* Introducer User Name Field */}
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="introducersUserName">
                                <FaIdCard /> Introducer's User Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                id="introducersUserName"
                                name="introducersUserName"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleSearchIntroducerUserName(e.target.value); // Trigger search on change
                                }}
                                placeholder="Search Introducer Name"
                              />
                              <ErrorMessage name="introducersUserName" component="div" className="text-danger" />
                              {/* Dropdown for search results */}
                              {isDropdownVisible && (
                                <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0, position: 'absolute', zIndex: 1, background: 'white', width: '93%', maxHeight: '120px', overflow: 'auto' }}>
                                  {filteredIntroducerOption.length > 0 ? (
                                    filteredIntroducerOption.map((option, index) => (
                                      <li
                                        key={index}
                                        onClick={() => {
                                          setFieldValue('introducersUserName', option.userName); // Set selected value
                                          setIsDropdownVisible(false); // Hide dropdown
                                        }}
                                        style={{ padding: '8px', cursor: 'pointer' }}
                                      >
                                        {option.userName}
                                      </li>
                                    ))
                                  ) : (
                                    <li style={{ padding: '8px' }}>Not found</li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Introducer User Name 1 Field */}
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="introducersUserName1">
                                <FaIdCard /> Introducer's User Name 1
                              </label>
                              <Field
                                id="introducersUserName1"
                                name="introducersUserName1"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleSearchIntroducerUserName1(e.target.value); // Trigger search on change
                                }}
                                placeholder="Search Introducer Name 1"
                              />
                              <ErrorMessage name="introducersUserName1" component="div" className="text-danger" />
                              {/* Dropdown for search results */}
                              {isDropdownVisible1 && (
                                <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0, position: 'absolute', zIndex: 1, background: 'white', width: '93%', maxHeight: '120px', overflow: 'auto' }}>
                                  {filteredIntroducerOption1.length > 0 ? (
                                    filteredIntroducerOption1.map((option, index) => (
                                      <li
                                        key={index}
                                        onClick={() => {
                                          setFieldValue('introducersUserName1', option.userName); // Set selected value
                                          setIsDropdownVisible1(false); // Hide dropdown
                                        }}
                                        style={{ padding: '8px', cursor: 'pointer' }}
                                      >
                                        {option.userName}
                                      </li>
                                    ))
                                  ) : (
                                    <li style={{ padding: '8px' }}>Not found</li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Introducer User Name 2 Field */}
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="introducersUserName2">
                                <FaIdCard /> Introducer's User Name 2
                              </label>
                              <Field
                                id="introducersUserName2"
                                name="introducersUserName2"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleSearchIntroducerUserName2(e.target.value); // Trigger search on change
                                }}
                                placeholder="Search Introducer Name 2"
                              />
                              <ErrorMessage name="introducersUserName2" component="div" className="text-danger" />
                              {/* Dropdown for search results */}
                              {isDropdownVisible2 && (
                                <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0, position: 'absolute', zIndex: 1, background: 'white', width: '93%', maxHeight: '120px', overflow: 'auto' }}>
                                  {filteredIntroducerOption2.length > 0 ? (
                                    filteredIntroducerOption2.map((option, index) => (
                                      <li
                                        key={index}
                                        onClick={() => {
                                          setFieldValue('introducersUserName2', option.userName); // Set selected value
                                          setIsDropdownVisible2(false); // Hide dropdown
                                        }}
                                        style={{ padding: '8px', cursor: 'pointer' }}
                                      >
                                        {option.userName}
                                      </li>
                                    ))
                                  ) : (
                                    <li style={{ padding: '8px' }}>Not found</li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Introducer Percentage Fields */}
                          <div className="col-md-4">
                            <label htmlFor="introducerPercentage" className="form-label">
                               Introducer's Percentage
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="introducerPercentage"
                              name="introducerPercentage"
                              placeholder="Introducer's Percentage"
                            />
                            <ErrorMessage name="introducerPercentage" component="div" className="text-danger" />
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="introducerPercentage1" className="form-label">
                               Introducer's Percentage 1
                              {/* <span className="text-danger">*</span> */}
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="introducerPercentage1"
                              name="introducerPercentage1"
                              placeholder="Introducer's Percentage 1"
                            />
                            <ErrorMessage name="introducerPercentage1" component="div" className="text-danger" />
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="introducerPercentage2" className="form-label">
                              Introducer's Percentage 2
                              {/* <span className="text-danger">*</span> */}
                            </label>
                            <Field
                              type="text"
                              className={`form-control`}
                              id="introducerPercentage2"
                              name="introducerPercentage2"
                              placeholder="Introducer's Percentage 2"
                            />
                            <ErrorMessage name="introducerPercentage2" component="div" className="text-danger" />
                          </div>

                        </div>
                        {/* Submit Button */}
                        <div className="col-12">
                          <div className="row justify-content-center mt-4">
                            <div className="col-md-6 submit-button">
                              <button type="submit" className="btn btn-dark w-100 fw-bold">
                                Create User
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </SingleCard>
            </SingleCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActualUser;
