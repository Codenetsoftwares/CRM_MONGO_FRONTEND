import React, { useEffect, useState, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Col, Row, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CreateDepositTransactionSchema } from "../../Services/schema";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import DashService from "../../Services/DashService";
import FullScreenLoader from "../../Component/FullScreenLoader";
import { debounce } from "lodash";

const Deposit = () => {
  const initialValues = {
    transactionID: "",
    amount: "",
    paymentMethod: "UPI",
    userName: "",
    bankName: "",
    websiteName: "",
    transactionType: "Deposit",
    bonus: 0,
    remarks: "",
  };

  const [websiteOptions, setWebsiteOptions] = useState([]);
  const [filteredWebsiteOptions, setFilteredWebsiteOptions] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [filteredBankOptions, setFilteredBankOptions] = useState([]);
  const [filteredUserNameOptions, setFilteredUserNameOptions] = useState([]);
  const [allUserNameOptions, setAllUserNameOptions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isBankDropdownVisible, setIsBankDropdownVisible] = useState(false);
  const [isWebsiteDropdownVisible, setIsWebsiteDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeBankIndex, setActiveBankIndex] = useState(-1);
  const [activeWebsiteIndex, setActiveWebsiteIndex] = useState(-1);
  const auth = useAuth();

  // Fetch options from the server
  useEffect(() => {
    AccountService.getActiveBank(auth.user).then((res) => {
      setBankOptions(res.data);
      setFilteredBankOptions(res.data);
    });
    AccountService.getActiveWebsite(auth.user).then((res) => {
      setWebsiteOptions(res.data);
      setFilteredWebsiteOptions(res.data);
    });
    AccountService.userId(auth.user).then((res) => {
      setAllUserNameOptions(res.data);
      setFilteredUserNameOptions(res.data);
    });
  }, [auth]);

  // Debounce function to search user names
  const handleSearchUserName = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = allUserNameOptions.filter((item) =>
          item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUserNameOptions(filteredItems);
        setIsDropdownVisible(true);
      } else {
        setFilteredUserNameOptions([]);
        setIsDropdownVisible(false);
      }
    }, 1300),
    [allUserNameOptions]
  );

  // Debounce function to search bank names
  const handleSearchBank = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = bankOptions.filter((item) =>
          item.bankName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBankOptions(filteredItems);
        setIsBankDropdownVisible(true);
      } else {
        setFilteredBankOptions([]);
        setIsBankDropdownVisible(false);
      }
    }, 1300),
    [bankOptions]
  );

  // Debounce function to search website names
  const handleSearchWebsite = useCallback(
    debounce((value) => {
      if (value) {
        const filteredItems = websiteOptions.filter((item) =>
          item.websiteName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredWebsiteOptions(filteredItems);
        setIsWebsiteDropdownVisible(true);
      } else {
        setFilteredWebsiteOptions([]);
        setIsWebsiteDropdownVisible(false);
      }
    }, 1300),
    [websiteOptions]
  );

  // Handle keyboard navigation and selection for user names
  const handleKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredUserNameOptions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => (prevIndex - 1 + filteredUserNameOptions.length) % filteredUserNameOptions.length);
    } else if ((e.key === "Enter" || e.key === "Tab") && activeIndex >= 0) {
      setFieldValue("userName", filteredUserNameOptions[activeIndex].userName);
      setIsDropdownVisible(false);
      setActiveIndex(-1);
    }
  };

  // Handle keyboard navigation and selection for bank names
  const handleBankKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveBankIndex((prevIndex) => (prevIndex + 1) % filteredBankOptions.length);
    } else if (e.key === "ArrowUp") {
      setActiveBankIndex((prevIndex) => (prevIndex - 1 + filteredBankOptions.length) % filteredBankOptions.length);
    } else if ((e.key === "Enter" || e.key === "Tab") && activeBankIndex >= 0) {
      setFieldValue("bankName", filteredBankOptions[activeBankIndex].bankName);
      setIsBankDropdownVisible(false);
      setActiveBankIndex(-1);
    }
  };

  // Handle keyboard navigation and selection for website names
  const handleWebsiteKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveWebsiteIndex((prevIndex) => (prevIndex + 1) % filteredWebsiteOptions.length);
    } else if (e.key === "ArrowUp") {
      setActiveWebsiteIndex((prevIndex) => (prevIndex - 1 + filteredWebsiteOptions.length) % filteredWebsiteOptions.length);
    } else if ((e.key === "Enter" || e.key === "Tab") && activeWebsiteIndex >= 0) {
      setFieldValue("websiteName", filteredWebsiteOptions[activeWebsiteIndex].websiteName);
      setIsWebsiteDropdownVisible(false);
      setActiveWebsiteIndex(-1);
    }
  };

  // Handle option click for user names
  const handleOptionClick = (option, setFieldValue) => {
    setFieldValue("userName", option.userName);
    setIsDropdownVisible(false);
    setActiveIndex(-1);
  };

  // Handle option click for bank names
  const handleBankOptionClick = (option, setFieldValue) => {
    console.log("Bank option clicked:", option);
    setFieldValue("bankName", option.bankName);
    setIsBankDropdownVisible(false);
    setActiveBankIndex(-1);
  };

  // Handle option click for website names
  const handleWebsiteOptionClick = (option, setFieldValue) => {
    console.log("Website option clicked:", option);
    setFieldValue("websiteName", option.websiteName);
    setIsWebsiteDropdownVisible(false);
    setActiveWebsiteIndex(-1);
  };

  // Handle form submission
  const handleSubmit = (values) => {
    // Convert amount from string to number
    values.amount = parseFloat(values.amount); // Or use parseInt if it should be an integer
    console.log("values", values);
    const confirmed = window.confirm(
      "Please double-check the form before confirming, as changes or deletions won't be possible afterward."
    );
    if (confirmed) {
      setIsLoading(true);
      DashService.CreateTransactionDeposit(values, auth.user)
        .then((response) => {
          console.log(response.data);
          alert("Transaction Created Successfully!!");
          setIsLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <FullScreenLoader show={isLoading} />
      <Container
        className="p-4"
        style={{
          backgroundColor: "#f9fafc",
          borderRadius: "8px",
          maxWidth: "1250px",
        }}
      >
        <h3 className="mb-4">Make New Transaction</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateDepositTransactionSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="userName">
                      <FaSearch /> Search Customer Name
                    </label>
                    <Field
                      id="userName"
                      name="userName"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange(e);
                        handleSearchUserName(e.target.value);
                        setIsDropdownVisible(true);
                        setActiveIndex(-1);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, setFieldValue)}
                      placeholder="Search Customer Name"
                    />
                    {isDropdownVisible && (
                      <div className="dropdown-menu show w-100">
                        {filteredUserNameOptions.map((option, index) => (
                          <div
                            key={option.userName}
                            className={`dropdown-item ${
                              index === activeIndex ? "active" : ""
                            }`}
                            onClick={() => handleOptionClick(option, setFieldValue)}
                          >
                            {option.userName}
                          </div>
                        ))}
                      </div>
                    )}
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="transactionID">Transaction ID</label>
                    <Field
                      id="transactionID"
                      name="transactionID"
                      type="text"
                      className="form-control"
                      placeholder="Enter Transaction ID"
                    />
                    <ErrorMessage
                      name="transactionID"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="bankName">
                      <FaSearch /> Search Bank Name
                    </label>
                    <Field
                      id="bankName"
                      name="bankName"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange(e);
                        handleSearchBank(e.target.value);
                        setIsBankDropdownVisible(true);
                        setActiveBankIndex(-1);
                      }}
                      onKeyDown={(e) => handleBankKeyDown(e, setFieldValue)}
                      placeholder="Search Bank Name"
                    />
                    {isBankDropdownVisible && (
                      <ul
                        style={{
                          border: "1px solid #ccc",
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          position: "absolute",
                          zIndex: 1,
                          background: "white",
                          width: "93%",
                          maxHeight: "200px",
                          overflow: "auto",
                        }}
                      >
                        {filteredBankOptions.length > 0 ? (
                          filteredBankOptions.map((option, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleBankOptionClick(option, setFieldValue)
                              }
                              style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor:
                                  activeBankIndex === index
                                    ? "#f0f0f0"
                                    : "white",
                              }}
                            >
                              {option.bankName}
                            </li>
                          ))
                        ) : (
                          <li style={{ padding: "8px" }}>Not found</li>
                        )}
                      </ul>
                    )}
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="websiteName">
                      <FaSearch /> Search Website Name
                    </label>
                    <Field
                      id="websiteName"
                      name="websiteName"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange(e);
                        handleSearchWebsite(e.target.value);
                        setIsWebsiteDropdownVisible(true);
                        setActiveWebsiteIndex(-1);
                      }}
                      onKeyDown={(e) => handleWebsiteKeyDown(e, setFieldValue)}
                      placeholder="Search Website Name"
                    />
                    {isWebsiteDropdownVisible && (
                      <ul
                        style={{
                          border: "1px solid #ccc",
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          position: "absolute",
                          zIndex: 1,
                          background: "white",
                          width: "93%",
                          maxHeight: "200px",
                          overflow: "auto",
                        }}
                      >
                        {filteredWebsiteOptions.length > 0 ? (
                          filteredWebsiteOptions.map((option, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleWebsiteOptionClick(option, setFieldValue)
                              }
                              style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor:
                                  activeWebsiteIndex === index
                                    ? "#f0f0f0"
                                    : "white",
                              }}
                            >
                              {option.websiteName}
                            </li>
                          ))
                        ) : (
                          <li style={{ padding: "8px" }}>Not found</li>
                        )}
                      </ul>
                    )}
                    <ErrorMessage
                      name="websiteName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
               
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <Field
                      id="amount"
                      name="amount"
                      type="text"
                      className="form-control"
                      placeholder="Enter Amount"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="bonus">Bonus</label>
                    <Field
                      id="bonus"
                      name="bonus"
                      type="text"
                      className="form-control"
                      placeholder="Enter Bonus"
                    />
                    <ErrorMessage
                      name="bonus"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <Field
                      as="select"
                      id="paymentMethod"
                      name="paymentMethod"
                      className="form-control"
                    >
                      <option value="UPI">UPI</option>
                      <option value="IMPS">IMPS</option>
                      <option value="RTGS">RTGS</option>
                      <option value="NEFT">NEFT</option>
                    </Field>
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <Field
                      id="remarks"
                      name="remarks"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter Remarks"
                    />
                    <ErrorMessage
                      name="remarks"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              </Row>
              <Button variant="success" type="submit" className="w-100">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Deposit;
