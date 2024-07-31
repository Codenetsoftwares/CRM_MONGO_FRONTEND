import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import EditTransaction from "./Modal/EditTransaction";
import Pagination from "./Pagination";
import SingleCard from "../common/singleCard";

const TableMainTransaction = ({
  FilterData,
  purpose,
  page,
  handlePage,
  totalPage,
  totalData,
}) => {
  console.log("totalData", totalData);
  const auth = useAuth();

  const [id, setId] = useState("");
  const [pge, setPge] = useState(1);

  const handleId = (e, id) => {
    e.preventDefault();
    setId(id);
  };

  const handleDelete = (e, id, transactionType) => {
    e.preventDefault();
    console.log(transactionType);
    let confirm = window.confirm("Are You Sure You Want to Delete This Transaction");
    if (confirm) {
      switch (transactionType) {
        case "Deposit":
          AccountService.SaveTransaction({ requestId: id }, auth.user)

            .then((res) => {
              console.log(res.data);
              toast.success("Transaction delete request sent to Super Admin");
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        case "Withdraw":
          AccountService.SaveTransaction({ requestId: id }, auth.user)

            .then((res) => {
              console.log(res.data);
              toast.success("Transaction delete request sent to Super Admin");
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        case "Manual-Bank-Deposit":
          AccountService.SaveBankTransaction({ requestId: id }, auth.user)

            .then((res) => {
              console.log(res.data);
              toast.success(
                "Bank Transaction delete request sent to Super Admin"
              );
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        case "Manual-Bank-Withdraw":
          AccountService.SaveBankTransaction({ requestId: id }, auth.user)

            .then((res) => {
              console.log(res.data);
              toast.success(
                "Bank Transaction delete request sent to Super Admin"
              );
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        case "Manual-Website-Deposit":
          AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
            .then((res) => {
              console.log(res.data);
              toast.success(
                "Website Transaction delete request sent to Super Admin"
              );
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        case "Manual-Website-Withdraw":
          AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
            .then((res) => {
              console.log(res.data);
              toast.success(
                "Website Transaction delete request sent to Super Admin"
              );
            })
            .catch((err) => {
              toast.error(err.response.data?.message);
            });
          break;

        default:
      }
    }
  };
  console.log(FilterData);
  return (
    <SingleCard className="card card-body rounded-8px">
      <SingleCard className="container-fluid w-90">
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="table table-striped table-bordered table-hover">
            <thead
              className="table-success"
              style={{ position: "sticky", top: 0, zIndex: 1 }}
            >
              <tr align="center" bgcolor="green" className="fs-6">
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Bonus
                </th>{" "}
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Bank Charges
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Txn Id
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Txn Type
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Gateway
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Entry by
                </th>
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  User Name
                </th>
                {purpose === "mainStatement" && (
                  <>
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Intro Name
                    </th>
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Bank
                    </th>
                    <th
                      scope="col"
                      className="text-info"
                      style={{ backgroundColor: "#e6f7ff" }}
                    >
                      Website
                    </th>
                  </>
                )}
                {purpose === "bankStatement" && (
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Balance
                  </th>
                )}
                {purpose === "websiteStatement" && (
                  <th
                    scope="col"
                    className="text-info"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    Balance
                  </th>
                )}
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Remarks
                </th>
                {/* <th scope="col text-break" className="text-primary">
                            Edit
                        </th> */}
                <th
                  scope="col"
                  className="text-info"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            {/* </div> */}
            <tbody>
              {FilterData?.length > 0 ? (
                FilterData?.map((data, i) => {
                  return (
                    <tr align="center" className="fs-6">
                      <td>
                        {" "}
                        {new Date(data?.createdAt).toLocaleString(
                          "default"
                        )}{" "}
                      </td>
                      <td>
                        {data?.amount && (
                          <p className="col fs-6">{data?.amount}</p>
                        )}
                        {data?.depositAmount && (
                          <p className="col fs-6">{data?.depositAmount}</p>
                        )}
                        {data?.withdrawAmount && (
                          <p className="col fs-6">{data?.withdrawAmount}</p>
                        )}
                      </td>
                      <td>
                        {data?.bonus ? (
                          <p className="col fs-6">{data?.bonus}</p>
                        ) : (
                          <p className="col fs-6">N.A</p>
                        )}
                      </td>
                      <td>
                        {data?.bankCharges ? (
                          <p className="col fs-6">{data?.bankCharges}</p>
                        ) : (
                          <p className="col fs-6">N.A</p>
                        )}
                      </td>
                      <td>
                        {data?.transactionID && (
                          <p className="col fs-6 ">{data?.transactionID}</p>
                        )}
                        {data?.depositAmount && (
                          <p className="col fs-6 ">N.A</p>
                        )}
                        {data?.withdrawAmount && (
                          <p className="col fs-6 ">N.A</p>
                        )}
                      </td>
                      <td>
                        {data?.transactionType && (
                          <p className="col fs-6 text-break">
                            {data?.transactionType}
                          </p>
                        )}
                      </td>
                      <td>
                        {data?.paymentMethod && (
                          <p className="col fs-6">{data?.paymentMethod}</p>
                        )}
                        {data?.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data?.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>{data?.subAdminName}</td>
                      <td>
                        {data?.paymentMethod && (
                          <p className="col fs-6">{data?.userName}</p>
                        )}
                        {data?.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data?.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>

                      {/* when props pass mainStatement from parent component*/}
                      {purpose === "mainStatement" && (
                        <>
                          <td>
                            {data?.paymentMethod && (
                              <p className="col fs-6">
                                {data?.introducerUserName}
                              </p>
                            )}
                            {data?.depositAmount && (
                              <p className="col fs-6 text-break">N.A</p>
                            )}
                            {data?.withdrawAmount && (
                              <p className="col fs-6 text-break">N.A</p>
                            )}
                          </td>
                          <td>
                            <p className="col fs-6">
                              {data?.bankName ? data?.bankName : "N.A"}
                            </p>
                          </td>
                          <td>
                            <p className="col fs-6">
                              {data?.websiteName ? data?.websiteName : "N.A"}
                            </p>
                          </td>
                        </>
                      )}
                      {/* when props pass mainStatement from parent component*/}
                      {purpose === "bankStatement" && (
                        <td>{data.balance ? data.balance : "N .A"}</td>
                      )}
                      {purpose === "websiteStatement" && (
                        <td>{data.balance ? data.balance : "N .A"}</td>
                      )}
                      <td>{data?.remarks}</td>
                      {/* <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edittransaction"
                                            onClick={(e) => {
                                                console.log("id===>", data?._id);
                                                handleId(e, data?._id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td> */}
                      <td>
                        <button type="button" className="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={(e) => {
                              handleDelete(e, data?._id, data?.transactionType);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="14" className="text-center fs-4">
                    No Transaction Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SingleCard>
      {FilterData?.length > 0 ? (
        <Pagination
          handlePage={handlePage}
          page={page}
          totalPage={totalPage}
          totalData={totalData}
          perPagePagination={10}
        />
      ) : null}
      <EditTransaction id={id} />
    </SingleCard>
  );
};

export default TableMainTransaction;
