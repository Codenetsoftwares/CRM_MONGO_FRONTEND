import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
  faEye,
  faStar,
  faTimes,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import ModalAdWbl from "../Modal/ModalAdWbl";
import ModalWbdl from "../Modal/ModalWbdl";
import ModalWthWbl from "../Modal/ModalWthWbl";
import { toast } from "react-toastify";
import EditWebsite from "../Modal/EditWebsite";
import ShimmerEffect from "../ShimmerEffect";
import Pagination from "../Pagination";
import RenewWebsitePermission from "../Modal/RenewWebsitePermission";
import GridCard from "../../common/gridCard";
import SingleCard from "../../common/singleCard";
import "./WebsiteDetails.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import { Oval } from "react-loader-spinner";
import { errorHandler } from "../../Utils/helper";

const WebsiteDetails = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState([]);
  const [name, setName] = useState([]);
  const [Id, setId] = useState("");
  const [SId, setSId] = useState();
  const [SubAdmins, setSubAdmins] = useState([]);
  const [WebId, setWebId] = useState("");
  const [WebName, setWebName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [search, setSearch] = useState(""); // usestate for search state
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setGetWebsite([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // post api fetch

    AccountService.websitedetails(
      {
        websiteName: website,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          alert(res.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        errorHandler(err.message, "Something went wrong");
        console.log(err);
      });
    // window.location.reload();
  };

  const handelName = (id) => {
    setName(id);
  };
  console.log("This is Name==>>>", name);

  const handelId = (id) => {
    setId(id);
  };

  console.log("ide", Id);

  const handeldeletewebsite = (id) => {
    // e.preventDefault();
    console.log("Line 88", id);

    const userConfirmed = window.confirm(
      "Are You Sure You Want to Delete This Website?"
    );

    if (userConfirmed) {
      console.log("Im here in line 94");
      AccountService.deletewebsite({ requestId: id }, auth.user)
        .then((res) => {
          // console.log(response.data);
          if (res.status === 200) {
            alert("Website Deleted approval sent!");
            window.location.reload();
          }
        })
        .catch((error) => {
          errorHandler(error.message, "Something went wrong");
          // alert.error("e.message");
        });
    }
  };

  const handelWebsiteEdit = (_id, websiteName) => {
    console.log("=>>", websiteName);
    setWebId(_id);
    setWebName(websiteName);
    console.log("Line 116=>>", WebName);
  };

  const fetchData = async (searchTerm = search) => {
    try {
      setIsLoading(true);

      const res = await AccountService.website(auth.user, page, searchTerm);

      setGetWebsite(
        searchTerm.length > 0
          ? res.data.data
          : (prev) => [...prev, ...res.data.data]
      );
      setHasMore(page < res.data.pagination.totalPages);
      setTotalPage(res.data.pagination.totalPages);
    } catch (error) {
      errorHandler(error.message, "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data whenever `refresh` changes
  useEffect(() => {
    setGetWebsite([]);
    fetchData();
  }, [refresh, search]);

  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      fetchData(searchTerm);
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
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await AccountService.website(auth.user, page,search);
  //       setGetWebsite(res.data.data);
  //       setTotalData(res.data.pagination.totalItems);
  //       setTotalPage(res.data.pagination.totalPages);
  //       setIsLoading(true);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(true);
  //     }
  //   };
  //   fetchData();
  // }, [auth, page]);
  // console.log("Website", getWebsite);

  const handelstatement = (e, websitename) => {
    console.log("Website=>>>133", websitename);
    navigate(`/websitestatement/${websitename}`);
  };

  const handelactive = (ID) => {
    const flag = false;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveWebsite(ID, data, auth.user)
      .then((response) => {
        alert("Website Inactivated");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        errorHandler(error.message, "Something went wrong");
        console.error(error);
      });
  };

  const handelinactive = (ID) => {
    const flag = true;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveWebsite(ID, data, auth.user)
      .then((response) => {
        alert("Website Activated");
        window.location.reload();
        console.log(response.data);
      })
      .catch((err) => {
        errorHandler(err.message, "Something went wrong");
        // console.error(error);
      });
  };
  const handelSubAdmin = (SubAdmins, ID) => {
    setSubAdmins(SubAdmins);
    setSId(ID);
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

    <SingleCard>
      <div className="m-3">
        <SingleCard>
          <div className="input-group input-group-sm">
            <button type="button" className="btn btn-primary">

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
                type="search"
                className="form-control rounded-pill shadow"
                placeholder="Search User By Name..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-grow-1 d-flex justify-content-end position-relative">
              <input
                type="text"
                className="form-control rounded-pill shadow ps-5 ml-5"
                placeholder="Add Website"
                value={website}
                onChange={handlewebsite}
              />
              <div
                className="input-icon position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center rounded-circle"
                onClick={handleSubmit}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#4682b4",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </SingleCard>

        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <InfiniteScroll
              style={{ overflowX: "hidden" }}
              dataLength={getWebsite.length ?? 0}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                // Use the spinner here
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "80vh" }}
                >
                  <Oval
                    height={40}
                    width={40}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              }
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more data to load</b>
                </p>
              }
            >
              <br />
              <GridCard>
                {getWebsite.map((data) => {
                  const isInactive = !data.isActive; // Check if the card is inactive
                  return (
                    <div
                      key={data._id}
                      className="col d-flex justify-content-center align-items-center"
                      onMouseEnter={() => setHoveredCard(data._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`card d-flex justify-content-between ${
                          hoveredCard === data._id ? "card-hover-highlight" : ""
                        }`}
                        style={{
                          borderRadius: "20px",
                          height: "200px",
                          width: "95%",
                          position: "relative",
                        }}
                        onClick={() => handleCardClick(data._id)}
                      >
                        <div className="card-body">
                          <p
                            className="font-weight-bold fs-4 text-truncate"
                            style={{ color: "#708090" }}
                          >
                            {data.websiteName}
                            <br />
                            <span
                              className="fs-5 text-truncate"
                              style={{ color: "#A9A9A9" }}
                            >
                              Balance: {data.balance}
                            </span>
                          </p>
                          {/* <div className="container"> */}
                          <div className="row  justify-content-center mt-5">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-custom btn-sm btn-zoom-out ${data.isWithdraw && !isInactive ? "":"avoid-clicks"}`}
                                data-bs-toggle="modal"
                                data-bs-target="#modalWithdrawBlwebsite"
                                onClick={() => {
                                  handelId(data._id);
                                }}
                                disabled={!data.isWithdraw}
                                title="Withdraw"
                              >
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-custom btn-sm btn-zoom-out ${
                                  data.isDeposit && !isInactive ? "" : "avoid-clicks"
                                }`}
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddBlWebsite"
                                onClick={() => {
                                  handelId(data._id);
                                }}
                                // disabled={!data.isDeposit}
                                title="Deposit"
                              >
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className="add-icon"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className="btn btn-custom btn-sm btn-zoom-out"
                                onClick={(e) => {
                                  handelstatement(e, data._id);
                                }}
                                title="Statement"
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
                                className={`btn btn-custom btn-sm btn-zoom-out ${
                                  data.isEdit && !isInactive ? "" : "avoid-clicks"
                                }`}
                                onClick={() => {
                                  handelWebsiteEdit(data._id, data.websiteName);
                                }}
                                title="Edit Website"
                                data-toggle="modal"
                                data-target="#editwebsite"
                                // disabled={!data.isEdit}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  data-toggle="modal"
                                  data-target="#editwebsite"
                                />
                              </button>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-custom btn-sm btn-zoom-out ${
                                  data.isDelete  ? "" : "avoid-clicks"
                                }`}
                                onClick={(e) => {
                                  handeldeletewebsite(data._id);
                                }}
                                title="Delete"
                                // disabled={!data.isDelete}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="delete-icon"
                                />
                              </button>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                              <button
                                type="button"
                                className={`btn btn-custom btn-sm btn-zoom-out ${
                                  data.isRenew && !isInactive ? "" : "avoid-clicks"
                                }`}
                                data-toggle="modal"
                                data-target="#RenewWebsitePermission"
                                onClick={() => {
                                  handelSubAdmin(data.subAdmins, data._id);
                                }}
                                title="Renew Permission"
                                disabled={!data.isRenew}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="permission"
                                />
                              </button>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>

                        <div className="card-top-right">
                          {data.isActive === true ? (
                            <span
                              type="button"
                              className="badge-pill badge-success   btn-zoom-out-custom   "
                              title="Active"
                              onClick={() => {
                                handelactive(data._id);
                              }}
                            >
                              Active
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="active-icon ms-1 "
                              />
                              {/* <span className="dot dot-green position-absolute top-0 start-100 translate-middle"></span> */}
                            </span>
                          ) : (
                            // <span class="badge badge-pill badge-success">Success</span>
                            <span
                              type="button"
                              className="badge-pill badge-secondary  btn-zoom-out-custom "
                              title="Inactive"
                              onClick={() => {
                                handelinactive(data._id);
                              }}
                            >
                              Inactive
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="active-icon ms-1"
                              />
                              {/* <span className="dot dot-red dot-merged position-absolute top-0 start-100 translate-middle"></span> */}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </GridCard>
            </InfiniteScroll>
          </SingleCard>
        </div>
        <ModalWthWbl ID={Id} setRefresh={setRefresh} />
        <ModalAdWbl ID={Id} setRefresh={setRefresh} />
        <ModalWbdl name={name} />
        <EditWebsite ID={WebId} webName={WebName} />
        <RenewWebsitePermission
          SubAdmins={SubAdmins}
          ID={SId}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
};

export default WebsiteDetails;
