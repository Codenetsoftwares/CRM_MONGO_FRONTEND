import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../Utils/Auth';
import AccountService from '../Services/AccountService';
import { toast } from 'react-toastify';
import EditTransaction from './Modal/EditTransaction';
import Pagination from './Pagination';

const TableMainTransaction = ({ FilterData, purpose, page, handlePage, totalPage, totalData }) => {
    console.log('totalData', totalData)
    const auth = useAuth();

    const [id, setId] = useState("");
    const [pge, setPge] = useState(1);

    const handleId = (e, id) => {
        e.preventDefault()
        setId(id)
    }

    const handleDelete = (e, id, transactionType) => {
        e.preventDefault();
        console.log(transactionType);
        switch (transactionType) {
            case "Deposit":
                AccountService.SaveTransaction({ requestId: id }, auth.user)

                    .then((res) => {
                        console.log(res.data);
                        toast.success("Transaction delete request sent to Super Admin");
                    })
                    .catch((err) => {
                        toast.error(err.response.data?.message)
                    });
                break;

            case "Withdraw":
                AccountService.SaveTransaction({ requestId: id }, auth.user)

                    .then((res) => {
                        console.log(res.data);
                        toast.success("Transaction delete request sent to Super Admin");
                    })
                    .catch((err) => {
                        toast.error(err.response.data?.message)
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
                        toast.error(err.response.data?.message)
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
                        toast.error(err.response.data?.message)
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
                        toast.error(err.response.data?.message)
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
                        toast.error(err.response.data?.message)
                    });
                break;

            default:
        }
    };
    console.log(FilterData)
    return (
        <div>
            <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto ">
                <thead className="table-success">
                    <tr align="center" bgcolor="green" className="fs-6">
                        <th scope="col fs-6" className="text-primary">
                            Date & Time
                        </th>
                        <th scope="col text-break fs-6" className="text-primary">
                            Amount
                        </th>
                        <th scope="col text-break fs-6" className="text-primary">
                            Bonus
                        </th> <th scope="col text-break fs-6" className="text-primary">
                            Bank Charges
                        </th>
                        <th scope="col text-break fs-6" className="text-primary">
                            Txn Id
                        </th>
                        <th scope="col text-break fs-6" className="text-primary">
                            Txn Type
                        </th>
                        <th scope="col fs-6" className="text-primary">
                            Gateway
                        </th>
                        <th scope="col fs-6" className="text-primary">
                            Entry by
                        </th>
                        <th scope="col fs-6" className="text-primary">
                            User Name
                        </th>
                        {purpose === "mainStatement" && (
                            <>
                                <th scope="col fs-6" className="text-primary">
                                    Intro Name
                                </th>
                                <th scope="col" className="text-primary">
                                    Bank
                                </th>
                                <th scope="col" className="text-primary">
                                    Website
                                </th>
                            </>
                        )}

                        {purpose === "bankStatement" && (

                            <th scope="col text-break fs-6" className="text-primary">
                                Balance
                            </th>
                        )}
                        {purpose === "websiteStatement" && (

                            <th scope="col text-break fs-6" className="text-primary">
                                Balance
                            </th>
                        )}

                        <th scope="col text-break" className="text-primary">
                            Remarks
                        </th>



                        {/* <th scope="col text-break" className="text-primary">
                            Edit
                        </th> */}
                        <th scope="col text-break" className="text-primary">
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
                                        {new Date(data?.createdAt).toLocaleString("default")}{" "}
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
                                        ) : <p className="col fs-6">N.A</p>}
                                    </td>
                                    <td>
                                        {data?.bankCharges ? (
                                            <p className="col fs-6">{data?.bankCharges}</p>
                                        ) : <p className="col fs-6">N.A</p>}
                                    </td>
                                    <td>
                                        {data?.transactionID && (
                                            <p className="col fs-6 ">{data?.transactionID}</p>
                                        )}
                                        {data?.depositAmount && <p className="col fs-6 ">N.A</p>}
                                        {data?.withdrawAmount && <p className="col fs-6 ">N.A</p>}
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

                                        <td>
                                            {data.balance
                                                ? data.balance
                                                : "N .A"}
                                        </td>
                                    )}
                                    {purpose === "websiteStatement" && (

                                        <td>
                                            {data.balance
                                                ? data.balance
                                                : "N .A"}
                                        </td>
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
                                                    handleDelete(
                                                        e,
                                                        data?._id,
                                                        data?.transactionType
                                                    );
                                                }}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <h1 className="text-center">No Transaction Found</h1>
                    )}
                </tbody>
            </table>
            {FilterData?.length > 0 ? (
                // <div className="text-center">
                //   {/* <nav aria-label="...">
                //     <ul class="pagination d-flex justify-content-center">
                //       <li class="page-item disabled">
                //         <a
                //           className={`page-link btn-primary ${
                //             page === 1 ? "disabled" : ""
                //           }`}
                //           onClick={() => {
                //             page > 1 && handlePage(page - 1);
                //           }}
                //         >
                //           Pre
                //         </a>
                //       </li>
                //       <li class="page-item">
                //         <a class="page-link">{page}</a>
                //       </li>
                //       <li class="page-item">
                //         <a
                //           className={`page-link ${
                //             page === totalPage ? "disabled" : ""
                //           }`}
                //           onClick={() => {
                //             handlePage(page + 1);
                //           }}
                //         >
                //           Next
                //         </a>
                //       </li>
                //     </ul>
                //   </nav> */}

                //   <span className={`m-3 `}>
                //     <button
                //       className={`btn btn-primary rounded-pill ${
                //         page === 1 ? "disabled" : ""
                //       }`}
                //       onClick={() => {
                //         page > 1 && handlePage(page - 1);
                //       }}
                //     >
                //       Pre
                //     </button>
                //   </span>
                //   <span className="fs-4">{page}</span>
                //   <span className={`m-3 `}>
                //     <button
                //       className={`btn btn-primary rounded-pill ${
                //         page === totalPage ? "disabled" : ""
                //       }`}
                //       onClick={() => {
                //         handlePage(page + 1);
                //       }}
                //     >
                //       Next
                //     </button>
                //   </span>

                //   {/* jump to: */}
                //   {/* <input type='number' className='m-1' width={8} onChange={(e) => { setPge(e.target.value) }} />
                //           <button type="button" class="btn btn-primary" onClick={handlePage(pge)}>Go</button> */}
                // </div>
                <Pagination handlePage={handlePage} page={page} totalPage={totalPage} totalData={totalData} perPagePagination={10} />
            ) : null}
            <EditTransaction id={id} />
        </div>
    );
};

export default TableMainTransaction;