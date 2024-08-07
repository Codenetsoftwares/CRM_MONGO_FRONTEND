import React, { useState, useEffect } from "react";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useAuth } from "../../Utils/Auth";
import { errorHandler } from "../../Utils/helper";

const SubAdminBank = ({ ID, EditApi, purpose }) => {
  console.log("first1011110", purpose)
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]); // State for subadmin checkbox data
  const [checkboxIsDeposit, setCheckboxIsDeposit] = useState([]); // State for Deposit checkbox data
  const [checkboxIsWithdraw, setCheckboxIsWithdraw] = useState([]); // State for Withdraw checkbox data
  const [checkboxIsEdit, setCheckboxIsEdit] = useState([]); // State for Edit checkbox data
  const [checkboxIsDelete, setCheckboxIsDelete] = useState([]); // State for Delete checkbox data
  const [checkboxIsRenew, setCheckboxIsRenew] = useState([]); // State for Renew checkbox data

  const auth = useAuth();

  useEffect(() => {

    if (purpose === "bank") {
      TransactionSercvice.bankSubAdminList(auth.user).then((res) => {
        setSubAdmin(res.data);
        setSubAdminlist(res.data.map((data) => data.userName));
        setCheckboxStates(res.data.map(() => false)); // Initialize checkbox states
        setCheckboxIsDeposit(res.data.map(() => false));
        setCheckboxIsWithdraw(res.data.map(() => false));
        setCheckboxIsEdit(res.data.map(() => false));
        setCheckboxIsDelete(res.data.map(() => false));
        setCheckboxIsRenew(res.data.map(() => false));
      });
    }
    else {
      TransactionSercvice.websiteSubAdminList(auth.user).then((res) => {
        setSubAdmin(res.data);
        setSubAdminlist(res.data.map((data) => data.userName));
        setCheckboxStates(res.data.map(() => false)); // Initialize checkbox states
        setCheckboxIsDeposit(res.data.map(() => false));
        setCheckboxIsWithdraw(res.data.map(() => false));
        setCheckboxIsEdit(res.data.map(() => false));
        setCheckboxIsDelete(res.data.map(() => false));
        setCheckboxIsRenew(res.data.map(() => false));
      });
    }


  }, [auth]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let res;
  //       if (purpose === "bank") {
  //         res = await TransactionSercvice.bankSubAdminList(auth.user);
  //       } else {
  //         res = await TransactionSercvice.websiteSubAdminList(auth.user);
  //       }

  //       setSubAdmin(res.data);
  //       setSubAdminlist(res.data.map((data) => data.userName));
  //       setCheckboxStates(res.data.map(() => false)); // Initialize checkbox states
  //       setCheckboxIsDeposit(res.data.map(() => false));
  //       setCheckboxIsWithdraw(res.data.map(() => false));
  //       setCheckboxIsEdit(res.data.map(() => false));
  //       setCheckboxIsDelete(res.data.map(() => false));
  //       setCheckboxIsRenew(res.data.map(() => false));
  //     } catch (err) {
  //       errorHandler(err, 'Failed to fetch sub admin list');
  //     }
  //   };

  //   fetchData();
  // }, [auth, purpose]);

  //  For subadmin Name Change
  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
  //  For Deposit Change
  const handleCheckboxIsDepositChange = (index) => {
    const newCheckboxIsDeposit = [...checkboxIsDeposit];
    newCheckboxIsDeposit[index] = !newCheckboxIsDeposit[index];
    setCheckboxIsDeposit(newCheckboxIsDeposit);
  };
  //  For Withdraw Change
  const handleCheckboxIsWithdrawChange = (index) => {
    const newCheckboxIsWithdraw = [...checkboxIsWithdraw];
    newCheckboxIsWithdraw[index] = !newCheckboxIsWithdraw[index];
    setCheckboxIsWithdraw(newCheckboxIsWithdraw);
  };
  //  For Edit Change
  const handleCheckboxIsEditChange = (index) => {
    const newCheckboxIsEdit = [...checkboxIsEdit];
    newCheckboxIsEdit[index] = !newCheckboxIsEdit[index];
    setCheckboxIsEdit(newCheckboxIsEdit);
  };

  //  For Delete Change
  const handleCheckboxIsDeleteChange = (index) => {
    const newCheckboxIsDelete = [...checkboxIsDelete];
    newCheckboxIsDelete[index] = !newCheckboxIsDelete[index];
    setCheckboxIsDelete(newCheckboxIsDelete);
  };

  //  For Renew Change
  const handleCheckboxIsRenewChange = (index) => {
    const newCheckboxIsRenew = [...checkboxIsRenew];
    newCheckboxIsRenew[index] = !newCheckboxIsRenew[index];
    setCheckboxIsRenew(newCheckboxIsRenew);
  };

  const handelsave = () => {
    let arr = [];
    const handledata = () => {
      let data = {};
      for (let i = 0; i < subAdminlist.length; i++) {
        if (checkboxStates[i] === true) {
          data = {
            subAdminId: subAdminlist[i],
            isDeposit: checkboxIsDeposit[i],
            isWithdraw: checkboxIsWithdraw[i],
            isEdit: checkboxIsEdit[i],
            isRenew: checkboxIsRenew[i],
            isDelete: checkboxIsDelete[i],
          };
          arr.push(data);
        }
      }
      return arr;
    };
    handledata();
    console.log(arr);
    const data = {
      isApproved: true,
      subAdmins: arr,
    };

    EditApi(ID, data, auth.user)
      .then((response) => {
        console.log("res", response.data);
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header sticky-top bg-success">
              <h5 className="modal-title" id="exampleModalLabel">
                Give the Permission SubAdmin Wise
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                {subAdmin.length > 0 ? (
                  subAdmin.map((subAdmin, index) => (
                    <>
                      {/* <div
                        key={index}
                        className="form-check"
                        style={{ margin: "5px" }}
                      >
                        <div className="d-flex justify-content-between"></div>

                        {index < subAdminlist.length - 1 && (
                          <hr
                            style={{ margin: "5px 0", borderColor: "black" }}
                          />
                        )}
                      </div> */}
                      <div className="container">
                        <div
                          class="row row-cols-auto align-items-center"
                          key={index}
                        >
                          <div class="col-sm-8">
                            {" "}
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxStates[index]}
                              onChange={() => handleCheckboxChange(index)}
                              value={subAdmin.userName}
                              title="By Clicking this box you are allowing this subadmin to view this perticular Bank"
                            />
                            <label
                              className="form-check-label text-info"
                              htmlFor={`checkbox${index}`}
                              style={{ fontWeight: "bold" }}
                              title="By Clicking this box you are allowing this subadmin to view this perticular Bank"
                            >
                              {subAdmin.userName}
                            </label>
                          </div>
                          <div class="col-sm-8">
                            {" "}
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxIsDeposit[index]}
                              onChange={() =>
                                handleCheckboxIsDepositChange(index)
                              }
                            // value={subAdmin.userName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${index}`}
                            // style={{ fontWeight: "bold" }}
                            >
                              Deposit
                            </label>
                          </div>
                          <div class="col-sm-8">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxIsWithdraw[index]}
                              onChange={() =>
                                handleCheckboxIsWithdrawChange(index)
                              }
                            // value={subAdmin.userName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${index}`}
                            // style={{ fontWeight: "bold" }}
                            >
                              Withdraw
                            </label>
                          </div>
                          <div class="col-sm-8">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxIsEdit[index]}
                              onChange={() => handleCheckboxIsEditChange(index)}
                            // value={subAdmin.userName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${index}`}
                            // style={{ fontWeight: "bold" }}
                            >
                              Edit
                            </label>
                          </div>
                          <div class="col-sm-8">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxIsDelete[index]}
                              onChange={() =>
                                handleCheckboxIsDeleteChange(index)
                              }
                            // value={subAdmin.userName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${index}`}
                            // style={{ fontWeight: "bold" }}
                            >
                              Delete
                            </label>
                          </div>
                          <div class="col-sm-8">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox${index}`}
                              // style={{ marginRight: "5px" }}
                              checked={checkboxIsRenew[index]}
                              onChange={() =>
                                handleCheckboxIsRenewChange(index)
                              }
                            // value={subAdmin.userName}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${index}`}
                            // style={{ fontWeight: "bold" }}
                            >
                              Renew
                            </label>
                          </div>
                        </div>
                      </div>
                      {index < subAdminlist.length - 1 && (
                        <hr style={{ margin: "5px 0", borderColor: "black" }} />
                      )}
                    </>
                  ))
                ) : (
                  <p>No sub-admins found.</p>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelsave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminBank;
