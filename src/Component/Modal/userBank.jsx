import React, { useState } from "react";
import SingleCard from "../../common/singleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const UserBank = () => {
    const [users, setUsers] = useState([]);


    
  return (
    <div>
      <div
        className="modal fade"
        id="modalbank"
        tabIndex="-1"
        role="dialog"
        aria-pledby="modalbankedit"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
            <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalp">
                BANK VIEW & EDIT
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-p="Close"
              ></button>
            </div>
            <div className="modal-body">
              <SingleCard
                style={{
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.8))",
                }}
              >
                <div className="row align items centre">
                  <div class="col-sm-3 text-truncate">
                    <p class="mb-0">Bank Name:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> hdfc</p>
                  </div>

                  <div className="col-sm-2 ">
                    
                          {/* <FontAwesomeIcon  icon={faEdit} style={{ marginLeft: 'auto' }}/> */}
                    
                        </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p class="mb-0">Account Number:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> 123456778990988</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p className="mb-0">IFSC Code:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> HDF56778990988</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p className="mb-0">Account Holder Name:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> Mr. Amit paul</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p className="mb-0">UPI Application:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> GOOGLE PAY</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p className="mb-0">UPI ID:</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> GTIB5678907654</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3 text-nowrap">
                    <p htmlFor="upiNumber" className="mb-0">
                      UPI Number:
                    </p>
                  </div>

                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> 9874563217</p>
                  </div>
                </div>
              </SingleCard>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBank;
