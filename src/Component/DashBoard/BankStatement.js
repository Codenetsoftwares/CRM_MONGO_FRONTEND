import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import { useNavigate, useParams } from "react-router";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import EditTransaction from "../Modal/EditTransaction";
import TransactionSercvice from "../../Services/TransactionSercvice";

const BankStatement = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [Manualstmnt, SetManualstmnt] = useState([]);
  const [Userstmnt, SetUserstmnt] = useState([]);
  const [select, setSelect] = useState("All");
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [NormalEditData, setNormalEditData] = useState({
    Id: "",
    amount: "",
    bankName: "",
    paymentMethod: "",
    subAdminName: "",
    transactionID: "",
    transactionType: "",
    userId: "",
    websiteName: "",
    depositAmount: "",
    withdrawAmount: "",
  });

  console.log(id);

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    // const originalData = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // if (nArr.length === 0) {
    //   nArr = originalData;
    // }
    setDocumentView(nArr);
  };

  useEffect(() => {
    AccountService.GetBankStMent(id, auth.user)
      .then((res) => (setDocumentView(res.data), setAccountData(res.data)))
      .catch((err) => {
        // console.log(err.response.data.message);
        // toast.err("No Details Found");
        console.error(err, "object");
      });
  }, [id, auth]);
  console.log(documentView);
  const handelDate = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false);
  };

  console.log("Bank Names Manual =>>>", Manualstmnt);
  console.log("Bank Names User =>>>", Userstmnt);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
  };

  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Withdraw":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success(
              "Bank Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Website-withdraw":
        AccountService.DeleteWebsiteTransaction(id, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Manual-Website-Deposit":
        AccountService.DeleteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Bank Transaction deleted");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
      // code block
    }
  };

  const handelnormaledit = (
    e,
    id,
    amount,
    bankName,
    paymentMethod,
    subAdminName,
    transactionID,
    transactionType,
    userId,
    websiteName,
    depositAmount,
    withdrawAmount
  ) => {
    const data = {
      id,
      amount,
      bankName,
      paymentMethod,
      subAdminName,
      transactionID,
      transactionType,
      userId,
      websiteName,
      depositAmount,
      withdrawAmount,
    };
    setNormalEditData(data);
    console.log("====>>>>", NormalEditData);
  };

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setToggle(true);
    SetStartDatesetValue(new Date());
    setEndDateValue(new Date());
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  // const handleDel = (id) => {
  //   TransactionSercvice.delBankTransactionData(id, auth.user)
  //     .then((response) => {
  //       console.log(response.data);
  //       navigate("/admindash");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("Failed! Invalid Data");
  //     });
  // };

  return (
    <div>
      <div className=" container mt-1">
        {/* This is for Normal View */}
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap ">View</h6>
          <select
            className="form-control mx-3 w-25 mb-2"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="All">
              <b>All</b>
            </option>
            <option className="d-flex" value="Manual-Deposit">
              <b>Manual Entry(Deposit)</b>
            </option>
            <option className="d-flex" value="Manual-Deposit">
              <b>Manual Entry(Withdraw)</b>
            </option>
            <option className="d-flex" value="Deposit">
              <b>User Entry(Deposit)</b>
            </option>
            <option className="d-flex" value="Withdraw">
              <b>User Entry(Withdraw)</b>
            </option>
          </select>
        </div>
        <div className="d-flex pt-2 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Start Date</h6>
          <Datetime
            value={startDatevalue}
            onChange={handleStartDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-2 justify-content-center mb-3">
          <h6 className="fw-bold text-nowrap pt-2"> End Date</h6>
          <Datetime
            value={endDatevalue}
            onChange={handleEndDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center mb-2">
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handelDate}
            >
              Filter
            </button>
          </div>
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div className="mx-2">
            <CSVLink data={documentView} className="btn btn-success">
              Download Data
            </CSVLink>
          </div>
        </div>
        {toggle ? (
          <div className=" container mt-5">
            <div
              className="card  rounded-2 mb-2"
              style={{
                boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6">Date</h4>
                  <h4 className="col fs-6">Amount</h4>
                  <h4 className="col fs-6">Transaction Id</h4>
                  <h4 className="col fs-6">Transaction Type</h4>
                  <h4 className="col fs-6">Gateway</h4>
                  <h4 className="col fs-6">CreatedBy</h4>
                  <h4 className="col fs-6">User Id</h4>
                  <h4 className="col fs-6">Bank</h4>
                  <h4 className="col fs-6">Website</h4>
                  <h4 className="col fs-6">Before Bank Balance</h4>
                  <h4 className="col fs-6">Total Bank Balance</h4>
                  <h4 className="col fs-6">Before Website Balance</h4>
                  <h4 className="col fs-6">Total Website Balance</h4>
                  <h4 className="col fs-6">Before Balance</h4>
                  <h4 className="col fs-6">Total Balance</h4>
                </div>
              </div>
            </div>

            {documentView.length > 0 ? (
              documentView.map((data, i) => {
                return (
                  <div
                    className="card rounded-2"
                    style={{
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                      boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <p className="col fs-6">
                          {new Date(data.createdAt).toLocaleString("default")}{" "}
                        </p>
                        {data.amount && (
                          <p className="col fs-6">₹&nbsp;{data.amount}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.depositAmount}
                          </p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.withdrawAmount}
                          </p>
                        )}
                        {data.transactionID && (
                          <p className="col fs-6 text-break">
                            {data.transactionID}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.transactionType && (
                          <p className="col fs-6 text-break">
                            {data.transactionType}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.paymentMethod}</p>
                        )}
                        <p className="col fs-6 text-break">
                          {data.subAdminName}
                        </p>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.userId}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        <p className="col fs-6">
                          {data.bankName ? data.bankName : "N.A"}
                        </p>
                        <p className="col fs-6">
                          {data.websiteName ? data.websiteName : "N.A"}
                        </p>
                        <p className="col fs-6">
                          {data.beforeBalanceBankWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceBankWithdraw}</p>
                          )}
                          {data.beforeBalanceBankDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceBankDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.currentBalanceBankWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceBankWithdraw}</p>
                          )}
                          {data.currentBalanceBankDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceBankDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.beforeBalanceWebsiteWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceWebsiteWithdraw}</p>
                          )}
                          {data.beforeBalanceWebsiteDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceWebsiteDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.currentBalanceWebsiteWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceWebsiteWithdraw}</p>
                          )}
                          {data.currentBalanceWebsiteDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceWebsiteDeposit}</p>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edittransaction"
                        onClick={(e) => {
                          handelnormaledit(
                            e,
                            data._id,
                            data.amount,
                            data.bankName,
                            data.paymentMethod,
                            data.subAdminName,
                            data.transactionID,
                            data.transactionType,
                            data.userId,
                            data.currentBalanceWebsiteWithdraw,
                            data.depositAmount,
                            data.withdrawAmount
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button type="button" className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={(e) => {
                            handleDelete(e, data._id, data.transactionType);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </div>
        ) : (
          <div className=" container mt-5">
            <div
              className="card  rounded-2 mb-2"
              style={{
                boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <h4 className="col fs-6">Date</h4>
                  <h4 className="col fs-6">Amount</h4>
                  <h4 className="col fs-6">Transaction Id</h4>
                  <h4 className="col fs-6">Gateway</h4>
                  <h4 className="col fs-6">CreatedBy</h4>
                  <h4 className="col fs-6">User Id</h4>
                  <h4 className="col fs-6">Bank</h4>
                  <h4 className="col fs-6">Website</h4>
                  <h4 className="col fs-6">Before Bank Balance</h4>
                  <h4 className="col fs-6">Total Bank Balance</h4>
                  <h4 className="col fs-6">Before Website Balance</h4>
                  <h4 className="col fs-6">Total Website Balance</h4>
                  <h4 className="col fs-6">Before Balance</h4>
                  <h4 className="col fs-6">Total Balance</h4>
                </div>
              </div>
            </div>

            {documentFilter.length > 0 ? (
              documentFilter.map((data, i) => {
                return (
                  <div
                    className="card rounded-2"
                    style={{
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                      boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <p className="col fs-6">
                          {new Date(data.createdAt).toLocaleString("default")}{" "}
                        </p>
                        {data.amount && (
                          <p className="col fs-6">₹&nbsp;{data.amount}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.depositAmount}
                          </p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.withdrawAmount}
                          </p>
                        )}
                        {data.transactionID && (
                          <p className="col fs-6 text-break">
                            {data.transactionID}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.transactionType && (
                          <p className="col fs-6 text-break">
                            {data.transactionType}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.paymentMethod}</p>
                        )}

                        <p className="col fs-6 text-break">
                          {data.subAdminName}
                        </p>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.userId}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        <p className="col fs-6">
                          {data.bankName ? data.bankName : "N.A"}
                        </p>
                        <p className="col fs-6">
                          {data.websiteName ? data.websiteName : "N.A"}
                        </p>
                        <p className="col fs-6">
                          {data.beforeBalanceBankWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceBankWithdraw}</p>
                          )}
                          {data.beforeBalanceBankDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceBankDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.currentBalanceBankWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceBankWithdraw}</p>
                          )}
                          {data.currentBalanceBankDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceBankDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.beforeBalanceWebsiteWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceWebsiteWithdraw}</p>
                          )}
                          {data.beforeBalanceWebsiteDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.beforeBalanceWebsiteDeposit}</p>
                          )}
                        </p>
                        <p className="col fs-6">
                          {data.currentBalanceWebsiteWithdraw && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceWebsiteWithdraw}</p>
                          )}
                          {data.currentBalanceWebsiteDeposit && (
                            <p className="col fs-6 text-break">₹&nbsp; {data.currentBalanceWebsiteDeposit}</p>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edittransaction"
                        onClick={(e) => {
                          handelnormaledit(
                            e,
                            data._id,
                            data.amount,
                            data.bankName,
                            data.paymentMethod,
                            data.subAdminName,
                            data.transactionID,
                            data.transactionType,
                            data.userId,
                            data.websiteName,
                            data.depositAmount,
                            data.withdrawAmount
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button type="button" className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={(e) => {
                            handleDelete(e, data._id, data.transactionType);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Transaction Found</h1>
            )}
          </div>
        )}
      </div>
      <EditTransaction Data={NormalEditData} />
    </div>
  );
};

export default BankStatement;
