import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { errorHandler } from "../../Utils/helper";

const EditIntroducerTransaction = ({
  id,
  amount,
  remarks,
  transactionType,
}) => {
  console.log(id);
  const auth = useAuth();
  console.log(id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  useEffect(() => {
    setData({
      amount: amount,
      remarks: remarks,
      transactionType: transactionType,
    });
  }, [id]);
  console.log("===>", data);
  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };
  const handleClose = () => {
    setIsEditing(false);
  };
  const handleSubmit = (e, transactionType, field) => {
    e.preventDefault();
    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });

    const data1 = {
      amount: editedData.amount,
      remarks: editedData.remarks,
      transactionType: transactionType,
    };
    console.log(transactionType);
    switch (transactionType) {
      case "Deposit":
        TransactionSercvice.editIntroducerTransactionData(id, data1, auth.user)
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
           errorHandler(err.message, "Something went wrong");
          });
        break;
      case "Withdraw":
        TransactionSercvice.editIntroducerTransactionData(id, data1, auth.user)
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;

      default:
      // code block
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="edittransaction"
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <small>Edit By</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control font-weight-bold fs-6"
                    disabled
                    value={auth.user.userName}
                    style={{ fontSize: "10px" }}
                  />
                </div>
                {data && (
                  <div>
                    {data.amount && (
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Amount"
                        name="amount"
                        value={isEditing ? editedData.amount : data.amount}
                        onChange={handleChange}
                      />
                    )}
                    {data.remarks && (
                      <input
                        type="text"
                        className="form-control mb-1 "
                        placeholder="Remark"
                        name="remarks"
                        value={
                          isEditing
                            ? editedData.remarks
                            : data.remarks
                            ? data.remarks
                            : "N.A"
                        }
                        onChange={handleChange}
                      />
                    )}
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              {isEditing ? (
                <button
                  className="btn btn-success mx-1"
                  data-bs-dismiss="modal"
                  onClick={(e) => handleSubmit(e, data.transactionType)}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-info mx-1"
                    onClick={handleToggleEdit}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIntroducerTransaction;
