import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import SingleCard from "../../common/singleCard";
import GridCard from "../../common/gridCard";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faEye, faFileAlt, faKey, faLock, faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import UserProfileView from "../Modal/UserProfileView";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false); //for user edit icon
  const [profileView, setProfileView] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      setIsLoading(true);
      const res = await AccountService.userprofile(
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
    } finally {
      setIsLoading(false);
    }
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

  const handleInnerProfile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id, q: search } });
  };

  const handleProfileView = (gg, d) => {
    console.log(d);

    setProfileView(d);
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
        <SingleCard
          style={{
            backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            {/* <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="form-control search-input"
              placeholder="Search User by Name"
              value={search}
              onChange={handleSearch}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            /> */}

            <div className="flex-grow-1  ml-4 mr-5">
              <input
                type="text"
                className="form-control rounded-pill shadow"
                placeholder="Search User By Name..."
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
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            handleProfileView(user._id, user);
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
                        <div className="container">
                          <div className="row g-1 justify-content-center mt-5">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              {/* <div className="col-6 col-sm-4 col-md-3 col-lg-2"> */}
                              <button
                                type="button"
                                className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                onClick={() => {
                                  handleInnerProfile(user._id);
                                }}
                                title="Profile Edit"
                              >
                                <FontAwesomeIcon
                                  icon={faUserEdit}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <button
                                  type="button"
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  // onClick={(e) => {
                                  //   handelstatement(e, data._id);
                                  // }}
                                  title="Bank Details & Edit"
                                >
                                  <FontAwesomeIcon
                                    icon={faBank}
                                    className="add-icon"
                                  />
                                </button>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <button
                                  type="button"
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  // onClick={(e) => {
                                  //   handelstatement(e, data._id);
                                  // }}
                                  title="Transaction Details"
                                >
                                  <FontAwesomeIcon
                                    icon={faFileAlt}
                                    className="add-icon"
                                  />
                                </button>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <button
                                  type="button"
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  // onClick={(e) => {
                                  //   handelstatement(e, data._id);
                                  // }}
                                  title="Reset Password"
                                >
                                  <FontAwesomeIcon
                                    icon={faKey}
                                    className="add-icon"
                                  />
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
        <UserProfileView user={profileView} />
      </div>
    </div>
  );
};

export default UserProfile;
