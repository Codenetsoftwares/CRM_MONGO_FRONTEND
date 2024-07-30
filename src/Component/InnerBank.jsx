import React, { useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";

const InnerBank = ({ setRefresh }) => {
  const [bname, setBname] = useState("");
  const [accno, setAccno] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [hname, setHname] = useState("");
  const [upi, setUpi] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiPhoneNumber, setUpiPhoneNumber] = useState("");
  // const [selectedBank, setSelectedBank] = useState(null);

  const auth = useAuth();
  // console.log("This is Auth==>>>", auth);
  // console.log("getbank", getbankName);
  const bnamechnage = (e) => {
    setBname(e.target.value);
  };
  const accnochnage = (e) => {
    setAccno(e.target.value);
  };
  const ifscchnage = (e) => {
    setIfsc(e.target.value);
  };
  const hnamechnage = (e) => {
    setHname(e.target.value);
  };
  const hUpichnage = (e) => {
    setUpi(e.target.value);
  };
  const hupiNamechnage = (e) => {
    setUpiName(e.target.value);
  };
  const hUpiNumberchnage = (e) => {
    setUpiPhoneNumber(e.target.value);
  };

  // const handleShowDetails = (bank) => {
  //   setSelectedBank(bank);
  // };

  const handelsubmit = (e) => {
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
        console.log("bank", response.data);
        toast.success(response.data.message);
        // Update refresh state in AdminBank
        setRefresh((prev) => !prev); // Trigger a state change
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
        id="innerbnk"
        tabindex="-1"
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
                aria-describedby="addon-wrapping"
                onChange={bnamechnage}
                // value={selectedBank.bankName}
                // readOnly
              />
              <input
                type="text"
                className="form-control"
                placeholder="Acc No. *"
                aria-describedby="addon-wrapping"
                onChange={accnochnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="IFSC CODE "
                aria-describedby="addon-wrapping"
                onChange={ifscchnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Name of the Acc. Holder "
                aria-describedby="addon-wrapping"
                onChange={hnamechnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI ID "
                aria-describedby="addon-wrapping"
                onChange={hUpichnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI App Name "
                aria-describedby="addon-wrapping"
                onChange={hupiNamechnage}
              />
              <input
                type="text"
                className="form-control"
                placeholder="UPI Phone Number "
                aria-describedby="addon-wrapping"
                onChange={hUpiNumberchnage}
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
                onClick={handelsubmit}
              >
                Add Bank
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <ul>
        {getbankName.map((bank, index) => (
          <li key={index}>
            {bank.bankName}
            <button onClick={() => handleShowDetails(bank)}>Show Details</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default InnerBank;
