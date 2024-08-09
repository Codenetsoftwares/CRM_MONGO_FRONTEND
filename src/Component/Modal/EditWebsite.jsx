import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const EditWebsite = ({ ID, webName }) => {
  const auth = useAuth();

  const [Name, SetName] = useState("");

  const resetForm = () => {
    console.log("first");
    SetName("");
  };

  const handelSubmit = () => {
    const data = { websiteName: Name };
    console.log(ID);
    AccountService.EditWebsite(data, ID, auth.user)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editwebsite"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide New Name
              </h5>

              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Present Name </small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    value={webName}
                    disabled
                    style={{ fontSize: "15px" }}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Edit By</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold"
                    value={auth.user.userName}
                    disabled
                    style={{ fontSize: "10px" }}
                  />
                </div>

                <input
                  type="text"
                  className="form-control"
                  placeholder="New Website Name"
                  value={Name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={resetForm}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelSubmit}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWebsite;
