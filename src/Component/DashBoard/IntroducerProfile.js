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
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner"; // Import the Oval spinner

const IntroducerProfile = () => {
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
  const RawFilterData = [];

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      const res = await AccountService.Introducerprofile(
        newPage,
        searchTerm,
        auth.user
      );
      const filteredData = res.data.SecondArray.filter(
        (item) => item !== null
      );
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

  return (
    <InfiniteScroll
      dataLength={users.length}
      next={fetchMoreData}
      hasMore={hasMore}
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
      height={800}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more data to load</b>
        </p>
      }
    >
      <SingleCard>
        <div className="m-3">
          <ToastContainer />
          <SingleCard>
            <div className="input-group input-group-sm">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input form-control"
                placeholder="Search User by Name"
                value={search}
                onChange={handleSearch}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </SingleCard>
          <GridCard columns={3} style={{ marginTop: "20px" }}>
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
                    <Link
                      to={`/innerintroducer/${user._id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <button type="button" className="btn btn-primary">
                        NetWork &nbsp;
                        <FontAwesomeIcon icon={faNetworkWired} />
                      </button>
                    </Link>
                    <br />
                    <Link
                      to={`/singleintroducer/${user._id}`}
                      style={{ cursor: "pointer" }}
                    >
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
          {ID !== undefined && <LiveBalanceIntroducer ID={ID} />}
          <IntroducerTransaction
            TxType={txType}
            IntroducerName={introducerName}
          />
        </div>
      </SingleCard>
    </InfiniteScroll>
  );
};

export default IntroducerProfile;
