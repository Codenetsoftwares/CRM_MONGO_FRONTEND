import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Col, Row, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CreditTransactionSchema } from "../../Services/schema";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import DashService from "../../Services/DashService";
import FullScreenLoader from "../../Component/FullScreenLoader";

const Deposit = () => {
  // Initial form values
  const initialValues = {
    transactionID: "",
    amount: 0,
    paymentMethod: "UPI",
    userName: "",
    bankName: "",
    websiteName: "",
    transactionType: "Deposit",
    bonus: 0,
    remarks: "",
  };

  // State for options and loading indicator
  const [websiteOptions, setWebsiteOptions] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [userNameOptions, setUserNameOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth(); // Authentication hook

  // Fetch options for form fields on component mount
  useEffect(() => {
    // Fetch active banks
    AccountService.getActiveBank(auth.user).then((res) =>
      setBankOptions(res.data)
    );
    // Fetch active websites
    AccountService.getActiveWebsite(auth.user).then((res) =>
      setWebsiteOptions(res.data)
    );
    // Fetch user names
    AccountService.userId(auth.user).then((res) =>
      setUserNameOptions(res.data)
    );
  }, [auth]);

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("values", values);
    // Confirm submission with the user
    const confirmed = window.confirm(
      "Please double-check the form on obhiasb before confirming, as changes or deletions won't be possible afterward."
    );
    setIsLoading(true); // Show loading indicator
    if (confirmed) {
      // Submit form data to the backend
      DashService.CreateTransactionDeposit(values, auth.user)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          alert("Transaction Created Successfully!!");
          setIsLoading(false); // Hide loading indicator
          window.location.reload(); // Reload the page
        })
        .catch((error) => {
          // Handle error response
          setIsLoading(false); // Hide loading indicator
          console.error(error);
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div>
      {/* Show loader while form is submitting */}
      <FullScreenLoader show={isLoading} />
      <Container
        className="p-4"
        style={{
          backgroundColor: "#f9fafc",
          borderRadius: "8px",
          maxWidth: "800px",
        }}
      >
        <h3 className="mb-4">Make New Transaction</h3>
        {/* Formik wrapper for form state management and validation */}
        <Formik
          initialValues={initialValues}
          validationSchema={CreditTransactionSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="userName">
                      <FaSearch /> Search Customer Name
                    </label>
                    {/* Select field for user name */}
                    <Field as="select" name="userName" className="form-control">
                      <option value="">Select User Name</option>
                      {userNameOptions.map((option) => (
                        <option key={option._id} value={option.userName}>
                          {option.userName}
                        </option>
                      ))}
                    </Field>
                    {/* Error message for user name */}
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="transactionID">Type Transaction Id</label>
                    {/* Input field for transaction ID */}
                    <Field
                      type="text"
                      name="transactionID"
                      className="form-control"
                      placeholder="Type Transaction Id"
                    />
                    {/* Error message for transaction ID */}
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
                    <label htmlFor="bankName">Bank Name</label>
                    {/* Select field for bank name */}
                    <Field as="select" name="bankName" className="form-control">
                      <option value="">Select Bank Name</option>
                      {bankOptions.map((option) => (
                        <option key={option._id} value={option.bankName}>
                          {option.bankName}
                        </option>
                      ))}
                    </Field>
                    {/* Error message for bank name */}
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="websiteName">Website Name</label>
                    {/* Select field for website name */}
                    <Field
                      as="select"
                      name="websiteName"
                      className="form-control"
                    >
                      <option value="">Select Website Name</option>
                      {websiteOptions.map((option) => (
                        <option key={option._id} value={option.websiteName}>
                          {option.websiteName}
                        </option>
                      ))}
                    </Field>
                    {/* Error message for website name */}
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
                    <label htmlFor="paymentMethod">Payment Method</label>
                    {/* Select field for payment method */}
                    <Field
                      as="select"
                      name="paymentMethod"
                      className="form-control"
                    >
                      <option value="UPI">UPI</option>
                      <option value="IMPS">IMPS</option>
                    </Field>
                    {/* Error message for payment method */}
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="transactionType">Transaction Type</label>
                    {/* Select field for transaction type */}
                    <Field
                      as="select"
                      name="transactionType"
                      className="form-control"
                    >
                      <option value="Deposit">Deposit</option>
                      <option value="Withdrawal">Withdrawal</option>
                    </Field>
                    {/* Error message for transaction type */}
                    <ErrorMessage
                      name="transactionType"
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
                    {/* Input field for amount */}
                    <Field
                      type="number"
                      name="amount"
                      className="form-control"
                      placeholder="Enter amount"
                    />
                    {/* Error message for amount */}
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
                    {/* Input field for bonus */}
                    <Field
                      type="number"
                      name="bonus"
                      className="form-control"
                      placeholder="Enter Bonus"
                    />
                    {/* Error message for bonus */}
                    <ErrorMessage
                      name="bonus"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    {/* Textarea for remarks */}
                    <Field
                      as="textarea"
                      rows={3}
                      name="remarks"
                      className="form-control"
                      placeholder="Enter Remarks"
                    />
                    {/* Error message for remarks */}
                    <ErrorMessage
                      name="remarks"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
              </Row>

              {/* Submit button */}
              <Button variant="danger" type="submit" className="w-100">
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
