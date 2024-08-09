import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";

const AssignedBank = ({ ID }) => {
  console.log('=====>>> username', ID )
  const [BankNames, setBankNames] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    AccountService.subadminassigneedbankview(ID, auth.user)
      .then((res) =>
        //   console.log(res.data)
        setBankNames(res.data)
      )
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [ID, auth]);

  const handelsave = () => {
    console.log("=>>>>", BankNames);
  };

  return (
    <div
      class="modal fade"
      id="AssignedBank"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Assigned Bank to this SubAdmin
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
          <div class="modal-body">
            {BankNames.length > 0 ? (
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Bank Name</th>
                  </tr>
                </thead>
                <tbody>
                  {BankNames.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.bankName}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={handelsave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedBank;
