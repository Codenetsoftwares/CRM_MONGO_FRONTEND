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

  // const { id } = useParams();
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

  let reminder = getbankName.length % 4;
  let lastPage = Math.ceil(getbankName.length / 4);
  let lastPageReminder = getbankName.length % 4 === !0;
  console.log(lastPage);
  console.log(page);

  return (
    <>
      {isLoading ? (
        <div>
          <div>
            <div class="card text-center card text-center mt-2 mr-5 ml-5">
              <div class="card-header fs-3 text-bold">PAYMENT DETAILS</div>
              <div class="card-body">
                <>
                  {page === lastPageReminder ? (
                    <>
                      {getbankName
                        .slice(page * 4 - 4, page * 4 - 4 + reminder)
                        .map((data) => {
                          return (
                            <div class="card d-flex justify-content-between">
                              <div class="card-body ">
                                <p className="font-weight-bold ">
                                  {data.bankName}
                                  <br />
                                  <p className="text-success">
                                    Balance: {data.balance}
                                  </p>
                                </p>
                                <div className="d-flex justify-content-center gap-1">
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
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
                                  <button
                                    type="button"
                                    class="btn btn-success btn-sm"
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
                                  <button
                                    type="button"
                                    class="btn btn-info btn-sm"
                                    onClick={(e) => {
                                      console.log(data._id);
                                      handelstatement(e, data._id);
                                    }}
                                    // disabled={!data.isActive}
                                    title="Statement"
                                  >
                                    <FontAwesomeIcon
                                      icon={faFileAlt}
                                      className="add-icon"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-warning btn-sm"
                                    onClick={(e) => {
                                      handelEditbank(e, data._id);
                                    }}
                                    disabled={!data.isEdit}
                                    title="Edit Bank"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                    />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    // disabled={!data.isActive}
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

                                  {/* Permission */}
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                    data-toggle="modal"
                                    data-target="#RenewBankPermission"
                                    onClick={() => {
                                      handelSubAdmin(data.subAdmins, data._id);
                                    }}
                                    disabled={!data.isRenew}
                                    title="Renew Permission"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="permission"
                                    />
                                  </button>

                                  {/* Active,Inactive */}
                                  {data.isActive === false ? (
                                    <button
                                      type="button"
                                      class="btn btn-dark btn-sm"
                                      title="Active"
                                      onClick={() => {
                                        handelactive(data._id);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        className="active-icon"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      class="btn btn-dark btn-sm"
                                      title="Inactive"
                                      onClick={() => {
                                        handelinactive(data._id);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTimes}
                                        className="active-icon"
                                      />
                                    </button>
                                  )}
                                </div>
                                {/* End of Active,Inactive Part */}
                              </div>
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {getbankName.slice(page * 4 - 4, page * 4).map((data) => {
                        return (
                          <div class="card d-flex justify-content-between">
                            <div class="card-body ">
                              <p className="font-weight-bold">
                                {data.bankName}
                                <br />
                                <p className="text-success">
                                  Balance: {data.balance}
                                </p>
                              </p>
                              <div className="d-flex justify-content-center gap-1">
                                <button
                                  type="button"
                                  class="btn btn-danger btn-sm"
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
                                <button
                                  type="button"
                                  class="btn btn-success btn-sm"
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
                                <button
                                  type="button"
                                  class="btn btn-info btn-sm"
                                  onClick={(e) => {
                                    handelstatement(e, data._id);
                                  }}
                                  // disabled={!data.isActive}
                                  title="Statement"
                                >
                                  <FontAwesomeIcon
                                    icon={faFileAlt}
                                    className="add-icon"
                                  />
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-warning btn-sm"
                                  onClick={(e) => {
                                    handelEditbank(e, data._id);
                                  }}
                                  // disabled={!data.isActive}
                                  title="Edit Bank"
                                  disabled={!data.isEdit}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                  />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  class="btn btn-danger btn-sm"
                                  // disabled={!data.isActive}
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

                                {/* Permission */}
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm"
                                  data-toggle="modal"
                                  data-target="#RenewBankPermission"
                                  onClick={() => {
                                    handelSubAdmin(data.subAdmins, data._id);
                                  }}
                                  // disabled={!data.isActive}
                                  title="Renew Permission"
                                  disabled={!data.isRenew}
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="permission"
                                  />
                                </button>

                                {/* Active,Inactive */}
                                {data.isActive === false ? (
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    title="Active"
                                    onClick={() => {
                                      handelactive(data._id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      className="active-icon"
                                    />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    title="Inactive"
                                    onClick={() => {
                                      handelinactive(data._id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTimes}
                                      className="active-icon"
                                    />
                                  </button>
                                )}
                              </div>
                              {/* End of Active,Inactive Part */}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              </div>
              <div class="card-footer text-muted">
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#innerbnk"
                >
                  Add New Bank
                </button>
              </div>
              <ModalAddBl ID={Id} />
              <ModalWthBl ID={Id} />
              <InnerBank />
              <SubAdminBank ID={Id} />
              <RenewBankPermission SubAdmins={SubAdmins} ID={SId} />
            </div>
          </div>
          {getbankName.length > 0 && (
            <Pagination
              handlePage={handlePage}
              page={page}
              totalPage={lastPage}
              totalData={getbankName.length}
              perPagePagination={4}
            />
          )}
        </div>
      ) : (
        <div className="container">
          <ShimmerEffect />
        </div>
      )}
    </>
  );
};

export default AdminBank;
