import React, { useState, useEffect, useCallback } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import InnerBank from "../InnerBank";
import { Link, useNavigate } from "react-router-dom";
import ModalAddBl from "../Modal/ModalAddBl";
import ModalWthBl from "../Modal/ModalWthBl";
import ModalBkdl from "../Modal/ModalBkdl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubAdminBank from "../Modal/SubAdminBank";
import Pagination from "../Pagination";
import ShimmerEffect from "../ShimmerEffect";
import RenewBankPermission from "../Modal/RenewBankPermission";
import GridCard from "../../common/gridCard";
import SingleCard from "../../common/singleCard";
import "./AdminBank.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
// import { useParams } from "react-router";
const AdminBank = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([]);
  const [Id, setId] = useState();
  const [SId, setSId] = useState();
  const [IdWithdraw, setIdWithdraw] = useState();
  const [SubAdmins, setSubAdmins] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState(""); // usestate for search state
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [tempResponse, setTempResponse] = useState("");

  console.log("========>>>> bankName details", getbankName);

  // const { id } = useParams();

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AccountService.addbank(
      {
        name: bankName,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("Bank registered successfully!");
          Window.location.reload();
        } else {
          toast.error("Something Went Wrong!!");
        }
      })

      .catch((err) => {
        if (!err.response) {
          alert(err.message);
          return;
        }
      });
    window.location.reload();
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setGetBankName([]);
    }
  };

  const handlebankname = (event) => {
    setBankName(event.target.value);
  };

  const handelEditbank = (e, _id) => {
    navigate(`/editbank/${_id}`);
  };

  const handelstatement = (e, accountNumber) => {
    console.log("first", accountNumber);
    navigate(`/bankstatement/${accountNumber}`);
  };

  const handleDeleteBank = (e, id) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      "Are You Sure You Want to Delete This Bank?"
    );

    if (userConfirmed) {
      // console.log(data)
      AccountService.deletebank({ requestId: id }, auth.user)
        .then((res) => {
          // console.log(response.data);
          if (res.status === 200) {
            alert(res.data.message);
            // alert("Bank Deleted approval sent!");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
          // toast.error(error);
          // alert.error("e.message");
        });
    }
  };

  const fetchData = async (searchTerm = search) => {
    try {
      setIsLoading(true);
      const res = await AccountService.getbank(auth.user, page, searchTerm);
      setGetBankName((prev) =>
        searchTerm.length > 0 ? res.data.data : [...prev, ...res.data.data]
      );
      console.log(
        "first",
        searchTerm.length > 0
          ? res.data.data
          : (prev) => [...prev, ...res.data.data]
      );
      setHasMore(page < res.data.pagination.totalPages);
      setTotalPage(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search handler using lodash
  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      fetchData(searchTerm);
    }, 1300),
    []
  );

  useEffect(() => {
    debouncedSearchHandler(search);

    // Cleanup function to cancel debounce on unmount or change
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [search, debouncedSearchHandler]);

  const handelId = (id) => {
    setId(id);
  };

  const handelSubAdmin = (SubAdmins, ID) => {
    setSubAdmins(SubAdmins);
    setSId(ID);
  };

  // const handelWithdrawId = (id) => {
  //   setIdWithdraw(id);
  // };

  const handelActive = (ID) => {
    let confirm = window.confirm("Are You Sure You Want to Active This Bank");
    if (confirm) {
      const flag = true;
      const data = {
        isActive: flag,
      };
      AccountService.activeInactiveBank(ID, data, auth.user)
        .then((response) => {
          alert("Bank Activated");
          setTempResponse(response.data);
          window.location.reload();
          console.log("======>>>> response", response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handelInactive = (ID) => {
    let confirm = window.confirm("Are You Sure You Want to Inactive This Bank");
    if (confirm) {
      const flag = false;
      const data = {
        isActive: flag,
      };
      AccountService.activeInactiveBank(ID, data, auth.user)
        .then((response) => {
          console.log(response.data.message);
          setTempResponse(response.data);
          alert("Bank Inactivated");
          window.location.reload();
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [search, tempResponse]);  // jsx is not changing as per res after render

  // for search input field handled from frontend   to be done by serverside
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
          }}
        >
          <div className="card-header-pill text-bold d-flex ">
            <div className="flex-grow-1 ">
              <input
                type="text"
                className="form-control rounded-pill shadow"
                placeholder="Search Bankname"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-grow-1 d-flex justify-content-end position-relative">
              <h5
                className="mr-5"
                style={{
                  color: "#B0A295", // Matching the background color of the button
                  fontSize: "1.5rem", // Adjust the size to fit well within the header
                  margin: "0", // Remove default margin
                  lineHeight: "2.5rem", // Align vertically with the button
                  fontWeight: "bold", // Make the text thicker
                  fontFamily: "'Abril Fatface', serif ",
                }}
              >
                ADD BANK
              </h5>
              <div
                className="input-icon-web-add position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center rounded-circle"
                // onClick={handleSubmit}
                data-bs-toggle="modal"
                data-bs-target="#innerbnk"
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
            style={{ overflowX: 'hidden' }}
              dataLength={getbankName.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more data to load</b>
                </p>
              }
            >
              <br></br>
              <GridCard columns={2}>
                {getbankName.map((data) => {
                  console.log("====>>> data", data);
                  return (
                    <div
                      key={data._id}
                      className="col d-flex justify-content-center align-items-center "
                      onMouseEnter={() => setHoveredCard(data._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`card d-flex justify-content-between ${
                          hoveredCard === data._id ? "card-hover-shadow" : ""
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
                            {data.bankName}
                            <br />
                            <span className="fs-5" style={{ color: "#A9A9A9" }}>
                              Balance:
                              {data.balance}
                            </span>
                          </p>
                          <div className="container">
                            <div className="row g-1 justify-content-center mt-5">
                              <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <button
                                  type="button"
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalWthbl"
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
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAdbl"
                                  onClick={() => {
                                    handelId(data._id);
                                  }}
                                  disabled={!data.isDeposit}
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
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
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
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  onClick={(e) => {
                                    handelEditbank(e, data._id);
                                  }}
                                  title="Edit Bank"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  disabled={!data.isEdit}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                  />
                                </button>
                              </div>
                              <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <button
                                  type="button"
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  onClick={(e) => {
                                    handleDeleteBank(e, data._id);
                                  }}
                                  title="Delete"
                                  disabled={!data.isDelete}
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
                                  className="btn btn-steel-blue btn-sm btn-hover-zoom"
                                  data-toggle="modal"
                                  data-target="#RenewBankPermission"
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
                          </div>
                        </div>

                        <div className="card-position-top-right">
                          {data.isActive === true ? (
                            <span
                              type="button"
                              className="badge-pill badge-success   btn-hover-scale   "
                              title="Active"
                              onClick={() => {
                                handelInactive(data._id);
                              }}
                            >
                              Active
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="active-icon ms-1"
                              />
                              {/* <span className="status-dot status-dot-green position-absolute top-0 start-100 translate-middle"></span> */}
                            </span>
                          ) : (
                            <span
                              type="button"
                              className="badge-pill badge-secondary  btn-hover-scale"
                              title="Inactive"
                              onClick={() => {
                                handelActive(data._id);
                              }}
                            >
                              Inactive
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="active-icon ms-1"
                              />
                              {/* <span className="status-dot status-dot-red dot-merged position-absolute top-0 start-100 translate-middle"></span> */}
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

        <ModalAddBl ID={Id} />
        <ModalWthBl ID={Id} />
        <InnerBank />
        <SubAdminBank ID={Id} />
        <RenewBankPermission SubAdmins={SubAdmins} ID={SId} />
      </div>
    </div>
  );
};

export default AdminBank;
