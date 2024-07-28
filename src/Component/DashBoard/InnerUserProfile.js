import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserResetPass from "../Modal/UserResetPass";
import { Alert } from "react-bootstrap";
import SingleCard from "../../common/singleCard";

const InnerUserProfile = () => {
  // const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  // console.log("User ID==>>", id);
  const [users, setUsers] = useState([]);
  const [foundObject, setFoundObject] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion open/close
  const [isEditing, setIsEditing] = useState(false); // Track which field is being edited
  const [editedData, setEditedData] = useState({}); // Store edited data
  const [username, setUsername] = useState([]);
  const [IntroducerName, setIntroducerName] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [filteredOptions1, setFilteredOptions1] = useState([]);
  const [filteredOptions2, setFilteredOptions2] = useState([]);
  const [filteredOptions3, setFilteredOptions3] = useState([]);
  const location = useLocation();
  console.log("location", location);
  // Calling Single Introducer Name API
  useEffect(() => {
    AccountService.IntroducerUserId(auth.user).then((res) =>
      setIntroducerName(res.data)
    );
  }, [auth]);

  console.log(auth);
  const { page, id } = location.state || {};
  console.log("page", page);
  console.log("id", id);

  const Handletransaction = () => {
    console.log("first");
    navigate("/transactiondetails", {
      state: { txndetails: foundObject.transactionDetail },
    });
  };

  // useEffect(() => {
  //   AccountService.userprofile(page, auth.user)
  //     .then((res) => {
  //       setUsers(res.data);
  //       const userWithId = res.data.SecondArray.find((user) => user._id === id);
  //       setFoundObject(userWithId);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     });
  // }, [auth, id]);
  // console.log("This is User Deatils===>>", users);

  useEffect(() => {
    AccountService.singleuserprofile(auth.user, id).then((res) =>
      setFoundObject(res.data[0])
    );
  }, [id, auth]);
  console.log("This is single user", foundObject);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleResetPassword = (e, username) => {
    setUsername(username);
  };
  console.log("password ========>", username);

  const handleSave = (field) => {
    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });
    const data = {
      firstname: editedData.firstname,
      lastname: editedData.lastname,
      email: editedData.email,
      contactnumber: editedData.contactNumber,
      userName: editedData.userName,
      introducerPercentage: editedData.introducerPercentage,
      introducerPercentage1: editedData.introducerPercentage1,
      introducerPercentage2: editedData.introducerPercentage2,
      introducersUserName: searchTerm1,
      introducersUserName1: searchTerm2,
      introducersUserName2: searchTerm3,
      websitedetail: editedData.websitedetail,
      bankDetail: {}, // Initialize empty bankDetail
      upiDetail: {}, // Initialize empty upiDetail
    };
    console.log("Im here in line number 112=>>", data);
    // Check if bankDetail exists in editedData
    if (editedData.hasOwnProperty("bankDetail")) {
      // Iterate through properties of bankDetail
      Object.keys(editedData.bankDetail).forEach((key) => {
        data.bankDetail[key] = editedData.bankDetail[key];
      });
    }

    // Check if upiDetail exists in editedData
    if (editedData.hasOwnProperty("upiDetail")) {
      // Iterate through properties of upiDetail
      Object.keys(editedData.upiDetail).forEach((key) => {
        data.upiDetail[key] = editedData.upiDetail[key];
      });
    }

    // put Api Fetching
   
    
      AccountService.inneruserprofile(id, data, auth.user)
        .then((res) => {
          console.log("res", res);
          if (res.status === 201) {
            alert("Profile Updated");
            window.location.reload();
          }
          
        })
        .catch((err) => {
            toast.error("The sum of introducer percentages must be between 0 and 100");
        });
    
  };
  console.log("User Deatils", foundObject);

  const handleIntroducerChange1 = (e) => {
    const value = e.target.value;
    setSearchTerm1(value);

    // Filter the options based on the input value

    const filtered = value
      ? IntroducerName.filter((data) =>
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
      ? IntroducerName.filter((data) =>
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
      ? IntroducerName.filter((data) =>
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
    <div
      className="d-flex align-items-center justify-content-center mt-3"
      style={{
        // background:
        //   "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {/* <h1
              className="text-center mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "black",
              }}
            >
              User Profile
            </h1> */}
            <div className="row justify-content-center">
              {/* <div className="card"> */}
                <SingleCard className="mt-2" style={{ backgroundColor: "#4682b4" }}>
                <SingleCard    className="card shadow-lg p-3 mb-5 bg-white rounded"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "10px",
                        padding: "20px",
                        filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.8))",
                        boxShadow: "none"  // Remove default box shadow
                      }}>
                <div className="card-body" >
                  {foundObject && (
                    <>
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-4">
                        <label className="form-label text-dark">
                          First Name
                        </label>
                        <input
                          name="firstname"
                          value={
                            isEditing
                              ? editedData.firstname
                              : foundObject.firstname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      
                        </div>
                      
                      
                      
                      
                      <div className="col-md-4">
                        <label className="form-label text-dark">
                          Last Name
                        </label>
                        <input
                          name="lastname"
                          value={
                            isEditing
                              ? editedData.lastname
                              : foundObject.lastname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                    
                     
                     
                      <div className="col-md-4">
                        <label className="form-label text-dark">
                          Contact Number
                        </label>
                        <input
                          name="contactNumber"
                          value={
                            isEditing
                              ? editedData.contactNumber
                              : foundObject.contactNumber
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                  </div>
                  </div>
                      </div>
                      {/* <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          value={
                            isEditing ? editedData.email : foundObject.email
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div> */}
                      {/* <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          name="userName"
                          value={
                            isEditing
                              ? editedData.userName
                              : foundObject.userName
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div> */}

                      {/* Show Intro Name disabled Always and Change Intro */}
                      {isEditing ? (
                        <>
                          <div className="mb-3">
                            <div className="row">
                              {/* Introducer 1 Start */}
                              <div className="col-md-4">
                                <label className="form-label text-dark">
                                  Change Introducer 1
                                </label>
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-user id"></i>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={searchTerm1}
                                    onChange={handleIntroducerChange1}
                                    placeholder={
                                      foundObject.introducersUserName
                                    }
                                  />
                                </div>
                                {filteredOptions1.length > 0 && (
                                  <div className="list-group">
                                    {filteredOptions1.map((option, index) => (
                                      <button
                                        key={index}
                                        className="list-group-item list-group-item-action"
                                        onClick={() =>
                                          handleOptionSelect1(option)
                                        }
                                      >
                                        {option.userName}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {/* Introducer 1 End */}

                              {/* Introducer 2 Start */}
                              <div className="col-md-4">
                                <label className="form-label text-dark">
                                  Change Introducer 2
                                </label>
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-user id"></i>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={
                                      foundObject.introducersUserName1
                                    }
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
                                        onClick={() =>
                                          handleOptionSelect2(option)
                                        }
                                      >
                                        {option.userName}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {/* Introducer 2 End */}

                              {/* Introducer 3 Start */}
                              <div className="col-md-4">
                                <label className="form-label text-dark">
                                  Change Introducer 3
                                </label>
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-user id"></i>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={
                                      foundObject.introducersUserName2}
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
                                        onClick={() =>
                                          handleOptionSelect3(option)
                                        }
                                      >
                                        {option.userName}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {/* Introducer 3 End */}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="form-label text-dark">
                                Lvl 1 Introducer
                              </label>
                              <input
                                name="introducerPercentage"
                                value={foundObject.introducersUserName}
                                className="form-control"
                                disabled
                              />
                            </div>

                            <div className="col-md-4">
                              <label className="form-label text-dark">
                                Lvl 2 Introducer
                              </label>
                              <input
                                name="introducerPercentage"
                                value={foundObject.introducersUserName1}
                                className="form-control"
                                disabled
                              />
                            </div>

                            <div className="col-md-4">
                              <label className="form-label text-dark">
                                Lvl 3 Introducer
                              </label>
                              <input
                                name="introducerPercentage"
                                value={foundObject.introducersUserName2}
                                className="form-control"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="form-label text-dark">
                              Lvl 1 Introducer %
                            </label>
                            <input
                              name="introducerPercentage"
                              value={
                                isEditing
                                  ? editedData.introducerPercentage
                                  : foundObject.introducerPercentage
                              }
                              onChange={handleInputChange}
                              className="form-control"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label text-dark">
                              Lvl 2 Introducer %
                            </label>
                            <input
                              name="introducerPercentage1"
                              value={
                                isEditing
                                  ? editedData.introducerPercentage1
                                  : foundObject.introducerPercentage1
                              }
                              onChange={handleInputChange}
                              className="form-control"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label text-dark">
                              Lvl 3 Introducer %
                            </label>
                            <input
                              name="introducerPercentage2"
                              value={
                                isEditing
                                  ? editedData.introducerPercentage2
                                  : foundObject.introducerPercentage2
                              }
                              onChange={handleInputChange}
                              className="form-control"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Website Details
                        </label>
                        <input
                          name="WebsiteDetails"
                          value={
                            isEditing
                              ? editedData.WebsiteDetails
                              : foundObject.WebsiteDetails
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      {/* <button
                        className="btn btn-link"
                        onClick={toggleAccordion}
                      >
                        Payment Details
                      </button> */}
{/* transaction details commented */}
                      {/* <p
                        className="btn btn-link pt-4"
                        onClick={Handletransaction}
                      >
                        Transaction Details
                      </p> */}
                      {isAccordionOpen && (
                        <div className="accordion">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                onClick={toggleAccordion}
                              >
                                Bank Details
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="bankName"
                                        className="form-label"
                                      >
                                        Bank Name:
                                        {/* {editedData.bankDetail} */}
                                      </label>
                                      <input
                                        type="text"
                                        id="bankName"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail.bankName // Check if bankName exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail.bankName // Check if bankName exists in foundObject.bankDetail}
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="accountNumber"
                                        className="form-label"
                                      >
                                        Account Number:
                                      </label>
                                      <input
                                        type="text"
                                        id="accountNumber"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail
                                                .accountNumber // Check if accountNumber exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail
                                                .accountNumber // Check if accountNumber exists in foundObject.bankDetail
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="ifscCode"
                                        className="form-label"
                                      >
                                        IFSC Code:
                                      </label>
                                      <input
                                        type="text"
                                        id="ifscCode"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail.ifscCode // Check if ifscCode exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail.ifscCode
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="accountHolderName"
                                        className="form-label"
                                      >
                                        Account Holder Name:
                                      </label>
                                      <input
                                        type="text"
                                        id="accountHolderName"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail
                                                .accountHolderName // Check if accountHolderName exists in editedData.bankDetail
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail
                                                .accountHolderName
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI Application:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiApp"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail.upiApp
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail.upiApp
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI ID:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiId"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail.upiId
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail.upiId
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="Upi"
                                        className="form-label"
                                      >
                                        UPI Number:
                                      </label>
                                      <input
                                        type="text"
                                        id="upiNumber"
                                        className="form-control"
                                        value={
                                          isEditing
                                            ? editedData.bankDetail &&
                                              editedData.bankDetail.upiNumber
                                            : foundObject.bankDetail &&
                                              foundObject.bankDetail.upiNumber
                                        }
                                        disabled={!isEditing}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {isEditing ? (
                        <button
                          className="btn btn-dark mx-1 "
                          onClick={handleSave}
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-secondary mx-1"
                            onClick={handleToggleEdit}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
                </SingleCard>
                </SingleCard>
                {/* <button
                  class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={(e) => {
                    handleResetPassword(e, foundObject.userName);
                  }}
                >
                  Reset password
                </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <UserResetPass UserName={username} />
      </div>
    </div>
  );
};

export default InnerUserProfile;
