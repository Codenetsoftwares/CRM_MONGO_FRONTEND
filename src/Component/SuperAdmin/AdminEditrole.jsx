import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../Utils/Auth';
import AccountService from '../../Services/AccountService';
import { toast } from 'react-toastify';
import SubAdResetPassword from "../Modal/SubAdResetPassword";
import AssignedBank from '../Modal/AssignedBank';
import AssignedWebsite from '../Modal/AssignedWebsite';

const AdminEditrole = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [username, setUsername] = useState([]);
console.log('====>>> admin data',adminData)

  const setData = () => {
    setCheckedItems(adminData.roles);
  };
  const handleResetPassword = (e, username) => {
    setUsername(username)
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };
  console.log(checkedItems)
  useEffect(() => {
    AccountService.getSingleAdmin(
      id,
      auth.user
    ).then((res) => {
      console.log(res.data);
      setAdminData(res.data);
    });
  }, []);
  console.log("Data =>>>>", adminData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(checkedItems)
    AccountService.updateSingleAdminPermission(id, { roles: checkedItems }, auth.user)
      .then((res) => {
        console.log(res);
        toast.success("update successfully");
        navigate("/adminlist", { replace: false });

      })
      .catch((err) => {
        if (err.response.data) {
          toast.error(err.response.data.message);

        }
      });

  };


  const handleUpdate = () => {
    setDisplayEdit(true);
    setData();
  };
  const rolesArray = adminData.roles || [];


  return (
    <>
      {displayEdit === false ? (
        <div>
          <div className="card">
            <h5 className="card-header">Sub Admin Data</h5>
            <div className="card-body">
              <h5 className="card-title">Name</h5>
              <p className="card-text">
                {adminData.firstname} {adminData.lastname}
              </p>
              <h5 className="card-title">User Name</h5>
              <p className="card-text">{adminData.userName}</p>
              <h5 className="card-title">Current Permissions</h5>
              {rolesArray.length > 0 ? (
                <ul className="card-text">
                  {rolesArray.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              ) : (
                <p className="card-text">No roles found</p>
              )}
              <div></div>
              <button onClick={handleUpdate} className="btn btn-primary mb-0">
                {""}
                Renew the permissions
              </button>

              <button
                type="button"
                class="btn btn-info ml-2"
                data-toggle="modal"
                data-target="#AssignedBank"
              >
                Assigned Banks
              </button>

              <button
                type="button"
                class="btn btn-success ml-2"
                data-toggle="modal"
                data-target="#AssignedWebsite"
              >
                Assigned Websites
              </button>

              <Link
                to={`/editsubadmin/${adminData._id}`}
                style={{ cursor: "pointer" }}
              >
                <button type="button" class="btn btn-warning ml-2">
                  Edit Profile
                </button>
              </Link>
            </div>
            <>
              <button
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={(e) => {
                  handleResetPassword(e, adminData.userName);
                }}
              >
                Reset password
              </button>
            </>
          </div>
          <SubAdResetPassword UserName={username} />
        </div>
      ) : (
        <div>
          <form>
            <div className="card" style={{ backgroundColor: "#d9cece" }}>
              <div className="card-header">
                <h1 className="h4 card-title mb-0">Renew the permissions</h1>
              </div>
              <div className="card-body">
                <div className="mb-1 input-group-lg">
                  <label>
                    <input
                      type="checkbox"
                      value="Dashboard-View"
                      checked={checkedItems.includes("Dashboard-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span className="my-1">Dashboard View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="report-all-txn"
                      checked={checkedItems.includes("report-all-txn")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Report-All Transaction</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="report-my-txn"
                      checked={checkedItems.includes("report-my-txn")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Report-My Transaction</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Bank-View"
                      checked={checkedItems.includes("Bank-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Bank View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-Introducer"
                      checked={checkedItems.includes("Create-Introducer")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create Introducer</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Website-View"
                      checked={checkedItems.includes("Website-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Website View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-Deposit-Transaction"
                      checked={checkedItems.includes(
                        "Create-Deposit-Transaction"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create Deposit Transaction</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-Withdraw-Transaction"
                      checked={checkedItems.includes(
                        "Create-Withdraw-Transaction"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create Withdraw Transaction</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-Transaction"
                      checked={checkedItems.includes("Create-Transaction")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create Transaction</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Profile-View"
                      checked={checkedItems.includes("Profile-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Profile View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="User-Profile-View"
                      checked={checkedItems.includes("User-Profile-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>User Profile View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Introducer-Profile-View"
                      checked={checkedItems.includes("Introducer-Profile-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Introducer Profile View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-User"
                      checked={checkedItems.includes("Create-User")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create User</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Transaction-Edit-Request"
                      checked={checkedItems.includes(
                        "Transaction-Edit-Request"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <span>Transaction Edit Request</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="RequestAdmin"
                      checked={checkedItems.includes("RequestAdmin")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Request</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Transaction-Delete-Request"
                      checked={checkedItems.includes(
                        "Transaction-Delete-Request"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <span>Transaction Delete Request</span>
                  </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="RecycleBin-View"
                        checked={checkedItems.includes(
                          "RecycleBin-View"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <span>RecycleBin View</span>
                    </label>
                  </div>
              </div>
              <div className="card-footer">
                <div className="col-12 text-end">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary mb-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      <AssignedBank ID={adminData.userName} />
      <AssignedWebsite ID={adminData.userName} />
    </>
  );
};

export default AdminEditrole;