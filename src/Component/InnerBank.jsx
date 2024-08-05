import React, { useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";

const InnerBank = ({ setRefresh, refresh }) => {
  const [bname, setBname] = useState("");
  const [accno, setAccno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [hname, setHname] = useState("");
  const [upi, setUpi] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiPhoneNumber, setUpiPhoneNumber] = useState("");

  const auth = useAuth();

  const resetForm = () => {
    setBname("");
    setAccno("");
    setIfsc("");
    setHname("");
    setUpi("");
    setUpiName("");
    setUpiPhoneNumber("");
  };

  const bnameChange = (e) => setBname(e.target.value);
  const accnoChange = (e) => setAccno(e.target.value);
  const ifscChange = (e) => setIfsc(e.target.value);
  const hnameChange = (e) => setHname(e.target.value);
  const upiChange = (e) => setUpi(e.target.value);
  const upiNameChange = (e) => setUpiName(e.target.value);
  const upiPhoneNumberChange = (e) => setUpiPhoneNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      bankName: bname,
      accountNumber: accno,
      ifscCode: ifsc,
      accountHolderName: hname,
      upiId: upi,
      upiAppName: upiName,
      upiNumber: upiPhoneNumber,
    };

    AccountService.addBank(data, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        setRefresh((prev) => !prev);
        resetForm();
        // Hide the modal manually since data-bs-dismiss does not work with async
        document.querySelector("#innerbnk .btn-close").click();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="innerbnk"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Please Provide The Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="d-flex flex-column modal-body gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name of Bank *"
                onChange={bnameChange}
                value={bname}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Acc No. *"
                onChange={accnoChange}
                value={accno}
              />
              <input
                type="text"
                className="form-control"
                placeholder="IFSC CODE "
                onChange={ifscChange}
                value={ifsc}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Name of the Acc. Holder "
                onChange={hnameChange}
                value={hname}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI ID "
                onChange={upiChange}
                value={upi}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI App Name "
                onChange={upiNameChange}
                value={upiName}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI Phone Number "
                onChange={upiPhoneNumberChange}
                value={upiPhoneNumber}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add Bank
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerBank;
