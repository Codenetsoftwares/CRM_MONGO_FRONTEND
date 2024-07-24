import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import AccountService from "../../Services/AccountService";

const EditTransaction = ({ id }) => {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [data, setData] = useState([]);
  const [bank, setBank] = useState([]);
  const [website, setWebsite] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  useEffect(() => {
    TransactionSercvice.getAccountSummary(auth.user).then(
      (res) => {
        const userWithId = res.data.data.find((user) => user._id === id);
        setData(userWithId);
      }
    );
  }, [id]);

  useEffect(() => {
    AccountService.getbank(auth.user).then((res) => setBank(res.data));
  }, [auth]);

  useEffect(() => {
    AccountService.website(auth.user).then((res) => setWebsite(res.data));
  }, [auth]);

  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };
  const handleClose = () => {
    setIsEditing(false);
  }
  const handleSubmit = (e, transactionType, field) => {
    e.preventDefault();

    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });

    const data1 = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      amount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.bankName,
      websiteName: editedData.websiteName,

    };
    const dataWithdraw = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      withdrawAmount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.bankName,
      websiteName: editedData.websiteName,
    };

    const dataDeposit = {
      transactionID: editedData.transactionID,
      transactionType: editedData.transactionType,
      depositAmount: editedData.amount,
      paymentMethod: editedData.paymentMethod,
      userId: editedData.userId,
      subAdminId: editedData.subAdminName,
      bankName: editedData.bankName,
      websiteName: editedData.websiteName,
    };

    switch (transactionType) {
      case "Deposit":
        TransactionSercvice.editTransactionData(id, data1, auth.user)
          .then((res) => {
            alert(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;
      case "Withdraw":
        TransactionSercvice.editTransactionData(id, data1, auth.user)
          .then((res) => {
            alert(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;

      case "Manual-Bank-Withdraw":
        TransactionSercvice.editBnkTransactionData(
          id,
          dataWithdraw,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;

      case "Manual-Bank-Deposit":
        TransactionSercvice.editBnkTransactionData(
          id,
          dataDeposit,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;

      case "Manual-Website-Withdraw":
        TransactionSercvice.editWebTransactionData(
          id,
          dataWithdraw,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
        break;

      case "Manual-Website-Deposit":
        TransactionSercvice.editWebTransactionData(
          id,
          dataDeposit,
          auth.user
        )
          .then((res) => {
            alert(res.data);
            // window.location.reload();
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
                {data && (<div>
                  {data.amount && <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Amount"
                    name="amount"
                    value={isEditing
                      ? editedData.amount
                      : data.amount}
                    onChange={handleChange}
                  />}
                  {data.depositAmount && <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Amount"
                    name="amount"
                    value={isEditing
                      ? editedData.amount
                      : data.depositAmount}
                    onChange={handleChange}
                  />}
                  {data.withdrawAmount && <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Amount"
                    name="amount"
                    value={isEditing
                      ? editedData.amount
                      : data.withdrawAmount}
                    onChange={handleChange}
                  />}

                  {/* <input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={isEditing
                      ? editedData.bankName
                      : data.bankName ? data.bankName : "N.A"}
                    onChange={handleChange}
                    name="bankName"
                  /> */}
                  {isEditing ? (<>{data.bankName ? <select
                    className="form-control"
                    name="bankName"
                    value={editedData.bankName}
                    required
                    onChange={handleChange}
                  >
                    <option selected>Select Bank</option>
                    {bank.map((bank, i) => {
                      return (
                        <option value={bank.bankName} key={i}>{bank.bankName}</option>
                      );
                    })}
                  </select> : <input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={data.bankName ? data.bankName : "N.A"}
                    onChange={handleChange}
                    name="bankName"
                  />}</>) : (<input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={data.bankName ? data.bankName : "N.A"}
                    onChange={handleChange}
                    name="bankName"
                  />)}
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="paymentMethod"
                    value={isEditing
                      ? editedData.paymentMethod
                      : data.paymentMethod ? data.paymentMethod : 'N.A'}
                    onChange={handleChange}
                    name="paymentMethod"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="subAdminName"
                    value={isEditing
                      ? editedData.subAdminName
                      : data.subAdminName ? data.subAdminName : "N.A"}
                    onChange={handleChange}
                    name="subAdminName"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionID"
                    value={isEditing
                      ? editedData.transactionID
                      : data.transactionID ? data.transactionID : 'N.A'}
                    onChange={handleChange}
                    name="transactionID"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="transactionType"
                    value={data.transactionType ? data.transactionType : "N.A"}
                    onChange={handleChange}
                    name="transactionType"
                  />
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="websiteName"
                    value={isEditing
                      ? editedData.websiteName
                      : data.websiteName ? data.websiteName : "N.A"}
                    name="websiteName"
                  /> */}
                  {isEditing ? (

                    <>{data.websiteName ? <select
                      className="form-control"
                      name="websiteName"
                      value={editedData.website}
                      required
                      onChange={handleChange}
                    >
                      <option selected>Select Website</option>
                      {website.map((website, i) => {
                        return (
                          <option key={i} value={website.websiteName}>{website.websiteName}</option>
                        );
                      })}
                    </select> : <input
                      type="text"
                      className="form-control mb-1 "
                      placeholder="bankName"
                      value={data.websiteName ? data.websiteName : "N.A"}
                      onChange={handleChange}
                      name="websiteName"
                    />}</>
                  ) : (<input
                    type="text"
                    className="form-control mb-1 "
                    placeholder="bankName"
                    value={data.websiteName ? data.websiteName : "N.A"}
                    onChange={handleChange}
                    name="websiteName"
                  />)}
                </div>)}
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

export default EditTransaction;
