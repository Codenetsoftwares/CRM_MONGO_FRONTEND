import React, { useState, useEffect } from "react";
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
import './WebsiteDetails.css';

const WebsiteDetails = () => {
  // const { id } = useParams();
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
  
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  


  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 300); // Reset the animation class after animation duration
  };

  // console.log("Auth", auth);
  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };
  // console.log(website);

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
        alert(err.response.data.message);
        console.log(err);
      });
    // window.location.reload();
  };

  const handlePage = (page) => {
    setPage(page);
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
          toast.error(error);
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

  // get api  fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AccountService.website(auth.user, page);
        setGetWebsite(res.data);
        setTotalData(res.data.allIntroDataLength);
        setTotalPage(res.data.pageNumber);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, [auth, page]);
  console.log("Website", getWebsite);

  const handelstatement = (e, websitename) => {
    console.log("Website=>>>133", websitename);
    navigate(`/websitestatement/${websitename}`);
  };

  const handelactive = (ID) => {
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
      .catch((error) => {
        console.error(error);
      });
  };

  const handelinactive = (ID) => {
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
        alert(error.response.data.message);
        console.error(error);
      });
  };
  const handelSubAdmin = (SubAdmins, ID) => {
    setSubAdmins(SubAdmins);
    setSId(ID);
  };

  let reminder = getWebsite.length % 4;
  let lastPage = Math.ceil(getWebsite.length / 4);
  let lastPageReminder = getWebsite.length % 4 === !0;
  console.log(lastPage);
  console.log(page);

  return (
    // <>
    //   {isLoading ? (
    //     <div>
    //       <div class="card text-center mt-2 mr-5 ml-5">
    //         <div class="card-header fs-3 text-bold">WEBSITE DETAILS</div>

    //         <div class="card-body">
    //           <>
    //             {page === lastPageReminder ? (
    //               <>
    //                 {getWebsite
    //                   .slice(page * 4 - 4, page * 4 - 4 + reminder)
    //                   .map((data) => {
    //                     return (
    //                       <div class="card d-flex justify-content-between">
    //                         <div class="card-body ">
    //                           <p className="font-weight-bold ">
    //                             {data.websiteName}
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
    //                               data-bs-target="#modalWithdrawBlwebsite"
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
    //                               data-bs-target="#modalAddBlWebsite"
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
    //                               onClick={() => {
    //                                 handelWebsiteEdit(
    //                                   data._id,
    //                                   data.websiteName
    //                                 );
    //                               }}
    //                               // disabled={!data.isActive}
    //                               title="Edit Website "
    //                               data-toggle="modal"
    //                               data-target="#editwebsite"
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
    //                                 handeldeletewebsite(data._id);
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
    //                               data-target="#RenewWebsitePermission"
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
    //               </>
    //             ) : (
    //               <>
    //                 {getWebsite.slice(page * 4 - 4, page * 4).map((data) => {
    //                   return (
    //                     <div class="card d-flex justify-content-between">
    //                       <div class="card-body ">
    //                         <p className="font-weight-bold">
    //                           {data.websiteName}
    //                           <br />
    //                           <p className="text-success">
    //                             Balance: {data.balance}
    //                           </p>
    //                         </p>
    //                         <div className="d-flex justify-content-center gap-1">
    //                           <button
    //                             type="button"
    //                             class="btn btn-danger btn-sm"
    //                             data-bs-toggle="modal"
    //                             data-bs-target="#modalWithdrawBlwebsite"
    //                             onClick={() => {
    //                               handelId(data._id);
    //                             }}
    //                             disabled={!data.isWithdraw}
    //                             title="Withdraw"
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faMinus}
    //                               className="add-icon"
    //                             />
    //                           </button>
    //                           <button
    //                             type="button"
    //                             class="btn btn-success btn-sm"
    //                             data-bs-toggle="modal"
    //                             data-bs-target="#modalAddBlWebsite"
    //                             onClick={() => {
    //                               handelId(data._id);
    //                             }}
    //                             disabled={!data.isDeposit}
    //                             title="Deposit"
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faPlus}
    //                               className="add-icon"
    //                             />
    //                           </button>
    //                           <button
    //                             type="button"
    //                             class="btn btn-info btn-sm"
    //                             onClick={(e) => {
    //                               handelstatement(e, data._id);
    //                             }}
    //                             // disabled={!data.isActive}
    //                             title="Statement"
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faFileAlt}
    //                               className="add-icon"
    //                             />
    //                           </button>
    //                           <button
    //                             type="button"
    //                             class="btn btn-warning btn-sm"
    //                             onClick={() => {
    //                               handelWebsiteEdit(data._id, data.websiteName);
    //                             }}
    //                             // disabled={!data.isActive}
    //                             title="Edit Website"
    //                             data-toggle="modal"
    //                             data-target="#editwebsite"
    //                             disabled={!data.isEdit}
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faEdit}
    //                               data-toggle="modal"
    //                               data-target="#exampleModalCenter"
    //                             />
    //                           </button>

    //                           {/* Delete */}
    //                           <button
    //                             type="button"
    //                             class="btn btn-danger btn-sm"
    //                             // disabled={!data.isActive}
    //                             onClick={(e) => {
    //                               handeldeletewebsite(data._id);
    //                             }}
    //                             title="Delete"
    //                             disabled={!data.isDelete}
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faTrashAlt}
    //                               className="delete-icon"
    //                             />
    //                           </button>

    //                           {/* Permission */}
    //                           <button
    //                             type="button"
    //                             class="btn btn-primary btn-sm"
    //                             data-toggle="modal"
    //                             data-target="#RenewWebsitePermission"
    //                             onClick={() => {
    //                               handelSubAdmin(data.subAdmins, data._id);
    //                             }}
    //                             // disabled={!data.isActive}
    //                             title="Renew Permission"
    //                             disabled={!data.isRenew}
    //                           >
    //                             <FontAwesomeIcon
    //                               icon={faEye}
    //                               className="permission"
    //                             />
    //                           </button>

    //                           {/* Active,Inactive */}
    //                           {data.isActive === false ? (
    //                             <button
    //                               type="button"
    //                               class="btn btn-dark btn-sm"
    //                               title="Active"
    //                               onClick={() => {
    //                                 handelactive(data._id);
    //                               }}
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faStar}
    //                                 className="active-icon"
    //                               />
    //                             </button>
    //                           ) : (
    //                             <button
    //                               type="button"
    //                               class="btn btn-dark btn-sm"
    //                               title="Inactive"
    //                               onClick={() => {
    //                                 handelinactive(data._id);
    //                               }}
    //                             >
    //                               <FontAwesomeIcon
    //                                 icon={faTimes}
    //                                 className="active-icon"
    //                               />
    //                             </button>
    //                           )}
    //                         </div>
    //                         {/* End of Active,Inactive Part */}
    //                       </div>
    //                     </div>
    //                   );
    //                 })}
    //               </>
    //             )}
    //           </>
    //         </div>
    //         <div class="card-footer text-muted ">
    //           <input
    //             class="form-control mb-2 text-center"
    //             id="inputPassword2"
    //             placeholder=" Enter your Website Name Here"
    //             onChange={handlewebsite}
    //             required
    //           />
    //           <a href="#" class="btn btn-primary" onClick={handleSubmit}>
    //             Add Website
    //           </a>
    //         </div>
    //         {/* <ModalAdWbl ID={Id} /> */}
    //         {/* <ModalWthWbl ID={Id} /> */}
    //         <ModalWthWbl ID={Id} />
    //         <ModalAdWbl ID={Id} />
    //         <ModalWbdl name={name} />
    //         <EditWebsite ID={WebId} webName={WebName} />
    //         <RenewWebsitePermission SubAdmins={SubAdmins} ID={SId} />
    //       </div>
    //       {getWebsite.length > 0 && (
    //         <Pagination
    //           handlePage={handlePage}
    //           page={page}
    //           totalPage={lastPage}
    //           totalData={getWebsite.length}
    //           perPagePagination={4}
    //         />
    //       )}
    //     </div>
    //   ) : (
    //     <div className="container">
    //       <ShimmerEffect />
    //     </div>
    //   )}
    // </>
    <>
      {isLoading ? (
        <div className="bg-white">
          <div className="card text-center mt-2 mr-5 ml-5"  style={{
          backgroundColor: "#e6f7ff",
         }}>
            <div className="card-header fs-3 text-bold">
            <input
          type="text"
          className="form-control rounded-pill shadow"
          placeholder="Search Website"
          value={search}
         
        />

            </div>
            <div className="card-body">
              <GridCard columns={3} >
                {getWebsite.map((data) => (
                  <div
                    key={data._id}
                    className={`col ${activeCard === data._id ? 'card-animate-forward' : ''} ${hoveredCard === data._id ? 'card-hover-highlight' : ''}`}
                    onClick={() => handleCardClick(data._id)}
                    onMouseEnter={() => setHoveredCard(data._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card d-flex justify-content-between">
                      <div className="card-body">
                        <p className="font-weight-bold">
                          {data.websiteName}
                          <br />
                          <span className="text-success">Balance: {data.balance}</span>
                        </p>
                        <div className="d-flex justify-content-center gap-1">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm "
                            data-bs-toggle="modal"
                            data-bs-target="#modalWithdrawBlwebsite"
                            onClick={() => {
                              handelId(data._id);
                            }}
                            disabled={!data.isWithdraw}
                            title="Withdraw"
                          >
                            <FontAwesomeIcon icon={faMinus} className="add-icon" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddBlWebsite"
                            onClick={() => {
                              handelId(data._id);
                            }}
                            disabled={!data.isDeposit}
                            title="Deposit"
                          >
                            <FontAwesomeIcon icon={faPlus} className="add-icon" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-info btn-sm"
                            onClick={(e) => {
                              handelstatement(e, data._id);
                            }}
                            title="Statement"
                          >
                            <FontAwesomeIcon icon={faFileAlt} className="add-icon" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                              handelWebsiteEdit(data._id, data.websiteName);
                            }}
                            title="Edit Website"
                            data-toggle="modal"
                            data-target="#editwebsite"
                            disabled={!data.isEdit}
                          >
                            <FontAwesomeIcon icon={faEdit} data-toggle="modal" data-target="#exampleModalCenter" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={(e) => {
                              handeldeletewebsite(data._id);
                            }}
                            title="Delete"
                            disabled={!data.isDelete}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-toggle="modal"
                            data-target="#RenewWebsitePermission"
                            onClick={() => {
                              handelSubAdmin(data.subAdmins, data._id);
                            }}
                            title="Renew Permission"
                            disabled={!data.isRenew}
                          >
                            <FontAwesomeIcon icon={faEye} className="permission" />
                          </button>
                          {data.isActive === false ? (
                            <button
                              type="button"
                              className="btn btn-dark btn-sm"
                              title="Active"
                              onClick={() => {
                                handelactive(data._id);
                              }}
                            >
                              <FontAwesomeIcon icon={faStar} className="active-icon" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-dark btn-sm"
                              title="Inactive"
                              onClick={() => {
                                handelinactive(data._id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} className="active-icon" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GridCard>
            </div>
            <div className="card-footer text-muted">
              <input
                className="form-control mb-2 text-center"
                id="inputPassword2"
                placeholder=" Enter your Website Name Here"
                onChange={handlewebsite}
                required
              />
              <a href="#" className="btn btn-primary" onClick={handleSubmit}>
                Add Website
              </a>
            </div>
            <ModalWthWbl ID={Id} />
            <ModalAdWbl ID={Id} />
            <ModalWbdl name={name} />
            <EditWebsite ID={WebId} webName={WebName} />
            <RenewWebsitePermission SubAdmins={SubAdmins} ID={SId} />
          </div>
        </div>
      ) : (
        <div className="container">
          <ShimmerEffect />
        </div>
      )}
    </>
 

  );
};

export default WebsiteDetails;
