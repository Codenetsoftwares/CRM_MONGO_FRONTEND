import React, { useEffect, useState, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Col, Row, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CreateWithDrawTransactionSchema } from "../../Services/schema";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import DashService from "../../Services/DashService";
import FullScreenLoader from "../../Component/FullScreenLoader";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { errorHandler } from "../../Utils/helper";
import SingleCard from "../../common/singleCard";

const Withdraw = () => {
  const initialValues = {
    transactionID: "",
    amount: 0,
    paymentMethod: "UPI",
    userName: "",
    bankName: "",
    websiteName: "",
    transactionType: "Withdraw",
    bankCharges: 0,
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
  const [isWebsiteDropdownVisible, setIsWebsiteDropdownVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeBankIndex, setActiveBankIndex] = useState(-1);
  const [activeWebsiteIndex, setActiveWebsiteIndex] = useState(-1);

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankRes = await AccountService.getActiveBank(auth.user);
        setBankOptions(bankRes.data);
        setFilteredBankOptions(bankRes.data);
      } catch (err) {
        errorHandler(err, 'Failed to fetch active banks');
      }

      try {
        const websiteRes = await AccountService.getActiveWebsite(auth.user);
        setWebsiteOptions(websiteRes.data);
        setFilteredWebsiteOptions(websiteRes.data);
      } catch (err) {
        errorHandler(err, 'Failed to fetch active websites');
      }

      try {
        const userRes = await AccountService.userId(auth.user);
        setAllUserNameOptions(userRes.data);
        setFilteredUserNameOptions(userRes.data);
      } catch (err) {
        errorHandler(err, 'Failed to fetch user IDs');
      }
    };

    fetchData();
  }, [auth]);

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

  const handleKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % filteredUserNameOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredUserNameOptions.length) %
          filteredUserNameOptions.length
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && activeIndex >= 0) {
      setFieldValue("userName", filteredUserNameOptions[activeIndex].userName);
      setIsDropdownVisible(false);
      setActiveIndex(-1);
    }
  };

  const handleBankKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveBankIndex(
        (prevIndex) => (prevIndex + 1) % filteredBankOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveBankIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredBankOptions.length) %
          filteredBankOptions.length
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && activeBankIndex >= 0) {
      setFieldValue("bankName", filteredBankOptions[activeBankIndex].bankName);
      setIsBankDropdownVisible(false);
      setActiveBankIndex(-1);
    }
  };

  const handleWebsiteKeyDown = (e, setFieldValue) => {
    if (e.key === "ArrowDown") {
      setActiveWebsiteIndex(
        (prevIndex) => (prevIndex + 1) % filteredWebsiteOptions.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveWebsiteIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredWebsiteOptions.length) %
          filteredWebsiteOptions.length
      );
    } else if (
      (e.key === "Enter" || e.key === "Tab") &&
      activeWebsiteIndex >= 0
    ) {
      setFieldValue(
        "websiteName",
        filteredWebsiteOptions[activeWebsiteIndex].websiteName
      );
      setIsWebsiteDropdownVisible(false);
      setActiveWebsiteIndex(-1);
    }
  };

  const handleOptionClick = (option, setFieldValue) => {
    setFieldValue("userName", option.userName);
    setIsDropdownVisible(false);
    setActiveIndex(-1);
  };

  const handleBankOptionClick = (option, setFieldValue) => {
    setFieldValue("bankName", option.bankName);
    setIsBankDropdownVisible(false);
    setActiveBankIndex(-1);
  };

  const handleWebsiteOptionClick = (option, setFieldValue) => {
    setFieldValue("websiteName", option.websiteName);
    setIsWebsiteDropdownVisible(false);
    setActiveWebsiteIndex(-1);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("values", values);
    const confirmed = window.confirm(
      "Please double-check the form on obhiasb before confirming, as changes or deletions won't be possible afterward."
    );
    if (confirmed) {
      setIsLoading(true);
      DashService.CreateTransactionWithdraw(values, auth.user)
        .then((response) => {
          console.log(response.data);
          toast.success("Transaction Created Successfully!!");
          setIsLoading(false);
          resetForm();
        })
        .catch((error) => {
          setIsLoading(false);
          errorHandler(error.message, "Something went wrong");
         
        });
    }
  };

  return (
    <div className="mt-3" >
      <FullScreenLoader show={isLoading} />
      <SingleCard className={" mr-5 ml-5"}  style={{ backgroundColor: "#e6f7ff" }}>
        <SingleCard>
      <Container
        className="p-4  "
        style={{
          // backgroundColor: "#f9fafc",
          borderRadius: "8px",
          maxWidth: "1250px",
        }}
      >
        <h3 className="text-bold col d-flex justify-content-center  ">Make New Transaction</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateWithDrawTransactionSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row className=" mt-5">
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
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-danger"
                    />
                    {isDropdownVisible && (
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
                        {filteredUserNameOptions.length > 0 ? (
                          filteredUserNameOptions.map((option, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleOptionClick(option, setFieldValue)
                              }
                              style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor:
                                  activeIndex === index ? "#f0f0f0" : "white",
                              }}
                            >
                              {option.userName}
                            </li>
                          ))
                        ) : (
                          <li style={{ padding: "8px" }}>Not found</li>
                        )}
                      </ul>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="transactionID">Type Transaction Id</label>
                    <Field
                      type="text"
                      name="transactionID"
                      className="form-control"
                      placeholder="Type Transaction Id"
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
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-danger"
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
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="websiteName">Website Name</label>
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

                    <ErrorMessage
                      name="websiteName"
                      component="div"
                      className="text-danger"
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
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <Field
                      as="select"
                      name="paymentMethod"
                      className="form-control"
                    >
                      <option value="UPI">UPI</option>
                      <option value="IMPS">IMPS</option>
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
                    <label htmlFor="amount">Amount</label>
                    <Field
                      type="number"
                      name="amount"
                      className="form-control"
                      placeholder="Enter amount"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="bankCharges">BankCharges</label>
                    <Field
                      type="number"
                      name="bankCharges"
                      className="form-control"
                      placeholder="Enter bankCharges"
                    />
                    <ErrorMessage
                      name="bankCharges"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <Field
                      as="textarea"
                      // rows={3}
                      name="remarks"
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
              <Button variant="dark" type="submit" className="w-100">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
      </SingleCard>
      </SingleCard>
    </div>
  );
};

export default Withdraw;
