import React, { useEffect, useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";

const LiveBalanceIntroducer = ({ ID }) => {
  const auth = useAuth();
  const [LiveBalance, SetLiveBalance] = useState(0);

  useEffect(() => {
    AccountService.introducerLiveBalance(ID, auth.user)
      .then((res) => {
        // console.log("res", res.data.LiveBalance);
        SetLiveBalance(res.data.LiveBalance);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        SetLiveBalance(0);
      });
  }, [auth.user, ID]);
  console.log("Blance", LiveBalance);
  return (
    <div>
      <div
        class="modal fade"
        id="LiveBalance"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button" 
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p className="text-muted">
                Profit :{" "}
                {LiveBalance > 0 ? (
                  <blink>
                    {" "}
                    <b className="blink_me" style={{ color: "green" }}>
                      {LiveBalance}
                    </b>
                  </blink>
                ) : (
                  <b className="blink_me" style={{ color: "red" }}>
                    <blink>{LiveBalance}</blink>
                  </b>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBalanceIntroducer;
