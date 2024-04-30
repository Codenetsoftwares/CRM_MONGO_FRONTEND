import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import TransactionSercvice from "../../Services/TransactionSercvice";
import FullScreenLoader from "../FullScreenLoader";

const IntroducerDepositTransaction = ({ IntroducerName }) => {
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

  const handleSubmit = () => {
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
      transactionType: "Deposit",
      remarks: Remarks,
      introducerUserName: IntroducerName,
    };
    TransactionSercvice.IntroducerDepositTransaction(data, auth.user)
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
        console.log(error);
        // alert.error("e.message");
      });
  };

  return (
    <div>
      <FullScreenLoader show={isLoading} />
      <div
        class="modal fade"
        id="depositModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Introducer Deposit Transaction
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
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
                    style={{ fontSize: "10px" }}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    onChange={handelamtchange}
                    // min={0}
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducerDepositTransaction;
