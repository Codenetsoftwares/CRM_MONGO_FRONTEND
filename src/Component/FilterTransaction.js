import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from "../Utils/Auth"
import TransactionSercvice from '../Services/TransactionSercvice'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from '../Services/AccountService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const FilterTransaction = ({ purpose, handleData, page, handlePage, handleTotalData, api }) => {
  const { id } = useParams();
  const auth = useAuth();
  const [accountData, setAccountData] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("");
  const [startDatevalue, SetStartDatesetValue] = useState(new Date() - 1 * 24 * 60 * 60 * 1000);
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [documentView, setDocumentView] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const handleFilter = () => {

    api(auth.user, id).then((res) => {
      return (
        setDocumentView(res.data),
        handleData(res.data),
        setAccountData(res.data)
      )
    }).catch((err) => {
      return (
        handleData(""),
        toast.error(err.response.data.message)
      )
    });
  }

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // setDocumentView(nArr);
    handleData(nArr)
  };


  const handleReset = () => {
    setSelect("");
    setSubAdmin("");
    setBank("");
    setWebsite("");
    SetStartDatesetValue(new Date() - 1 * 24 * 60 * 60 * 1000);
    setEndDateValue(new Date());
    setIntroducer("");
    handleFilter();
    handlePage(1);
    handleData(accountData);
    setMinAmount(0);
    setMaxAmount(0);
    // handlememo();
    // window.location.reload();     
  };

  useEffect(() => {
    handleFilter();
  }, []);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user, id).then((res) => {
        setSubAdminlist(res.data);
      });
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data);
      });
      TransactionSercvice.websiteList(auth.user).then((res) => setWebsiteList(res.data));
      AccountService.introducerId(auth.user).then((res) =>
        setIntroducerList(res.data)
      );
    }
  }, [auth]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
    handlePage(1);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
    handlePage(1);
  };

  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
    handleClick("introducerId", value);
    handlePage(1);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value);
    handlePage(1);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value);
    handlePage(1);
  };

  const handleMinAmount = (e) => {
    const value = e.target.value;
    setMinAmount(value);
  };
  const handleMaxAmount = (e) => {
    const value = e.target.value;
    setMaxAmount(value);
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handelData = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    let filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });

    if (minAmount !== 0 || maxAmount !== 0) {
      filteredDocuments = filteredDocuments.filter((transaction) => {
        return (
          transaction.withdrawAmount >= minAmount &&
          transaction.withdrawAmount <= maxAmount ||
          transaction.depositAmount >= minAmount &&
          transaction.depositAmount <= maxAmount ||
          transaction.amount >= minAmount &&
          transaction.amount <= maxAmount

        );
      }
      );
    };
    handleData(filteredDocuments);
    handlePage(1);
  }

  return (
    <div
      className="card card-body rounded-1 "
      style={{ backgroundColor: '#fff4ec' }}
    >
      <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2" >

        <div className="d-flex col pt-3 justify-content-center"  >
          <h6 className="fw-bold text-nowrap pt-2" >
            Transaction
          </h6>
          <select
            className="form-control mx-3 w-50"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              border: "0.5px solid black",
              borderRadius: "6px"
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

        <div className="d-flex col pt-3 justify-content-center" >
          <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
          <select
            className="form-control mx-3 w-50"
            value={subAdmin || ""}
            autoComplete="off"
            onChange={handleSubAdmin}
            style={{
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
        </div>

        {/* when props pass mainstatement from parent component*/}
        {purpose === "mainStatement" && <><div className="d-flex col pt-3 justify-content-center" >
          <h6 className="fw-bold text-nowrap pt-2"> Introducerlist</h6>
          <select
            className="form-control mx-3 w-50"
            value={introducer || ""}
            autoComplete="off"
            onChange={handleIntroducer}
            style={{
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select Introducer</option>
            {introducerList.map((data) => {
              return (
                <option key={data._id} value={data.userName}>
                  {data.userName}
                </option>
              );
            })}
          </select>
        </div>
          <div className="d-flex col pt-3 justify-content-center"  >
            <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
            <select
              className="form-control mx-3 w-50"
              value={bank || ""}
              autoComplete="off"
              onChange={handleBank}
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
              }}
              required
            >
              <option selected>Select Bank</option>
              {bankList.map((data) => {
                return (
                  <option key={data._id} value={data.bankName}>
                    {data.bankName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex col pt-3 justify-content-center" >
            <h6 className="fw-bold text-nowrap pt-2">WebsitesList</h6>
            <select
              className="form-control mx-3 w-50"
              value={website || ""}
              autoComplete="off"
              onChange={handleWebsite}
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
              }}
              required
            >
              <option selected>Select website</option>
              {websiteList.map((data) => {
                return (
                  <option key={data._id} value={data.websiteName}>
                    {data.websiteName}
                  </option>
                );
              })}
            </select>
          </div></>}
        {/* when props pass mainstatement  from parent component*/}

        {/* when props pass bankstatement from parent component*/}
        {/* {purpose === "bankStatement" && <div className="d-flex col pt-3 justify-content-center"  >
                    <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
                    <select
                        className="form-control mx-3 w-50"
                        value={bank || ""}
                        autoComplete="off"
                        onChange={handleBank}
                        style={{
                            border: "0.5px solid black",
                            borderRadius: "6px",
                        }}
                        required
                    >
                        <option selected>Select Bank</option>
                        {bankList.map((data) => {
                            return (
                                <option key={data._id} value={data.bankName}>
                                    {data.bankName}
                                </option>
                            );
                        })}
                    </select>
                </div>} */}
        {/* when props pass bankstatement from parent component*/}

        {/* when props pass websitestatement from parent component*/}
        {/* {purpose === "websiteStatement" && <div className="d-flex col pt-3 justify-content-center" >
                    <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
                    <select
                        className="form-control mx-3 w-50"
                        value={website || ""}
                        autoComplete="off"
                        onChange={handleWebsite}
                        style={{
                            border: "0.5px solid black",
                            borderRadius: "6px",
                        }}
                        required
                    >
                        <option selected>Select website</option>
                        {websiteList.map((data) => {
                            return (
                                <option key={data._id} value={data.websiteName}>
                                    {data.websiteName}
                                </option>
                            );
                        })}
                    </select>
                </div>} */}
        {/* when props pass websitestatement from parent component*/}


        {/* when props pass introducerTransactionStatement & userTransactionStatement from parent component*/}
        {purpose === ("introducerTransactionStatement" || "userTransactionStatement") && <>
          <div className="d-flex col pt-3 justify-content-center"  >
            <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
            <select
              className="form-control mx-3 w-50"
              value={bank || ""}
              autoComplete="off"
              onChange={handleBank}
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
              }}
              required
            >
              <option selected>Select Bank</option>
              {bankList.map((data) => {
                return (
                  <option key={data._id} value={data.bankName}>
                    {data.bankName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex col pt-3 justify-content-center" >
            <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
            <select
              className="form-control mx-3 w-50"
              value={website || ""}
              autoComplete="off"
              onChange={handleWebsite}
              style={{
                border: "0.5px solid black",
                borderRadius: "6px",
              }}
              required
            >
              <option selected>Select website</option>
              {websiteList.map((data) => {
                return (
                  <option key={data._id} value={data.websiteName}>
                    {data.websiteName}
                  </option>
                );
              })}
            </select>
          </div></>}
        {/* when props pass introducerTransactionStatement & userTransactionStatement from parent component*/}

        <div className="d-flex col pt-3 justify-content-center"  >
          <h6 className="fw-bold text-nowrap pt-2"> Range Of Amount</h6>
          <input
            className="form-control mx-3 w-25"
            type='number'
            value={minAmount || ""}
            autoComplete="off"
            onChange={handleMinAmount}
            placeholder='Min Amt'
            style={{
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
            min={1}
          />
          <h6 className="fw-bold text-nowrap pt-2"> To</h6>
          <input
            className="form-control mx-3 w-25"
            type='number'
            value={maxAmount || ""}
            autoComplete="off"
            onChange={handleMaxAmount}
            placeholder='Max Amt'
            style={{
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            min={1}
            required
          />
        </div>

        <div className="row row-cols-4 row-cols-lg-4 g-2 g-lg-3 w-100 " style={{ paddingLeft: '5rem' }} >
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
                onClick={handelData}
              >
                Filter
              </button>
            </div>
            <div className="mx-2">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <div className="mx-2">
              {documentView !== undefined && <CSVLink data={documentView} className="btn btn-success">
                Download Data
              </CSVLink>}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterTransaction