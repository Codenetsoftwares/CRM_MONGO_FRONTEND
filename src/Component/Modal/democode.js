import React from "react";

const UserBank = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="modalbank"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalbankedit"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
            <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalLabel">
                BANK VIEW & EDIT
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="bankName" className="form-label">
                      Bank Name:
                    </label>
                    <input type="text" id="bankName" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="accountNumber" className="form-label">
                      Account Number:
                    </label>
                    <input type="text" id="accountNumber" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="ifscCode" className="form-label">
                      IFSC Code:
                    </label>
                    <input type="text" id="ifscCode" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="accountHolderName" className="form-label">
                      Account Holder Name:
                    </label>
                    <input type="text" id="accountHolderName" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="upiApp" className="form-label">
                      UPI Application:
                    </label>
                    <input type="text" id="upiApp" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="upiId" className="form-label">
                      UPI ID:
                    </label>
                    <input type="text" id="upiId" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="upiNumber" className="form-label">
                      UPI Number:
                    </label>
                    <input type="text" id="upiNumber" className="form-control" />
                  </div>
                </div>
              </div>
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


// {/* <div>
// <div
//   className="modal fade"
//   id="modalbank"
//   tabIndex="-1"
//   role="dialog"
//   aria-labelledby="#modalbank"
//   aria-hidden="true"
// >
//   <div className="modal-dialog modal-dialog-centered" role="document">
//     <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
//       <div className="modal-header">
//         <h5 className="modal-title text-white" id="exampleModalLabel">
//           BANK VIEW & EDIT
//         </h5>

//         <button
//           type="button"
//           className="close"
//           data-dismiss="modal1"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//         <div className="modal-body">
//           <div className="row">
//             <div className="col-md-6">
//               <div className="form-group">
//                 <label htmlFor="bankName" className="form-label">
//                   Bank Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="bankName"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail.bankName
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail.bankName
//                   // }
//                   // disabled={!isEditing}
//                 />
             
//               <div className="col-md-6">
           
//                 <label htmlFor="accountNumber" className="form-label">
//                   Account Number:
//                 </label>
//                 <input
//                   type="text"
//                   id="accountNumber"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail
//                   //         .accountNumber
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail
//                   //         .accountNumber
//                   // }
//                   // disabled={!isEditing}
//                 />
            
              
//             </div>
//             <div className="col-md-6">
//               <div className="form-group">
//                 <label htmlFor="ifscCode" className="form-label">
//                   IFSC Code:
//                 </label>
//                 <input
//                   type="text"
//                   id="ifscCode"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail.ifscCode // Check if ifscCode exists in editedData.bankDetail
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail.ifscCode
//                   // }
//                   // disabled={!isEditing}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="accountHolderName" className="form-label">
//                   Account Holder Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="accountHolderName"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail
//                   //         .accountHolderName // Check if accountHolderName exists in editedData.bankDetail
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail
//                   //         .accountHolderName
//                   // }
//                   // disabled={!isEditing}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="Upi" className="form-label">
//                   UPI Application:
//                 </label>
//                 <input
//                   type="text"
//                   id="upiApp"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail.upiApp
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail.upiApp
//                   // }
//                   // disabled={!isEditing}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="Upi" className="form-label">
//                   UPI ID:
//                 </label>
//                 <input
//                   type="text"
//                   id="upiId"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail.upiId
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail.upiId
//                   // }
//                   // disabled={!isEditing}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="Upi" className="form-label">
//                   UPI Number:
//                 </label>
//                 <input
//                   type="text"
//                   id="upiNumber"
//                   className="form-control"
//                   // value={
//                   //   isEditing
//                   //     ? editedData.bankDetail &&
//                   //       editedData.bankDetail.upiNumber
//                   //     : foundObject.bankDetail &&
//                   //       foundObject.bankDetail.upiNumber
//                   // }
//                   // disabled={!isEditing}
//                 />
//                  </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>

//         <div className="modal-footer">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             data-dismiss="modal"
//           >
//             CLOSE
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div> */}
  );
};

export default UserBank;
