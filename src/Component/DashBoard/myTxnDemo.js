/* eslint-disable no-lone-blocks */
// eslint-disable-next-line no-unused-expressions
{toggle ? (
    <div className="container-fluid">
      {/* Table View */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="bg-light-blue text-dark">
            <tr align="center" className="fs-6">
              <th scope="col" className="text-primary">Date & Time</th>
              <th scope="col" className="text-primary">Amount</th>
              <th scope="col" className="text-primary">Txn Id</th>
              <th scope="col" className="text-primary">Txn Type</th>
              <th scope="col" className="text-primary">Gateway</th>
              <th scope="col" className="text-primary">Entry by</th>
              <th scope="col" className="text-primary">User Name</th>
              <th scope="col" className="text-primary">Bank</th>
              <th scope="col" className="text-primary">Website</th>
              <th scope="col" className="text-primary">Remarks</th>
              <th scope="col" className="text-primary">Delete</th>
            </tr>
          </thead>
          <tbody>
            {documentView.length > 0 ? (
              <>
                {documentView
                  .slice(page * 10 - 10, page * 10)
                  .map((data, index) => (
                    <tr key={index} className="fs-6">
                      <td className="text-center">
                        {new Date(data.createdAt).toLocaleString("default")}
                      </td>
                      <td className={`text-center ${data.transactionType.includes("Withdraw") ? "text-danger" : ""}`}>
                        {data.amount || data.depositAmount || data.withdrawAmount || "N.A"}
                      </td>
                      <td className="text-center">
                        {data.transactionID || "N.A"}
                      </td>
                      <td className={`text-center ${data.transactionType.includes("Withdraw") ? "text-danger" : ""}`}>
                        {data.transactionType || "N.A"}
                      </td>
                      <td className="text-center">
                        {data.paymentMethod || "N.A"}
                      </td>
                      <td className="text-center">{data.subAdminName || "N.A"}</td>
                      <td className="text-center">
                        {data.userName || "N.A"}
                      </td>
                      <td className="text-center">
                        {data.bankName || "N.A"}
                      </td>
                      <td className="text-center">
                        {data.websiteName || "N.A"}
                      </td>
                      <td className="text-center">
                        {data.remarks || "N.A"}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={(e) => handleDelete(e, data._id, data.transactionType)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4">No Transaction Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {documentView.length > 0 && (
        <Pagination
          handlePage={selectPageHandler}
          page={page}
          totalPage={lastPage}
          totalData={documentView.length}
          perPagePagination={10}
        />
      )}
    </div>
  ) : null}
  