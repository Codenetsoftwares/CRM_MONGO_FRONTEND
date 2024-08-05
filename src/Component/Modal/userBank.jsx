import React, { useState, useEffect } from "react";
import SingleCard from "../../common/singleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

const UserBank = ({ bankDetail, upiDetail, paramsid }) => {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState({});
  const [editedBankDetail, setEditedBankDetail] = useState(bankDetail);
  const [editedUpiDetail, setEditedUpiDetail] = useState(upiDetail);

  useEffect(() => {
    setEditedBankDetail(bankDetail);
    setEditedUpiDetail(upiDetail);
    setIsEditing({});
  }, [bankDetail, upiDetail]);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e, field, isBank) => {
    const { name, value } = e.target;
    if (isBank) {
      setEditedBankDetail((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setEditedUpiDetail((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleUpdate = () => {
    const updatedData = {
      bankDetail: editedBankDetail,
      upiDetail: editedUpiDetail,
    };

    AccountService.inneruserprofile(paramsid, updatedData, auth.user)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          alert("Profile Updated");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("The sum of introducer percentages must be between 0 and 100");
      });

    setIsEditing({});
  };

  return (
    <div className="modal fade" id="modalbank" tabIndex="-1" role="dialog" aria-labelledby="modalbankedit" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
          <div className="modal-header">
            <h5 className="modal-title text-white" id="exampleModalLabel">
              Bank View & Edit
            </h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <SingleCard style={{ borderColor: "black", borderStyle: "solid", borderWidth: "2px", filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.8))" }}>
              <div className="row align-items-center mb-2">
                <div className="col-sm-1">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToggle('bankName', true)} className="text-grey" />
                </div>
                <div className="col-sm-4 text-nowrap">
                  <p className="mb-0">Bank Name:</p>
                </div>
                <div className="col-sm-7">
                  {isEditing.bankName ? (
                    <input type="text" className="form-control" name="bankName" value={editedBankDetail?.bankName} onChange={(e) => handleInputChange(e, 'bankName', true)} />
                  ) : (
                    <p className="text-muted mb-0">{bankDetail?.bankName}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row align-items-center mb-2">
                <div className="col-sm-1">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToggle('accountNumber', true)} className="text-grey" />
                </div>
                <div className="col-sm-4 text-nowrap">
                  <p className="mb-0">Account Number:</p>
                </div>
                <div className="col-sm-7">
                  {isEditing.accountNumber ? (
                    <input type="text" className="form-control" name="accountNumber" value={editedBankDetail?.accountNumber} onChange={(e) => handleInputChange(e, 'accountNumber', true)} />
                  ) : (
                    <p className="text-muted mb-0">{bankDetail?.accountNumber}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row align-items-center mb-2">
                <div className="col-sm-1">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToggle('upiApp', false)} className="text-grey" />
                </div>
                <div className="col-sm-4 text-nowrap">
                  <p className="mb-0">UPI Application:</p>
                </div>
                <div className="col-sm-7">
                  {isEditing.upiApp ? (
                    <input type="text" className="form-control" name="upiApp" value={editedUpiDetail?.upiApp} onChange={(e) => handleInputChange(e, 'upiApp', false)} />
                  ) : (
                    <p className="text-muted mb-0">{upiDetail?.upiApp}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row align-items-center mb-2">
                <div className="col-sm-1">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToggle('upiId', false)} className="text-grey" />
                </div>
                <div className="col-sm-4 text-nowrap">
                  <p className="mb-0">UPI ID:</p>
                </div>
                <div className="col-sm-7">
                  {isEditing.upiId ? (
                    <input type="text" className="form-control" name="upiId" value={editedUpiDetail?.upiId} onChange={(e) => handleInputChange(e, 'upiId', false)} />
                  ) : (
                    <p className="text-muted mb-0">{upiDetail?.upiId}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row align-items-center mb-2">
                <div className="col-sm-1">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToggle('upiNumber', false)} className="text-grey" />
                </div>
                <div className="col-sm-4 text-nowrap">
                  <p className="mb-0">UPI Number:</p>
                </div>
                <div className="col-sm-7">
                  {isEditing.upiNumber ? (
                    <input type="text" className="form-control" name="upiNumber" value={editedUpiDetail?.upiNumber} onChange={(e) => handleInputChange(e, 'upiNumber', false)} />
                  ) : (
                    <p className="text-muted mb-0">{upiDetail?.upiNumber}</p>
                  )}
                </div>
              </div>
            </SingleCard>
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            {Object.values(isEditing).some((val) => val) && <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBank;
