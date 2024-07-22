import React, { useState, useEffect } from "react";
import CreateRequestNew from "../CreateRequestNew";
import AccountService from "../../Services/AccountService";
import EditServices from "../../Services/EditServices";
import { FaHandsHelping } from "react-icons/fa";
import SubAdminBank from "./SubAdminBank";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import GridCard from "../../common/gridCard";
import SingleCard from "../../common/singleCard";

const RenewWebsitePermission = ({ SubAdmins, ID }) => {
  const [toggle, setToggle] = useState(true);
  const [subAdmin, setSubAdmin] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]); // State for checkbox data
  const [checkboxIsDeposit, setCheckboxIsDeposit] = useState([]); // State for checkbox data
  const [checkboxIsWithdraw, setCheckboxIsWithdraw] = useState([]); // State for checkbox data
  const [checkboxIsEdit, setCheckboxIsEdit] = useState([]); // State for Edit checkbox data
  const [checkboxIsDelete, setCheckboxIsDelete] = useState([]); // State for Delete checkbox data
  const [checkboxIsRenew, setCheckboxIsRenew] = useState([]); // State for Renew checkbox data
  const [subAdminlist, setSubAdminlist] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdmin(res.data);
        setSubAdminlist(res.data.map((data) => data.userName));
      });
    }
  }, [auth]);

  const setData = () => {
    setCheckboxIsDeposit(arrDeposit);
    setCheckboxIsWithdraw(arrWithdraw);
    setCheckboxIsEdit(arrEdit);
    setCheckboxIsDelete(arrDelete);
    setCheckboxIsRenew(arrRenew);
    setCheckboxStates(newArray);
  };

  const handeltoggle = () => {
    setToggle(!toggle);
    setData();
  };

  const mergedArray = [
    ...subAdmin.map((item) => ({
      subAdminId: item.userName,
      isDeposit: false,
      isWithdraw: false,
      isEdit: false,
      isRenew: false,
      isDelete: false,
      _id: item._id,
    })),
    ...SubAdmins,
  ];

  const uniqueMergedArray = [
    ...new Map(mergedArray.map((item) => [item.subAdminId, item])).values(),
  ];

  console.log(uniqueMergedArray);
  let arrDeposit = [];
  let arrWithdraw = [];
  let arrEdit = [];
  let arrRenew = [];
  let arrDelete = [];

  // var flag = 0;
  // for (let i = flag; i < uniqueMergedArray.length; i++) {
  //   for (let j = 0; j < SubAdmins.length; j++) {
  //     arrsubadmin.push(SubAdmins[j].subAdminId);
  //     flag = j;
  //   }
  //   arrsubadmin.push(uniqueMergedArray[flag].subAdminId);
  // }

  const newArray = new Array(uniqueMergedArray.length).fill(false);

  // Map subAdminId values to the corresponding indices
  SubAdmins.forEach((subAdmin) => {
    const index = uniqueMergedArray.findIndex(
      (item) => item.subAdminId === subAdmin.subAdminId
    );
    if (index !== -1) {
      newArray[index] = subAdmin.subAdminId;
    }
  });

  for (let i = 0; i < uniqueMergedArray.length; i++) {
    arrDeposit.push(uniqueMergedArray[i].isDeposit);
    arrWithdraw.push(uniqueMergedArray[i].isWithdraw);
    arrEdit.push(uniqueMergedArray[i].isEdit);
    arrRenew.push(uniqueMergedArray[i].isRenew);
    arrDelete.push(uniqueMergedArray[i].isDelete);
  }
  // console.log(mergedData);
  // const handelsave = () => {
  //   console.log("New Array=>>>", uniqueMergedArray);
  //   console.log("Is Deposit=>>>", arrDeposit);
  //   console.log("Is Withdraw=>>>", arrWithdraw);
  //   console.log("All Subadmin Name=>>>", subAdmin);
  //   console.log("Permited Subadmin Name=>>>", newArray);
  // };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleCheckboxIsDepositChange = (index) => {
    const newCheckboxIsDeposit = [...checkboxIsDeposit];
    newCheckboxIsDeposit[index] = !newCheckboxIsDeposit[index];
    setCheckboxIsDeposit(newCheckboxIsDeposit);
  };
  const handleCheckboxIsWithdrawChange = (index) => {
    const newCheckboxIsWithdraw = [...checkboxIsWithdraw];
    newCheckboxIsWithdraw[index] = !newCheckboxIsWithdraw[index];
    setCheckboxIsWithdraw(newCheckboxIsWithdraw);
  };

  const handleCheckboxIsEditChange = (index) => {
    const newCheckboxIsEdit = [...checkboxIsEdit];
    newCheckboxIsEdit[index] = !newCheckboxIsEdit[index];
    setCheckboxIsEdit(newCheckboxIsEdit);
  };

  const handleCheckboxIsDeleteChange = (index) => {
    const newCheckboxIsDelete = [...checkboxIsDelete];
    newCheckboxIsDelete[index] = !newCheckboxIsDelete[index];
    setCheckboxIsDelete(newCheckboxIsDelete);
  };

  const handleCheckboxIsRenewChange = (index) => {
    const newCheckboxIsRenew = [...checkboxIsRenew];
    newCheckboxIsRenew[index] = !newCheckboxIsRenew[index];
    setCheckboxIsRenew(newCheckboxIsRenew);
  };

  const funtoggle = () => {
    setToggle(true);
    setData();
  };

  // const handelsave = () => {
  //   console.log("Chcekboxstate", checkboxStates);
  //   console.log("ChcekboxDeposit", checkboxIsDeposit);
  //   console.log("ChcekboxWithdraw", checkboxIsWithdraw);
  // };
  const handelsave = () => {
    let arr = [];
    const handledata = () => {
      let data = {};
      for (let i = 0; i < subAdminlist.length; i++) {
        console.log("subAdminlist", subAdminlist[i]);
        if (
          checkboxStates[i] === true ||
          (typeof checkboxStates[i] === "string" &&
            checkboxStates[i].trim() !== "")
        ) {
          console.log("check", checkboxStates);
          data = {
            subAdminId: subAdminlist[i],
            isDeposit: checkboxIsDeposit[i],
            isWithdraw: checkboxIsWithdraw[i],
            isEdit: checkboxIsEdit[i],
            isDelete: checkboxIsDelete[i],
            isRenew: checkboxIsWithdraw[i],
          };
          arr.push(data);
        }
      }
      return arr;
    };
    handledata();
    console.log(arr);
    const data = {
      subAdmins: arr,
    };
    console.log(data);
    AccountService.permissionrenewWebsite(data, ID, auth.user)
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
  const handelRevokePermision = (SubAdminID) => {
    AccountService.revokeAllPermissionWebsite(ID, SubAdminID, auth.user)
      .then((response) => {
        alert("All Permission Revoked For this SubAdmin");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        alert("Oh ho!! Something Went Wrong");
        console.error(error);
      });
  };
  return (
    <div
    className="modal fade"
    id="RenewWebsitePermission"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="RenewWebsitePermissionTitle"
    aria-hidden="true"
    >
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header" style={{ backgroundColor: '#3b6e91', color: '#fff' }}>
          <h5 className="modal-title" id="RenewWebsitePermissionTitle">
            {toggle ? "Previous Permissions" : "Update Permissions"}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={funtoggle}
          ></button>
        </div>
    
        <div className="modal-body">
          {toggle ? (
            SubAdmins && SubAdmins.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">SubAdmin</th>
                      <th scope="col">Deposit</th>
                      <th scope="col">Withdraw</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Renew</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SubAdmins.map((subAdmin) => (
                      <tr key={subAdmin._id}>
                        <td>{subAdmin.subAdminId}</td>
                        <td>{subAdmin.isDeposit ? "Yes" : "No"}</td>
                        <td>{subAdmin.isWithdraw ? "Yes" : "No"}</td>
                        <td>{subAdmin.isEdit ? "Yes" : "No"}</td>
                        <td>{subAdmin.isDelete ? "Yes" : "No"}</td>
                        <td>{subAdmin.isRenew ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No permissions found</p>
            )
          ) : (
            <SingleCard style={{ overflowY: 'auto', maxHeight: '600px' }}> 
            <GridCard columns={1} style={{ margin: "1rem" }}>
              {subAdmin.map((admin, index) => (
                <SingleCard key={index} className="p-4 mb-4 shadow-sm border border-light" style={{ marginBottom: '1rem' }}>
                  <div className="d-flex align-items-start mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      id={`checkbox${index}`}
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      value={admin.userName}
                      style={{ accentColor: '#3b6e91', position: 'relative', zIndex: 1 }}
                    />
                    <label
                      className="form-check-label  fw-bold"
                      htmlFor={`checkbox${index}`}
                      style={{ color: '#3b6e91', marginRight: '1rem' }} 
                    >
                      {admin.userName}
                    </label>
                    <div className="ms-auto">
                      <FontAwesomeIcon
                        icon={faTimes}
                        title="Revoke All Permission"
                        className="text-danger"
                        style={{ cursor: "pointer", fontSize: '1.25rem' }}
                        onClick={() => handelRevokePermision(admin.userName)}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2"> {/* Align labels in a straight column */}
                    {[
                      { label: "Deposit", state: checkboxIsDeposit, handler: handleCheckboxIsDepositChange },
                      { label: "Withdraw", state: checkboxIsWithdraw, handler: handleCheckboxIsWithdrawChange },
                      { label: "Edit", state: checkboxIsEdit, handler: handleCheckboxIsEditChange },
                      { label: "Delete", state: checkboxIsDelete, handler: handleCheckboxIsDeleteChange },
                      { label: "Renew", state: checkboxIsRenew, handler: handleCheckboxIsRenewChange },
                    ].map(({ label, state, handler }, idx) => (
                      <div key={idx} className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input me-2 "
                          id={`${label}${index}`}
                          checked={state[index]}
                          onChange={() => handler(index)}
                          style={{ accentColor: '#3b6e91' }} 
                        />
                        <label className="form-check-label" htmlFor={`${label}${index}`}>
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </SingleCard>
              ))}
            </GridCard>
          </SingleCard>
          )}
        </div>
    
        <div className="modal-footer">
          {toggle ? (
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={funtoggle}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handelsave}
            >
              Save
            </button>
          )}
    
          {toggle ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handeltoggle}
            >
              Renew
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handeltoggle}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RenewWebsitePermission;
