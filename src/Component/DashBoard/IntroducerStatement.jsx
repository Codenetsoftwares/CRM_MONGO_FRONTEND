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
import TransactionSercvice from "../../Services/TransactionSercvice";
import EditIntroducerTransaction from "../Modal/EditIntroducerTransaction";

const IntroducerStatement = () => {
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
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [dataId, setDataId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [transactionType, setTransactionType] = useState();

  console.log("==>>>", id);
  console.log("data===>", documentView);
  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    setDocumentView(nArr);
  };

  const handleId = (e, id, amount, remark, transactionType) => {
    e.preventDefault();
    setDataId(id);
    setAmount(amount);
    setRemark(remark);
    setTransactionType(transactionType);
  };

  useEffect(() => {
    TransactionSercvice.IntroducerStatement(id, auth.user)
      .then((res) => (setDocumentView(res.data), setAccountData(res.data)))
      .catch((err) => {
        console.error(err, "object");
      });
  }, [id, auth]);
  console.log(documentView);
  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      });
    }
  }, [auth]);

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

  console.log("documentView =>>>", documentView);
  console.log("accountData =>>>", accountData);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
  };

  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
    handleClick("introducerId", value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value);
  };

  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
    let confirm = window.confirm("Are You Sure You Want to Active This Bank");
    if (confirm) {
      switch (transactionType) {
        case "Deposit":
          AccountService.DeleteIntroducerTransaction(
            { requestId: id },
            auth.user
          )

            .then((res) => {
              console.log(res.data);

              toast.success("Transaction delete request sent to Super Admin");
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
          break;
        case "Withdraw":
          AccountService.DeleteIntroducerTransaction(
            { requestId: id },
            auth.user
          )
            .then((res) => {
              console.log(res.data);
              toast.success("Transaction delete request sent to Super Admin");
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
          break;

        default:
        // code block
      }
    }
  };

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setSubAdmin("");
    setBank("");
    setWebsite("");
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

  return (
    <>
      <div className="">
        {/* This is for Normal View */}
        <div
          className="card card-body rounded-1 "
          style={{ backgroundColor: "#fff4ec" }}
        >
          <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
            <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2">Transaction</h6>
              <select
                className="form-control mx-3 w-50"
                value={select || ""}
                autoComplete="off"
                onChange={handleChange}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
              >
                <option className="d-flex" value="All">
                  <b>All</b>
                </option>
                <option className="d-flex" value="Deposit">
                  <b>Deposit</b>
                </option>
                <option className="d-flex" value="Withdraw">
                  <b>Withdraw</b>
                </option>
                <option className="d-flex" value="Manual-Bank-Deposit">
                  <b>Manual Bank Deposit</b>
                </option>{" "}
                <option className="d-flex" value="Manual-Bank-Withdraw">
                  <b>Manual Bank Withdraw</b>
                </option>
                <option className="d-flex" value="Manual-Website-Deposit">
                  <b>Manual Website Deposit</b>
                </option>{" "}
                <option className="d-flex" value="Manual-Website-Withdraw">
                  <b>Manual Website Withdraw</b>
                </option>
              </select>
            </div>

            {/* <div className="d-flex col pt-3 justify-content-center">
              <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
              <select
                className="form-control mx-3 w-50"
                value={subAdmin || ""}
                autoComplete="off"
                onChange={handleSubAdmin}
                style={{
                  // boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
                  border: "0.5px solid black",
                  borderRadius: "6px",
                }}
                required
              >
                <option selected>Select subAdmin</option>
                {subAdminlist.map((data) => {
                  return (
                    <option key={data._id} value={data.firstname}>
                      {data.firstname}
                    </option>
                  );
                })}
              </select>
            </div> */}

            <div
              className="row row-cols-4 row-cols-lg-4 g-2 g-lg-3 w-100 "
              style={{ paddingLeft: "5rem" }}
            >
              <div className="d-flex col justify-content-center ">
                <h6 className="fw-bold text-nowrap pt-2 pr-2"> Start Date</h6>
                <Datetime
                  value={startDatevalue}
                  onChange={handleStartDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
              </div>
              <div className="d-flex col  justify-content-center">
                <h6 className="fw-bold text-nowrap pt-2 pr-2"> End Date</h6>
                <Datetime
                  value={endDatevalue}
                  onChange={handleEndDatevalue}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                />
              </div>
              <div className="d-flex col justify-content-center">
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-dark"
                    // style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                    onClick={handelDate}
                  >
                    Filter
                  </button>
                </div>
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-dark"
                    // style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                {toggle ? (
                  <div className="mx-2">
                    <CSVLink data={documentView} className="btn btn-success">
                      Download Data
                    </CSVLink>
                  </div>
                ) : (
                  <div className="mx-2">
                    <CSVLink data={documentFilter} className="btn btn-success">
                      Download Filter Data
                    </CSVLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {toggle ? (
          <small>
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Txn Type
                  </th>

                  {/* <th scope="col" className="text-primary">
                    Bank
                  </th> */}
                  {/* <th scope="col" className="text-primary">
                    Website
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Balance
                  </th> */}
                  <th scope="col  fs-6" className="text-primary">
                    Balance
                  </th>
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Website Balance
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Current Website Balance
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Balance
                    <br />
                    (Manual)
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Website Balance

                  </th> */}
                  <th scope="col " className="text-primary">
                    Remarks
                  </th>
                  {/* <th scope="col " className="text-primary">
                    Edit
                  </th> */}
                  <th scope="col " className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentView.length > 0 ? (
                  documentView.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          <p
                            className={`col fs-6  ${
                              data.transactionType.includes(
                                "Manual-Website-Withdraw"
                              ) ||
                              data.transactionType.includes(
                                "Manual-Bank-Withdraw"
                              ) ||
                              data.transactionType === "Withdraw"
                                ? "text-red"
                                : "text-black"
                            }`}
                          >
                            {data.amount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.amount}
                              </p>
                            )}
                            {data.depositAmount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.depositAmount}
                              </p>
                            )}
                            {data.withdrawAmount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.withdrawAmount}
                              </p>
                            )}
                          </p>
                        </td>
                        <td>
                          {data?.transactionType && (
                            <p
                              className={`col fs-6  ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.transactionType}
                            </p>
                          )}
                        </td>

                        {/* <td>
                          <p className="col fs-6">
                            {data.bankName ? data.bankName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          <p className="col fs-6">
                            {data.websiteName ? data.websiteName : "N.A"}
                          </p>
                        </td> */}

                        <td>
                          {data.balance ? (
                            <p className="col fs-6 ">{data.balance}</p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceBankWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceBankWithdraw}
                                </p>
                              )}
                              {data.currentBalanceBankDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceWebsiteWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceWebsiteDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceWebsiteWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.currentBalanceWebsiteDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalance ? (
                            <p className="col fs-6">
                              {data.beforeBalance ? data.beforeBalance : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.currentWebsiteBalance ? (
                            <p className="col fs-6">
                              {data.currentWebsiteBalance
                                ? data.currentWebsiteBalance
                                : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}

                        <td>{data.remarks}</td>
                        {/* <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#edittransaction"
                            onClick={(e) => {
                              handleId(
                                e,
                                data._id,
                                data.amount,
                                data.remarks,
                                data.transactionType
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td> */}
                        <td>
                          <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(e, data._id, data.transactionType);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        ) : (
          <small>
            {/* Normal View */}
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
              {/* This is for Deposit Card Normal View */}
              {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
              <thead className="table-success">
                <tr align="center" bgcolor="green" className="fs-6">
                  <th scope="col fs-6" className="text-primary">
                    Date & Time
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Amount
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Txn Type
                  </th>

                  {/* <th scope="col" className="text-primary">
                    Bank
                  </th> */}
                  {/* <th scope="col" className="text-primary">
                    Website
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Balance
                  </th> */}
                  <th scope="col  fs-6" className="text-primary">
                    Balance
                  </th>
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Website Balance
                  </th>
                  <th scope="col  fs-6" className="text-primary">
                    Current Website Balance
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Before Balance
                    <br />
                    (Manual)
                  </th> */}
                  {/* <th scope="col  fs-6" className="text-primary">
                    Website Balance

                  </th> */}
                  <th scope="col " className="text-primary">
                    Remarks
                  </th>
                  {/* <th scope="col " className="text-primary">
                    Edit
                  </th> */}
                  <th scope="col " className="text-primary">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* </div> */}
              <tbody>
                {documentFilter.length > 0 ? (
                  documentFilter.map((data, i) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          <p
                            className={`col fs-6  ${
                              data.transactionType.includes(
                                "Manual-Website-Withdraw"
                              ) ||
                              data.transactionType.includes(
                                "Manual-Bank-Withdraw"
                              ) ||
                              data.transactionType === "Withdraw"
                                ? "text-red"
                                : "text-black"
                            }`}
                          >
                            {data.amount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.amount}
                              </p>
                            )}
                            {data.depositAmount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.depositAmount}
                              </p>
                            )}
                            {data.withdrawAmount && (
                              <p className="col fs-6 font-weight-bold">
                                {data.withdrawAmount}
                              </p>
                            )}
                          </p>
                        </td>
                        <td>
                          {data?.transactionType && (
                            <p
                              className={`col fs-6  ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.transactionType}
                            </p>
                          )}
                        </td>

                        {/* <td>
                          <p className="col fs-6">
                            {data.bankName ? data.bankName : "N.A"}
                          </p>
                        </td> */}
                        {/* <td>
                          <p className="col fs-6">
                            {data.websiteName ? data.websiteName : "N.A"}
                          </p>
                        </td> */}

                        <td>
                          {data.balance ? (
                            <p className="col fs-6 ">{data.balance}</p>
                          ) : (
                            "N.A"
                          )}
                        </td>
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceBankWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceBankWithdraw}
                                </p>
                              )}
                              {data.currentBalanceBankDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceBankDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.beforeBalanceWebsiteWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.beforeBalanceWebsiteDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalanceBankWithdraw ? (
                            <p className="col fs-6">
                              {data.currentBalanceWebsiteWithdraw && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                                </p>
                              )}
                              {data.currentBalanceWebsiteDeposit && (
                                <p className="col fs-6 ">
                                  ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                                </p>
                              )}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.beforeBalance ? (
                            <p className="col fs-6">
                              {data.beforeBalance ? data.beforeBalance : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}
                        {/* <td>
                          {data.currentWebsiteBalance ? (
                            <p className="col fs-6">
                              {data.currentWebsiteBalance
                                ? data.currentWebsiteBalance
                                : "N.A"}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td> */}

                        <td>{data.remarks}</td>
                        {/* <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#edittransaction"
                            onClick={(e) => {
                              handleId(
                                e,
                                data._id,
                                data.amount,
                                data.remarks,
                                data.transactionType
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td> */}
                        <td>
                          <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                handleDelete(e, data._id, data.transactionType);
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1 className="text-center">No Transaction Found</h1>
                )}
              </tbody>
            </table>
          </small>
        )}
      </div>
      <EditIntroducerTransaction
        id={dataId}
        amount={amount}
        remarks={remark}
        transactionType={transactionType}
      />
    </>
  );
};

export default IntroducerStatement;
