import React, { useState, useEffect, useCallback } from "react";
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
  faUserEdit,
  faMinus,
  faPlus,
  faFileAlt,
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
import { debounce } from "lodash";

import IntroducerDepositTransaction from "../Modal/IntroducerDepositTransaction";
import IntroducerWithdrawTransaction from "../Modal/IntroducerWithdrawTransaction";
import "./IntroducerProfile.css";
import IntroducerProfileView from "../Modal/IntroducerProfileView";

import { Oval } from "react-loader-spinner"; // Import the Oval spinner


const IntroducerProfile = ({ data }) => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [introducerName, setIntroducerName] = useState("");
  const [txType, setTxType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [txType1, setTxType1] = useState("");
  const [profileView, setProfileView] = useState("");
  const RawFilterData = [];

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const handleIntroducerTx = (e, data) => {
    console.log(data);
    // console.log(IntroducerName);
    setTxType1(data);
  };
  const handelstatement = (e, id) => {
    navigate(`/introducerstatement/${id}`);
  };
  const fetchData = async (searchTerm = search, newPage = page) => {
    try {

      const res = await AccountService.Introducerprofile(
        newPage,
        searchTerm,
        auth.user
      );

      const filteredData = res.data.SecondArray.filter((item) => item !== null);

      setUsers((prevUsers) =>
        searchTerm.length > 0 ? filteredData : [...prevUsers, ...filteredData]
      );
      setHasMore(newPage < res.data.pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLiveBl = (e, ID) => {
    e.preventDefault();
    setID(ID);
  };

  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      setPage(1); // Reset page to 1 on new search
      fetchData(searchTerm, 1);
    }, 1300),
    [] // Empty dependency array ensures stable function
  );

  useEffect(() => {
    debouncedSearchHandler(search);

    // Cleanup function to cancel debounce on unmount or change
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [search, debouncedSearchHandler]);

  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage); // Increment page number
      fetchData(search, nextPage);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page, search]);


  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handelUserEdit = (e, id) => {
    navigate(`/singleintroducer/${id}`);
  };

  const handelNetwork = (e, id) => {
    navigate(`/innerintroducer/${id}`);
  };

  const handleProfileView = (id) => {
    const selectedUser = users.find((user) => user._id === id);
    setProfileView(selectedUser);
  };
  return (
    <div className="bg-white">
      <div
        className="card text-center mt-2 mr-5 ml-5"
        style={{
          backgroundColor: "#e6f7ff",
          position: "relative",
        }}
      >
        {/* <h1 className="d-flex justify-content-center fs-3 text-bold">INTRODUCER PROFILE</h1> */}
        <SingleCard
          style={{
            backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            <div className="flex-grow-1  ml-4 mr-5">
              <input
                type="search"
                className="form-control rounded-pill shadow"
                placeholder="Search User by Name"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </SingleCard>
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <InfiniteScroll
              style={{ overflowX: "hidden" }}
              dataLength={users.length}
              next={fetchMoreData}
  loader={
        // Center the spinner
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <Oval
            height={50}
            width={50}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      }
              hasMore={hasMore}
              loader={<h4 className="mt-4">Loading...</h4>}
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more data to load</b>
                </p>
              }
            >
              <GridCard columns={3}>
                {users.map((user, index) => (
                  <div
                    key={user._id}
                    className="col d-flex justify-content-center align-items-center "
                    onMouseEnter={() => setHoveredCard(user._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`card d-flex justify-content-between ${
                        hoveredCard === user._id ? "card-hover-shadow" : ""
                      }`}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        width: "95%",
                        position: "relative",
                      }}
                      onClick={() => handleCardClick(user._id)}
                    >
                      <div className="card-body ">
                        <button
                          type="button"
                          className="btn btn-steel-blue btn-sm btn-hover-zoom fs-4"
                          data-toggle="modal"
                          data-target="#introducerProfile"
                          onClick={() => {
                            handleProfileView(user._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} className="add-icon" />
                        </button>
                        <p
                          className="font-weight-bold fs-4 text-truncate mt-3"
                          style={{ color: "#708090" }}
                        >
                          {user.userName}
                        </p>
                        {/* <p className="font-weight-bold fs-5 text-truncate" style={{ fontFamily: "'Abril Fatface', serif "}}>
                          Payment Done Lifetime
                          <p className="text-bold fs-6  text-truncate">
                            {" "}
                            Balance: {user.balance.balance}
                          </p>
                          <p className="text-bold fs-6  text-truncate">
                            {" "}
                            Current Due: {user.balance.currentDue}
                          </p>
                        </p> */}
                        {/* <div> */}
                        {/* <IntroducerPayment id={user._id} /> */}
                        {/* </div> */}
                        <div className="container">
                          <div className="row g-1 justify-content-center mt-5">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                data-toggle="modal"
                                data-target="#withdrawModal"
                                onClick={(e) => {
                                  handleIntroducerTx(e, "Withdraw");
                                }}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                data-toggle="modal"
                                data-target="#depositModal"
                                onClick={(e) => {
                                  handleIntroducerTx(e, "Deposit");
                                }}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                onClick={(e) => {
                                  handelstatement(e, user._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faFileAlt} />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" Edit Profile"
                                onClick={(e) => {
                                  handelUserEdit(e, user._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faUserEdit} />
                              </button>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                title=" NetWork"
                                onClick={(e) => {
                                  handelNetwork(e, user._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faNetworkWired} />
                              </button>
                            </div>

                            {/* <Link
                          to={`/innerintroducer/${user._id}`}
                          style={{ cursor: "pointer" }}
                        > */}
                            {/* <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                          <button type="button" className="btn btn-primary"  title=" NetWork">
                         
                            <FontAwesomeIcon icon={faNetworkWired} />
                          </button>
                          </div> */}
                            {/* </Link> */}

                            {/* <Link
                          to={`/singleintroducer/${user._id}`}
                          style={{ cursor: "pointer" }}
                        > */}
                            {/* <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                          <button type="button" className="btn btn-info mt-2"  title=" Edit Profile"  >
                           
                            <FontAwesomeIcon icon={faUserEdit} />
                          </button>
                          </div> */}

                            {/* </Link> */}

                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                data-toggle="modal"
                                data-target="#LiveBalance"
                                title="Total Profit Lifetime"
                                onClick={(e) => {
                                  handleLiveBl(e, user._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faBalanceScale} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GridCard>
            </InfiniteScroll>
          </SingleCard>
        </div>
        {ID !== undefined && <LiveBalanceIntroducer ID={ID} />}
        <IntroducerTransaction
          TxType={txType}
          IntroducerName={introducerName}
        />
        {txType1 === "Deposit" && <IntroducerDepositTransaction />}
        {txType1 === "Withdraw" && <IntroducerWithdrawTransaction />}
        {profileView && <IntroducerProfileView data={profileView} />}
      </div>
    </div>

  );
};

export default IntroducerProfile;
