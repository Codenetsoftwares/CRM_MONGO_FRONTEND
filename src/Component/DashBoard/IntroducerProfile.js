import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faNetworkWired,
  faEdit,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import LiveBalanceIntroducer from "../Modal/LiveBalanceIntroducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import TransactionSercvice from "../../Services/TransactionSercvice";
import IntroducerTransaction from "../Modal/IntroducerTransaction";
import IntroducerPayment from "./IntroducerPayment";
import Pagination from "../Pagination";
import SingleCard from "../../common/singleCard";
import GridCard from "../../common/gridCard";

const IntroducerProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [introducerName, setIntroducerName] = useState("");
  const [txType, setTxType] = useState("");
  const [page, setPage] = useState(1)
  const [pageNumber, setPageNumber] = useState("")
  const [totalData, setTotalData] = useState(0)
  const RawFilterData = [];


  // const handelinnerprofile =()=>{
  //   navigate(`/innerprofile/${users._id}`);
  // }

  const handlePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    AccountService.Introducerprofile(page, q, auth.user)
      .then((res) => (setUsers(res.data.SecondArray), setPageNumber(res.data.pageNumber), setTotalData(res.data.allIntroDataLength))).catch(err => (setUsers([])))
  }, [auth, page, q]);
  console.log("users", users);

  const handleLiveBl = (e, ID) => {
    e.preventDefault()
    setID(ID);
  };

  console.log("Live Bl", ID);

  return (
    <SingleCard>
    <div className="m-3">
      <ToastContainer />
      {/* <h1 className="d-flex justify-content-center fs-3 text-bold">INTRODUCER PROFILE</h1> */}
      <SingleCard>
        <div className="input-group input-group-sm">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input form-control"
            placeholder="Search User by Name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </SingleCard>
      {users.length > 0 ? (
        <>
          <GridCard columns={3} style={{ marginTop: '20px' }}>
            {users.map((user, index) => (
              <div className="col" key={index}>
                <div className="card container-fluid mt-2 border-dark">
                  <div className="card-body">
                    <p className="text-bold">{user.userName}</p>
                    <IntroducerPayment
                      IntroducerName={user.userName}
                      balance={user.balance.balance}
                      duebalance={user.balance.currentDue}
                      id={user._id}
                    />
                    <Link to={`/innerintroducer/${user._id}`} style={{ cursor: 'pointer' }}>
                      <button type="button" className="btn btn-primary">
                        NetWork &nbsp;
                        <FontAwesomeIcon icon={faNetworkWired} />
                      </button>
                    </Link>
                    <br />
                    <Link to={`/singleintroducer/${user._id}`} style={{ cursor: 'pointer' }}>
                      <button type="button" className="btn btn-info mt-2">
                        Edit Profile &nbsp;
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <br />
                    <button
                      type="button"
                      className="btn btn-warning mt-2"
                      data-toggle="modal"
                      data-target="#LiveBalance"
                      onClick={(e) => {
                        handleLiveBl(e, user._id);
                      }}
                    >
                      Total Profit Lifetime &nbsp;
                      <FontAwesomeIcon icon={faBalanceScale} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </GridCard>
          <Pagination handlePage={handlePage} page={page} totalPage={pageNumber} totalData={totalData} perPagePagination={10} />
        </>
      ) : (
        <h1 className="text-center mt-4">No Introducer Found</h1>
      )}
      {ID !== undefined && <LiveBalanceIntroducer ID={ID} />}
      <IntroducerTransaction TxType={txType} IntroducerName={introducerName} />
    </div>
  </SingleCard>
  );
};

export default IntroducerProfile;
