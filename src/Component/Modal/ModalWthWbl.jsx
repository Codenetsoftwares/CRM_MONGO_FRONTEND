import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullScreenLoader from "../FullScreenLoader";

const ModalWthWbl = ({ ID }) => {
  const auth = useAuth();
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handelamtchange = (e) => {
    SetAmount(e.target.value);
  };

  const handelRemarkschange = (e) => {
    SetRemarks(e.target.value);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    if (Amount === 0 || Remarks === "" || Amount < 0) {
      if (Amount < 0) {
        toast.error("Amount can not be negetive");
        return;
      }
      toast.error("Amount and Remarks fields cannot be empty.");
      return;
    }
    setIsLoading(true);
    const data = {
      amount: Number(Amount),
      transactionType: "Manual-Website-Withdraw",
      remarks: Remarks,
    };

    console.log(ID);
    AccountService.ManualWebsiteEntryWithdraw(ID, data, auth.user)
      .then((res) => {
        // console.log(response.data);
        setIsLoading(false);
        if (res.status === 200) {
          alert(res.data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.response.data.message);
        // alert.error("e.message");
      });
  };

  return (
    <div>
      <FullScreenLoader show={isLoading} />
      <div
        className="modal fade"
        id="modalWithdrawBlwebsite"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide Website Withdrawal Amount
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Transaction By:</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    placeholder="SubAdmin"
                    value={auth.user.userName}
                    disabled
                    style={{ fontSize: "8px" }}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount *"
                    onChange={handelamtchange}
                    value={Amount}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Remarks *"
                  onChange={handelRemarkschange}
                  value={Remarks}
                  required
                />
              </form>
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
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWthWbl;
