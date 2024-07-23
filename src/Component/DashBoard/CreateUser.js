import React, { useState } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FaUser, FaEnvelope } from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleCard from "../../common/singleCard";

const CreateUser = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    yourName: "",
    yourSurname: "",
    yourEmail: "",
    yourPassword: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(checkedItems);
    const data = {
      firstname: formData.yourName,
      lastname: formData.yourSurname,
      userName: formData.yourEmail,
      password: formData.yourPassword,
      roles: checkedItems,
    };

    //Api Fetching
    AccountService.createuser(data, auth.user)
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
    console.log(data);
  };

  return (
    <div className="row justify-content-center ">
      <div className="col-lg-9">
        <div className="row justify-content-center">
          <SingleCard
            className="mt-2"
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
              <div className="card-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="your-name" className="form-label">
                        <FaUser /> First name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="your-name"
                        name="yourName"
                        value={formData.yourName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="your-surname" className="form-label">
                        <FaUser /> Last name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="your-surname"
                        name="yourSurname"
                        value={formData.yourSurname}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        <FaEnvelope /> User Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="your-email"
                        name="yourEmail"
                        value={formData.yourEmail}
                        onChange={handleChange}
                        placeholder="Enter UserName"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <PasswordCU
                        setFormData={setFormData}
                        value={formData.yourPassword}
                        name={"yourPassword"}
                      />
                    </div>

                    <SingleCard
                      style={{
                        backgroundColor: "#e6f7ff",
                      }}
                    >
                      <div className="text-center">
                        <h5
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          <div className="badge-pill badge-secondary ">
                            GRANTIFY
                          </div>
                        </h5>
                      </div>

                      <div className="row  m-auto justify-content-between ">
                        <div
                          className="col-md-4 col-sm-12 mb-0 text-nowrap d-flex g-1"
                          style={{ flexDirection: "column" }}
                        >
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Dashboard-View"
                              checked={checkedItems.includes("Dashboard-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Dashboard View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="report-all-txn"
                              checked={checkedItems.includes("report-all-txn")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Report-All Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="report-my-txn"
                              checked={checkedItems.includes("report-my-txn")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Report-My Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Transaction"
                              checked={checkedItems.includes(
                                "Create-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Create Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Bank-View"
                              checked={checkedItems.includes("Bank-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Bank View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-User"
                              checked={checkedItems.includes("Create-User")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Create User
                            </label>
                          </div>
                        </div>

                        <div
                          className="col-md-4 col-sm-12 mb-0 text-nowrap d-flex g-1 "
                          style={{ flexDirection: "column" }}
                        >
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Website-View"
                              checked={checkedItems.includes("Website-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Website View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Introducer-Profile-View"
                              checked={checkedItems.includes(
                                "Introducer-Profile-View"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Introducer Profile View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="RequestAdmin"
                              checked={checkedItems.includes("RequestAdmin")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Request
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="RecycleBin-View"
                              checked={checkedItems.includes("RecycleBin-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              RecycleBin View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Transaction-Edit-Request"
                              checked={checkedItems.includes(
                                "Transaction-Edit-Request"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Transaction Edit Request
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Transaction-Delete-Request"
                              checked={checkedItems.includes(
                                "Transaction-Delete-Request"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Transaction Delete Request
                            </label>
                          </div>
                        </div>

                        <div
                          className="col-md-4 col-sm-12 mb-0 text-nowrap d-flex g-1 "
                          style={{ flexDirection: "column" }}
                        >
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input "
                              type="checkbox"
                              value="User-Profile-View"
                              checked={checkedItems.includes(
                                "User-Profile-View"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              User Profile View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Profile-View"
                              checked={checkedItems.includes("Profile-View")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Profile View
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Withdraw-Transaction"
                              checked={checkedItems.includes(
                                "Create-Withdraw-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Create Withdraw Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Deposit-Transaction"
                              checked={checkedItems.includes(
                                "Create-Deposit-Transaction"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Create Deposit Transaction
                            </label>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create-Introducer"
                              checked={checkedItems.includes(
                                "Create-Introducer"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                              style={{
                                fontFamily: "'Abril Fatface', serif ",
                                fontWeight: "bold",
                                color: "#708090",
                              }}
                            >
                              Create Introducer
                            </label>
                          </div>
                        </div>
                      </div>
                    </SingleCard>

                    <div className="">
                      <div className="row justify-content-center mt-2">
                        <div className="col-md-6  submit-button">
                          <button
                            onClick={handleSubmit}
                            className="btn btn-dark w-100 fw-bold"
                          >
                            {" "}
                            Create Sub-Admin
                          </button>
                        </div>
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
  );
};

export default CreateUser;
