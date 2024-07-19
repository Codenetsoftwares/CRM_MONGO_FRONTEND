import React, { useState, useEffect } from "react";
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
// import { useParams } from "react-router";
const AdminBank = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bankName, setBankName] = useState("");
  const [getbankName, setGetBankName] = useState([{}]);
  const [Id, setId] = useState();
  const [SId, setSId] = useState();
  const [IdWithdraw, setIdWithdraw] = useState();
  const [SubAdmins, setSubAdmins] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState(""); // usestate for search state
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

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

  const selectPageHandler = (selectedPage) => {
    console.log(selectedPage);

    setPage(selectedPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AccountService.getbank(auth.user, page);
        setGetBankName(res.data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, [page]);

  console.log("Bank Names", getbankName);
  console.log("first", isLoading);

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

  const handelactive = (ID) => {
    const flag = true;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveBank(ID, data, auth.user)
      .then((response) => {
        alert("Bank Activated");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handelinactive = (ID) => {
    const flag = false;
    const data = {
      isActive: flag,
    };
    AccountService.activeInactiveBank(ID, data, auth.user)
      .then((response) => {
        alert("Bank Inactivated");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // for search input field handled from frontend   to be done by serverside
  // const filteredBankName = getbankName.filter((website) =>
  //   website.bankName.toLowerCase().includes(search.toLowerCase())
  // );

  let reminder = getbankName.length % 4;
  let lastPage = Math.ceil(getbankName.length / 4);
  let lastPageReminder = getbankName.length % 4 === !0;
  console.log(lastPage);
  console.log(page);

  return (
    // <>
    //   {isLoading ? (
    //     <div>
    //       <div>
    //         <div class="card text-center card text-center mt-2 mr-5 ml-5">
    //           <div class="card-header fs-3 text-bold">PAYMENT DETAILS</div>
    //           <div class="card-body">
    //             <>
    //               {page === lastPageReminder ? (
    //                 <>
    //                   {getbankName
    //                     .slice(page * 4 - 4, page * 4 - 4 + reminder)
    //                     .map((data) => {
    //                       return (
    //                         <div class="card d-flex justify-content-between">
    //                           <div class="card-body ">
    //                             <p className="font-weight-bold ">
    //                               {data.bankName}
    //                               <br />
    //                               <p className="text-success">
    //                                 Balance: {data.balance}
    //                               </p>
    //                             </p>
    //                             <div className="d-flex justify-content-center gap-1">
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-danger btn-sm"
    //                                 data-bs-toggle="modal"
    //                                 data-bs-target="#modalWthbl"
    //                                 onClick={() => {
    //                                   handelId(data._id);
    //                                 }}
    //                                 disabled={!data.isWithdraw}
    //                                 title="Withdraw"
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faMinus}
    //                                   className="add-icon"
    //                                 />
    //                               </button>
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-success btn-sm"
    //                                 data-bs-toggle="modal"
    //                                 data-bs-target="#modalAdbl"
    //                                 onClick={() => {
    //                                   handelId(data._id);
    //                                 }}
    //                                 disabled={!data.isDeposit}
    //                                 title="Deposit"
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faPlus}
    //                                   className="add-icon"
    //                                 />
    //                               </button>
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-info btn-sm"
    //                                 onClick={(e) => {
    //                                   console.log(data._id);
    //                                   handelstatement(e, data._id);
    //                                 }}
    //                                 // disabled={!data.isActive}
    //                                 title="Statement"
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faFileAlt}
    //                                   className="add-icon"
    //                                 />
    //                               </button>
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-warning btn-sm"
    //                                 onClick={(e) => {
    //                                   handelEditbank(e, data._id);
    //                                 }}
    //                                 disabled={!data.isEdit}
    //                                 title="Edit Bank"
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faEdit}
    //                                   data-toggle="modal"
    //                                   data-target="#exampleModalCenter"
    //                                 />
    //                               </button>

    //                               {/* Delete */}
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-danger btn-sm"
    //                                 // disabled={!data.isActive}
    //                                 onClick={(e) => {
    //                                   handleDeleteBank(e, data._id);
    //                                 }}
    //                                 title="Delete"
    //                                 disabled={!data.isDelete}
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faTrashAlt}
    //                                   className="delete-icon"
    //                                 />
    //                               </button>

    //                               {/* Permission */}
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-primary btn-sm"
    //                                 data-toggle="modal"
    //                                 data-target="#RenewBankPermission"
    //                                 onClick={() => {
    //                                   handelSubAdmin(data.subAdmins, data._id);
    //                                 }}
    //                                 disabled={!data.isRenew}
    //                                 title="Renew Permission"
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faEye}
    //                                   className="permission"
    //                                 />
    //                               </button>

    //                               {/* Active,Inactive */}
    //                               {data.isActive === false ? (
    //                                 <button
    //                                   type="button"
    //                                   class="btn btn-dark btn-sm"
    //                                   title="Active"
    //                                   onClick={() => {
    //                                     handelactive(data._id);
    //                                   }}
    //                                 >
    //                                   <FontAwesomeIcon
    //                                     icon={faStar}
    //                                     className="active-icon"
    //                                   />
    //                                 </button>
    //                               ) : (
    //                                 <button
    //                                   type="button"
    //                                   class="btn btn-dark btn-sm"
    //                                   title="Inactive"
    //                                   onClick={() => {
    //                                     handelinactive(data._id);
    //                                   }}
    //                                 >
    //                                   <FontAwesomeIcon
    //                                     icon={faTimes}
    //                                     className="active-icon"
    //                                   />
    //                                 </button>
    //                               )}
    //                             </div>
    //                             {/* End of Active,Inactive Part */}
    //                           </div>
    //                         </div>
    //                       );
    //                     })}
    //                 </>
    //               ) : (
    //                 <>
    //                   {getbankName.slice(page * 4 - 4, page * 4).map((data) => {
    //                     return (
    //                       <div class="card d-flex justify-content-between">
    //                         <div class="card-body ">
    //                           <p className="font-weight-bold">
    //                             {data.bankName}
    //                             <br />
    //                             <p className="text-success">
    //                               Balance: {data.balance}
    //                             </p>
    //                           </p>
    //                           <div className="d-flex justify-content-center gap-1">
    //                             <button
    //                               type="button"
    //                               class="btn btn-danger btn-sm"
    //                               data-bs-toggle="modal"
    //                               data-bs-target="#modalWthbl"
    //                               onClick={() => {
    //                                 handelId(data._id);
    //                               }}
    //                               disabled={!data.isWithdraw}
    //                               title="Withdraw"
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faMinus}
    //                                 className="add-icon"
    //                               />
    //                             </button>
    //                             <button
    //                               type="button"
    //                               class="btn btn-success btn-sm"
    //                               data-bs-toggle="modal"
    //                               data-bs-target="#modalAdbl"
    //                               onClick={() => {
    //                                 handelId(data._id);
    //                               }}
    //                               disabled={!data.isDeposit}
    //                               title="Deposit"
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faPlus}
    //                                 className="add-icon"
    //                               />
    //                             </button>
    //                             <button
    //                               type="button"
    //                               class="btn btn-info btn-sm"
    //                               onClick={(e) => {
    //                                 handelstatement(e, data._id);
    //                               }}
    //                               // disabled={!data.isActive}
    //                               title="Statement"
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faFileAlt}
    //                                 className="add-icon"
    //                               />
    //                             </button>
    //                             <button
    //                               type="button"
    //                               class="btn btn-warning btn-sm"
    //                               onClick={(e) => {
    //                                 handelEditbank(e, data._id);
    //                               }}
    //                               // disabled={!data.isActive}
    //                               title="Edit Bank"
    //                               disabled={!data.isEdit}
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faEdit}
    //                                 data-toggle="modal"
    //                                 data-target="#exampleModalCenter"
    //                               />
    //                             </button>

    //                             {/* Delete */}
    //                             <button
    //                               type="button"
    //                               class="btn btn-danger btn-sm"
    //                               // disabled={!data.isActive}
    //                               onClick={(e) => {
    //                                 handleDeleteBank(e, data._id);
    //                               }}
    //                               title="Delete"
    //                               disabled={!data.isDelete}
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faTrashAlt}
    //                                 className="delete-icon"
    //                               />
    //                             </button>

    //                             {/* Permission */}
    //                             <button
    //                               type="button"
    //                               class="btn btn-primary btn-sm"
    //                               data-toggle="modal"
    //                               data-target="#RenewBankPermission"
    //                               onClick={() => {
    //                                 handelSubAdmin(data.subAdmins, data._id);
    //                               }}
    //                               // disabled={!data.isActive}
    //                               title="Renew Permission"
    //                               disabled={!data.isRenew}
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faEye}
    //                                 className="permission"
    //                               />
    //                             </button>

    //                             {/* Active,Inactive */}
    //                             {data.isActive === false ? (
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-dark btn-sm"
    //                                 title="Active"
    //                                 onClick={() => {
    //                                   handelactive(data._id);
    //                                 }}
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faStar}
    //                                   className="active-icon"
    //                                 />
    //                               </button>
    //                             ) : (
    //                               <button
    //                                 type="button"
    //                                 class="btn btn-dark btn-sm"
    //                                 title="Inactive"
    //                                 onClick={() => {
    //                                   handelinactive(data._id);
    //                                 }}
    //                               >
    //                                 <FontAwesomeIcon
    //                                   icon={faTimes}
    //                                   className="active-icon"
    //                                 />
    //                               </button>
    //                             )}
    //                           </div>
    //                           {/* End of Active,Inactive Part */}
    //                         </div>
    //                       </div>
    //                     );
    //                   })}
    //                 </>
    //               )}
    //             </>
    //           </div>
    //           <div class="card-footer text-muted">
    //             <button
    //               class="btn btn-primary"
    //               data-bs-toggle="modal"
    //               data-bs-target="#innerbnk"
    //             >
    //               Add New Bank
    //             </button>
    //           </div>
    //           <ModalAddBl ID={Id} />
    //           <ModalWthBl ID={Id} />
    //           <InnerBank />
    //           <SubAdminBank ID={Id} />
    //           <RenewBankPermission SubAdmins={SubAdmins} ID={SId} />
    //         </div>
    //       </div>
    //       {/* {getbankName.length > 0 && (
    //         <Pagination
    //           handlePage={handlePage}
    //           page={page}
    //           totalPage={lastPage}
    //           totalData={getbankName.length}
    //           perPagePagination={4}
    //         />
    //       )} */}
    //     </div>
    //   ) : (
    //     <div className="container">
    //       <ShimmerEffect />
    //     </div>
    //   )}
    // </>

    <div>
      {isLoading ? (
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
              <div className="card-header-pill  text-bold d-flex ">
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
                  <h5 className="mr-5">Add Bank</h5>
                  <div
                    className="input-icon-web-add  position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center rounded-circle"
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
            <div className="card-body infinite-scroll-content mt-2 mb-3">
              <SingleCard className="mb-2 p-4">
                {/* <InfiniteScroll
                  dataLength={filteredWebsites.length}
                  next={fetchMoreData}
                  hasMore={page < totalPage}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>No more data to load</b>
                    </p>
                  }
                > */}
                <GridCard columns={2}>
                  {getbankName.map((data) => (
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
                          width: "100%",
                          position: "relative",
                        }}
                        onClick={() => handleCardClick(data._id)}
                      >
                        <div className="card-body">
                          <p
                            className="font-weight-bold fs-4"
                            style={{ color: "#708090" }}
                          >
                            {data.bankName}
                            <br />
                            <span className="fs-5" style={{ color: "#A9A9A9" }}>
                              Balance: {data.balance}
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
                                    handelEditbank( e,data._id);
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
                                    handleDeleteBank(e,data._id);
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
                          {data.isActive === false ? (
                            <span
                              type="button"
                              className="badge-pill badge-success   btn-hover-scale   "
                              title="Active"
                              onClick={() => {
                                handelactive(data._id);
                              }}
                            >
                              Active
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="active-icon ms-1"
                              />
                              <span className="status-dot status-dot-green position-absolute top-0 start-100 translate-middle"></span>
                            </span>
                          ) : (
                            <span
                              type="button"
                              className="badge-pill badge-secondary  btn-hover-scale"
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
                              <span className="status-dot status-dot-red dot-merged position-absolute top-0 start-100 translate-middle"></span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </GridCard>
                {/* </InfiniteScroll> */}
              </SingleCard>
            </div>

            <ModalAddBl ID={Id} />
            <ModalWthBl ID={Id} />
            <InnerBank />
            <SubAdminBank ID={Id} />
            <RenewBankPermission SubAdmins={SubAdmins} ID={SId} />
          </div>
        </div>
      ) : (
        <div className="container">
          <ShimmerEffect />
        </div>
      )}
    </div>
  );
};

export default AdminBank;
