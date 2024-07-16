import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMobile,
  FaKey,
  FaIdCard,
  FaPercent,
} from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountService from "../../Services/AccountService";
import SingleCard from "../../common/singleCard";

const CreateActualUser = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourFirstName: "",
    yourLastname: "",
    yourUserName: "",
    yourEnterPassword: "",
    yourConfirmPassword: "",
    yourIntroducerPercentage1: "",
    yourIntroducerName1: "",
    yourIntroducerPercentage2: "",
    yourIntroducerName2: "",
    yourIntroducerPercentage3: "",
    yourIntroducerName3: "",
    yourContact: "",
    // yourUserId: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const [IntroducerId, setIntroducerId] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [filteredOptions1, setFilteredOptions1] = useState([]);
  const [filteredOptions2, setFilteredOptions2] = useState([]);
  const [filteredOptions3, setFilteredOptions3] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  console.log("This is FromData=>>>", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };

  useEffect(() => {
    AccountService.IntroducerUserId(auth.user).then((res) =>
      setIntroducerId(res.data)
    );
  }, [auth]);

  // console.log("Introducer Id", IntroducerId);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(checkedItems);
    const totalpercentage =
      Number(formData.yourIntroducerPercentage1) +
      Number(formData.yourIntroducerPercentage2) +
      Number(formData.yourIntroducerPercentage3)
    
    if (
     totalpercentage > 100 ||
     totalpercentage < 0   
    ) {
      toast.error(
        "The sum of introducer percentages must be between 0 and 100"
      );
      return;
    }
    const data = {
      firstname: formData.yourFirstName,
      lastname: formData.yourLastname,
      userName: formData.yourUserName,
      password: formData.yourEnterPassword,
      contactNumber: formData.yourContact,
      introducersUserName: searchTerm1,
      introducerPercentage: formData.yourIntroducerPercentage1,
      introducersUserName1: searchTerm2,
      introducerPercentage1: formData.yourIntroducerPercentage2,
      introducersUserName2: searchTerm3,
      introducerPercentage2: formData.yourIntroducerPercentage3,
      // userId: formData.yourUserId,
    };
    console.log("Im here in line 83=>>",data);
    if (formData.yourEnterPassword === formData.yourConfirmPassword) {
      AccountService.createActualuser(data, auth.user)
        .then((res) => {
          console.log("res", res);
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          console.log("error", err.response.data.message);
          toast.error(err.response.data.message);
          return;
        });
    }
  };

  const styles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
  // console.log("====>>>>", formData.yourIntroducerId);

  const handleIntroducerChange1 = (e) => {
    const value = e.target.value;
    setSearchTerm1(value);

    // Filter the options based on the input value

    const filtered = value
      ? IntroducerId.filter((data) =>
          data.userName.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    setFilteredOptions1(filtered);
  };
    const handleIntroducerChange2 = (e) => {
      const value = e.target.value;
      setSearchTerm2(value);

      // Filter the options based on the input value

      const filtered = value
        ? IntroducerId.filter((data) =>
            data.userName.toLowerCase().includes(value.toLowerCase())
          )
        : [];

      setFilteredOptions2(filtered);
  };
    const handleIntroducerChange3 = (e) => {
      const value = e.target.value;
      setSearchTerm3(value);

      // Filter the options based on the input value

      const filtered = value
        ? IntroducerId.filter((data) =>
            data.userName.toLowerCase().includes(value.toLowerCase())
          )
        : [];

      setFilteredOptions3(filtered);
    };
  const handleOptionSelect1 = (option) => {
    // setSelectedOption(option);
    setSearchTerm1(option.userName);
    setFilteredOptions1([]); // Clear the filtered options when an option is selected
  };
    const handleOptionSelect2 = (option) => {
      // setSelectedOption(option);
      setSearchTerm2(option.userName);
      setFilteredOptions2([]); // Clear the filtered options when an option is selected
  };
    const handleOptionSelect3 = (option) => {
      // setSelectedOption(option);
      setSearchTerm3(option.userName);
      setFilteredOptions3([]); // Clear the filtered options when an option is selected
    };

  return (
 
    <>
        <div className="row justify-content-center " >
          <div className="col-lg-9">
            <div className="row justify-content-center">
              <SingleCard className="mt-2"style={{
          backgroundColor: "#e6f7ff",
        }}>
              <SingleCard className="card shadow-lg p-3 mb-5 bg-white rounded" style={{
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  }}  >
                <div className="card-body">
                  <form>
                    <div className="row g-3">
                      <div className=" col-md-4">
                        <label htmlFor="Your-email" className="form-label">
                          <FaEnvelope /> User Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="your-UserName"
                          name="yourUserName"
                          value={formData.yourUserName}
                          onChange={handleChange}
                          placeholder="Enter User Name"
                          required
                        />
                      </div>
                      <div className=" col-md-4">
                        <label htmlFor="your-surname" className="form-label">
                          <FaMobile /> Enter Contact No.
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact-number"
                          name="yourContact"
                          value={formData.yourContact}
                          onChange={handleChange}
                          placeholder=" Contact Number"
                        />
                      </div>
                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaUser /> First Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourFirstName"
                          value={formData.yourFirstName}
                          onChange={handleChange}
                          placeholder="Enter First Name"
                          required
                        />
                      </div>
                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaUser /> Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourLastname"
                          value={formData.yourLastname}
                          onChange={handleChange}
                          placeholder="Enter Last Name"
                          required
                        />
                      </div>

                      {/* Introducer 1 start */}
                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaIdCard /> Lvl 1 Intro Name
                          <span className="text-danger">*</span>
                        </label>
                        <div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-user id"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Introducer Name"
                              value={searchTerm1}
                              onChange={handleIntroducerChange1}
                            />
                          </div>
                          {filteredOptions1.length > 0 && (
                            <div className="list-group">
                              {filteredOptions1.map((option, index) => (
                                <button
                                  key={index}
                                  className="list-group-item list-group-item-action"
                                  onClick={() => handleOptionSelect1(option)}
                                >
                                  {option.userName}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaPercent />
                          &nbsp;Lvl 1 Intro Percentage
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerPercentage1"
                          value={formData.yourIntroducerPercentage1}
                          onChange={handleChange}
                          placeholder="Enter Introducer Percentage"
                          required
                          max={100}
                        />
                      </div>
                      {/* Introducer 1 end */}

                      {/* Introducer 2 start */}
                      <div className=" col-md-4 ">
                        <label htmlFor="" className="form-label">
                          <FaIdCard /> &nbsp;Lvl 2 Intro Name
                          <span className="text-danger">*</span>
                        </label>
                        <div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-user id"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Introducer Name"
                              value={searchTerm2}
                              onChange={handleIntroducerChange2}
                            />
                          </div>
                          {filteredOptions2.length > 0 && (
                            <div className="list-group">
                              {filteredOptions2.map((option, index) => (
                                <button
                                  key={index}
                                  className="list-group-item list-group-item-action"
                                  onClick={() => handleOptionSelect2(option)}
                                >
                                  {option.userName}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaPercent />
                          &nbsp;Lvl 2 Intro Percentage
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerPercentage2"
                          value={formData.yourIntroducerPercentage2}
                          onChange={handleChange}
                          placeholder="Enter Introducer Percentage"
                          required
                          max={100}
                        />
                      </div>
                      {/* Introducer 2 end */}

                      {/* Introducer 3 start */}
                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaIdCard /> &nbsp;Lvl 3 Intro Name
                          <span className="text-danger">*</span>
                        </label>
                        <div>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-user id"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Introducer Name"
                              value={searchTerm3}
                              onChange={handleIntroducerChange3}
                            />
                          </div>
                          {filteredOptions3.length > 0 && (
                            <div className="list-group">
                              {filteredOptions3.map((option, index) => (
                                <button
                                  key={index}
                                  className="list-group-item list-group-item-action"
                                  onClick={() => handleOptionSelect3(option)}
                                >
                                  {option.userName}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaPercent />
                          &nbsp;Lvl 3 Intro Percentage
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourIntroducerPercentage3"
                          value={formData.yourIntroducerPercentage3}
                          onChange={handleChange}
                          placeholder="Enter Introducer Percentage"
                          required
                          max={100}
                        />
                      </div>
                      {/* Introducer 3 end */}

                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaLock /> Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="text"
                          name="yourEnterPassword"
                          value={formData.yourEnterPassword}
                          onChange={handleChange}
                          placeholder="Enter Password"
                          required
                        />
                      </div>

                      <div className=" col-md-4">
                        <label htmlFor="" className="form-label">
                          <FaKey /> Confirm Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="text"
                          name="yourConfirmPassword"
                          value={formData.yourConfirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required
                        />
                      </div>

                      {/* <div className="col">
                        <label
                          htmlFor=""
                          className="form-label d-flex justify-content-center"
                        >
                          <FaKey /> User Id
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          // id="yourUserId"
                          name="yourUserId"
                          value={formData.yourUserId}
                          onChange={handleChange}
                          placeholder="User Id"
                          required
                        />
                      </div> */}
                    </div>
                    <div className="col-12">
                      <div className="row justify-content-center mt-4">
                        <div className="col-md-6  submit-button">
                          <button
                            onClick={handleSubmit}
                            className="btn btn-dark w-100 fw-bold"
                          >
                            {" "}
                            Create User
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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
