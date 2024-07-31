import React, { useState } from "react";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";

const UserResetPass = ({ UserName }) => {
  const auth = useAuth();
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const handleResetpassword = (e) => {
    e.preventDefault();

    if (password !== Cpassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      userName: UserName,
      password: Cpassword,
    };

    AccountService.UserResetPassword(data, auth.user)
      .then((res) => {
        if (res.status === 200) {
          alert("Password reset successful!");
          window.location.reload();
        } else {
          alert("Failed to reset password");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while resetting the password");
      });
  };

  return (
    <div>
      
      <div className="modal fade"
        id="modalreset"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="#modalresetpassword"
        aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered " role="document">
      <div  className="modal-content" style={{ backgroundColor: "#4682b4" }}>
      <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalLabel">
                RESET PASSWORD
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
        <input
          type="text"
          className="form-control mb-1"
          value={UserName}
          disabled
        />
        <input
          type="password"
          className="form-control mb-1"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password *"
          value={Cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
       
      </div>
<div className="modal-footer">
      <button
          type="button"
          className="btn btn-dark"
          onClick={handleResetpassword}
        >
          Reset
        </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserResetPass;
