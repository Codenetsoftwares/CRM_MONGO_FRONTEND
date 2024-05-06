import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from "../Utils/Auth"
import TransactionSercvice from '../Services/TransactionSercvice'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import AccountService from '../Services/AccountService';
import { toast } from 'react-toastify';

const FilterMainTransaction = ({ purpose, handleData, page, handlePage, handleTotalData }) => {
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
    const [startDatevalue, SetStartDatesetValue] = useState(new Date() - 1 * 24 * 60 * 60 * 1000);
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
            transactionID: searchByTransactionId
        }
        TransactionSercvice.filterTransaction(data, page, auth.user).then((res) => {
            return (
                setDocumentView(res.data.paginatedResults),
                console.log(documentView),
                handleData(res.data.paginatedResults, res.data.pageNumber),
                handleTotalData(res.data.allIntroDataLength)
            )
        }).catch((err) => {
            return (
                handleData(""),
                toast.error(err.response.data.message)
            )
        });

    }

    const handleReset = () => {
        setSelect("");
        setSubAdmin("");
        setBank("");
        setWebsite("");
        SetStartDatesetValue(new Date() - 1 * 24 * 60 * 60 * 1000);
        setEndDateValue(new Date());
        setIntroducer("");
        handleFilter();
        handlePage(1)
        setSearchByTransactionId("")
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
    console.log(websiteList)
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
                    {/* <div className="d-flex col  justify-content-center"  >
                        <h6 className="fw-bold text-nowrap pt-2"> Search By TXN ID </h6>
                        <input
                            className="form-control mx-3 w-75"
                            type='text'
                            value={searchByTransactionId || ""}
                            onChange={handleSearchByTransactionId}
                            placeholder='Search'
                            style={{
                                border: "0.5px solid black",
                                borderRadius: "6px",
                            }}
                        />

                    </div> */}
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
                                onClick={handleFilter}
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

export default FilterMainTransaction