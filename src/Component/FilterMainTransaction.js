import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionSercvice from "../Services/TransactionSercvice";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import SingleCard from "../common/singleCard";
import GridCard from "../common/gridCard";

const FilterMainTransaction = ({
  purpose,
  handleData,
  page,
  handlePage,
  handleTotalData,
}) => {
  const auth = useAuth();
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [introducerList, setIntroducerList] = useState([]);
  const [introducer, setIntroducer] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("");
  const [startDatevalue, SetStartDatesetValue] = useState(
    new Date() - 1 * 24 * 60 * 60 * 1000
  );
  const [endDatevalue, setEndDateValue] = useState(new Date());
  const [documentView, setDocumentView] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [searchByTransactionId, setSearchByTransactionId] = useState("");

  const handleFilter = () => {
    const data = {
      transactionType: select,
      introducerList: introducer,
      subAdminList: subAdmin,
      BankList: bank,
      WebsiteList: website,
      sdate: moment(startDatevalue).toDate(),
      edate: moment(endDatevalue).toDate(),
      maxAmount: maxAmount,
      minAmount: minAmount,
      transactionID: searchByTransactionId,
    };
    TransactionSercvice.filterTransaction(data, page, auth.user)
      .then((res) => {
        return (
          setDocumentView(res.data.paginatedResults),
          console.log(documentView),
          handleData(res.data.paginatedResults, res.data.pageNumber),
          handleTotalData(res.data.allIntroDataLength)
        );
      })
      .catch((err) => {
        return handleData(""), toast.error(err.response.data.message);
      });
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
    setSearchByTransactionId("");
    window.location.reload();
  };
  useEffect(() => {
    handleFilter();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [page]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      });
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data);
      });
      AccountService.website(auth.user).then((res) => setWebsiteList(res.data));
      AccountService.introducerId(auth.user).then((res) =>
        setIntroducerList(res.data)
      );
    }
  }, [auth]);
  console.log(websiteList);
  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
  };
  const handleSearchByTransactionId = (e) => {
    const value = e.target.value;
    setSearchByTransactionId(value);
  };
  const handleIntroducer = (e) => {
    const value = e.target.value;
    setIntroducer(value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
  };

  const handleMinAmount = (e) => {
    const value = e.target.value;
    setMinAmount(value);
  };
  const handleMaxAmount = (e) => {
    const value = e.target.value;
    setMaxAmount(value);
  };
  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
  };

  return (
    <SingleCard className="card card-body rounded-8px mt-1">
      <SingleCard
        className="card card-body rounded-8px shadow"
        style={{
          backgroundColor: "#e6f7ff",
          maxWidth: "1500px",
          margin: "auto",
        }}
      >
        <div className="row g-3">
          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Transaction</h6>
            <select
              className="form-control"
              value={select || ""}
              autoComplete="off"
              onChange={handleChange}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            >
              <option value="All">All</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
              <option value="Manual-Bank-Deposit">Manual Bank Deposit</option>
              <option value="Manual-Bank-Withdraw">Manual Bank Withdraw</option>
              <option value="Manual-Website-Deposit">
                Manual Website Deposit
              </option>
              <option value="Manual-Website-Withdraw">
                Manual Website Withdraw
              </option>
            </select>
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">SubAdmin List</h6>
            <select
              className="form-control"
              value={subAdmin || ""}
              autoComplete="off"
              onChange={handleSubAdmin}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
              required
            >
              <option value="">Select subAdmin</option>
              {subAdminlist.map((data) => (
                <option key={data._id} value={data.userName}>
                  {data.userName}
                </option>
              ))}
            </select>
          </div>

          {purpose === "mainStatement" && (
            <>
              <div className="col-md-4 col-lg-3">
                <h6 className="fw-bold text-nowrap">Introducer List</h6>
                <select
                  className="form-control"
                  value={introducer || ""}
                  autoComplete="off"
                  onChange={handleIntroducer}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select Introducer</option>
                  {introducerList.map((data) => (
                    <option key={data._id} value={data.userName}>
                      {data.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-lg-3">
                <h6 className="fw-bold text-nowrap">Bank Name List</h6>
                <select
                  className="form-control"
                  value={bank || ""}
                  autoComplete="off"
                  onChange={handleBank}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                  required
                >
                  <option value="">Select Bank</option>
                  {bankList.map((data) => (
                    <option key={data._id} value={data.bankName}>
                      {data.bankName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Websites List</h6>
            <select
              className="form-control"
              value={website || ""}
              autoComplete="off"
              onChange={handleWebsite}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
              required
            >
              <option value="">Select Website</option>
              {websiteList.map((data) => (
                <option key={data._id} value={data.websiteName}>
                  {data.websiteName}
                </option>
              ))}
            </select>
          </div>

          {(purpose === "introducerReport" || purpose === "mainStatement") && (
            <div className="col-md-4 col-lg-3">
              <h6 className="fw-bold text-nowrap">Range Of Amount</h6>
              <div className="d-flex justify-content-between">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min Amount"
                  value={minAmount || ""}
                  onChange={handleMinAmount}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                />
                <h6 className="fw-bold mx-2">To</h6>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max Amount"
                  value={maxAmount || ""}
                  onChange={handleMaxAmount}
                  style={{ border: "0.5px solid black", borderRadius: "6px" }}
                />
              </div>
            </div>
          )}

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Search By Transaction ID</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Transaction ID"
              value={searchByTransactionId || ""}
              onChange={handleSearchByTransactionId}
              style={{ border: "0.5px solid black", borderRadius: "6px" }}
            />
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="fw-bold text-nowrap">Date Range</h6>
            <div className="d-flex">
              <Datetime
                value={startDatevalue}
                onChange={handleStartDatevalue}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
              />
              <h6 className="fw-bold text-nowrap">To</h6>
              <Datetime
                value={endDatevalue}
                onChange={handleEndDatevalue}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-start gap-2">
              <button
                className="btn btn-dark"
                onClick={handleFilter}
                style={{ borderRadius: "6px" }}
              >
                Filter
              </button>
              <button
                className="btn btn-dark"
                onClick={handleReset}
                style={{ borderRadius: "6px" }}
              >
                Reset
              </button>

              {documentView !== undefined && (
                <CSVLink data={documentView} className="btn btn-success">
                  Download Data
                </CSVLink>
              )}
            </div>
          </div>
        </div>
      </SingleCard>
    </SingleCard>
  );
};

export default FilterMainTransaction;
