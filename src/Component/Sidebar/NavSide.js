import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Topimg from "../../Assets/Topimgg.png";
import userIcon from "../../Assets/user-iconn.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faSquarePlus,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const NavSide = ({ onSelect }) => {
  const auth = useAuth();
  const [isToggle, setIsToggle] = useState(true);
  const [isToggleCreate, setIsToggleCreate] = useState(true);
  const [isToggleDash, setIsToggleDash] = useState(true);
  const [useremail, setUserEmail] = useState([]);
  const [userrole, setUserRole] = useState([]);
  const [IsToggleTransaction, setIsToggleTransaction] = useState(true);
  const [IsToggleRequest, setIsToggleRequest] = useState(true);
  const [IsToggleBank, setIsToggleBank] = useState(true);
  const [IsToggleWebsite, setIsToggleWebsite] = useState(true);
  const [isToggleRecycleBin, setIsToggleRecycleBin] = useState(true);

  useEffect(() => {
    setUserEmail(auth.user?.userName);
    setUserRole(auth.user.role);

  }, [auth]);

  console.log(userrole);

  const resetToggles = () => {
    setIsToggle(true);
    setIsToggleCreate(true);
    setIsToggleDash(true);
    setIsToggleTransaction(true);
    setIsToggleRequest(true);
    setIsToggleBank(true);
    setIsToggleWebsite(true);
    setIsToggleRecycleBin(true);
  };

  const handleToggle = () => {
    resetToggles();
    setIsToggle(!isToggle);
  };

  const handleToggleDash = () => {
    resetToggles();
    setIsToggleDash(!isToggleDash);
  };

  const handleToggleCreate = () => {
    resetToggles();
    setIsToggleCreate(!isToggleCreate);
  };

  const handleToggleTransaction = () => {
    resetToggles();
    setIsToggleTransaction(!IsToggleTransaction);
  };

  const handleToggleRequest = () => {
    // resetToggles();
    setIsToggleRequest(!IsToggleRequest);
  };

  const handleToggleBank = () => {
    // resetToggles();
    setIsToggleBank(!IsToggleBank);
  };

  const handleToggleWebsite = () => {
    // resetToggles();
    setIsToggleWebsite(!IsToggleWebsite);
  };

  const handleToggleRecycleBin = () => {
    // resetToggles();
    setIsToggleRecycleBin(!isToggleRecycleBin);
  };

  const handleMenuClick = (menuItem) => {
    console.log("=====>>>> menuItem", menuItem);
    onSelect(menuItem); // Call onSelect callback with selected menu item
  };

  return (
    <div>
      {/* {isTogglenav ? ( */}
      <aside
        className="main-sidebar elevation-4"
        style={{
          backgroundColor: "#B1A5FA",
        }}
      >
        <div className="d-flex flex-row">
          <p className="brand-link">
            <img
              src={Topimg}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light text-white">
              &nbsp;obhiasb
            </span>
            <span
              className="fs-4 ms-4  d-xl-none"
              style={{ width: "15%" }}
              data-widget="pushmenu"
            >
              &#10005;
            </span>
          </p>
          <div
            className="fs-4 ms-4 "
            style={{ width: "15%" }}
            data-widget="pushmenu"
          ></div>
        </div>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={userIcon} className="img-circle" alt="User Image" />
            </div>
            <div className="info">
              <p href="#" className="text-white" style={{ fontSize: "10px" }}>
                {useremail}
              </p>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <Link className="nav-item " to="/welcome">
                <a href="#" className="nav-link active" onClick={() => handleMenuClick('dashboard')}>
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </Link>
              {/* transaction part */}
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Dashboard-View" ||
                  role === "Create-Deposit-Transaction" ||
                  role === "Create-Withdraw-Transaction" ||
                  role === "Create-Transaction"
              ) && (
                  <>
                    {IsToggleTransaction ? (
                      <li className="nav-item ">
                        <a
                          className="nav-link "
                          onClick={handleToggleTransaction}
                        >
                          &nbsp;{" "}
                          <FontAwesomeIcon
                            icon={faExchangeAlt}
                            className="transaction-icon text-white"
                          />
                          <p className="text-white">
                            &nbsp;Transaction
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a
                          className="nav-link "
                          onClick={handleToggleTransaction}
                        >
                          &nbsp;
                          <FontAwesomeIcon
                            icon={faExchangeAlt}
                            className="transaction-icon text-white"
                          />
                          <p className="text-white">
                            &nbsp; Transaction
                            <i className="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Dashboard-View" ||
                            role === "Create-Deposit-Transaction" ||
                            role === "Create-Transaction"
                        ) && (
                            <>
                              <Link to="/deposit" className="nav-link text-white" onClick={() => handleMenuClick('Deposit')}>
                                <i className="far fa-circle nav-icon"  />
                                <p>Deposit</p>
                              </Link>
                            </>
                          )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Dashboard-View" ||
                            role === "Create-Withdraw-Transaction" ||
                            role === "Create-Transaction"
                        ) && (
                            <>
                              <Link to="/withdraw" className="nav-link text-white" onClick={() => handleMenuClick('Withdraw')}>
                                <i className="far fa-circle nav-icon"  />
                                <p>Withdraw</p>
                              </Link>
                            </>
                          )}
                      </li>
                    )}
                  </>
                )}
              {/* transaction part */}

              {/* bank part */}
              {userrole.some(
                (role) => role === "superAdmin" || role === "Bank-View"
              ) && (
                  <>
                    <Link to="/bank" className="nav-link text-white" onClick={() => handleMenuClick('Bank')}>
                      <i className="fas fa-university nav-icon m-2" />
                      <p>Bank</p>
                    </Link>
                  </>
                )}
              {/* bank part */}

              {/* website part */}
              {userrole.some(
                (role) => role === "superAdmin" || role === "Website-View"
              ) && (
                  <>
                    <Link to="/website" className="nav-link text-white"onClick={() => handleMenuClick('Website')}>
                      <i className="fas fa-globe nav-icon m-2" />
                      <p>Website</p>
                    </Link>
                  </>
                )}
              {/* website part */}

              {/* create part */}
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Create-User" ||
                  role === "Create-Introducer"
              ) && (
                  <>
                    {isToggleCreate ? (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleCreate}
                        >
                          &nbsp; <FontAwesomeIcon icon={faSquarePlus} />
                          <p className="text-white">
                            &nbsp; Create
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleCreate}
                        >
                          &nbsp;
                          <FontAwesomeIcon icon={faSquarePlus} />
                          <p>
                            &nbsp; Create
                            <i className="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        {userrole.some((role) => role === "superAdmin") && (
                          <Link to="/createuser" className="nav-link text-white" onClick={() => handleMenuClick('createSubAdmin')}>
                            <i className="far fa-circle nav-icon" />
                            <p>Create SubAdmin</p>
                          </Link>
                        )}

                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "Create-User"
                        ) && (
                            <Link
                              to="/createactualuser"
                              className="nav-link text-white"
                              onClick={() => handleMenuClick('createUser')}
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Create User</p>
                            </Link>
                          )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "Create-Introducer"
                        ) && (
                            <Link
                              to="/createintroducer"
                              className="nav-link text-white"
                              onClick={() => handleMenuClick('createIntroducer')}
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Create Introducer</p>
                            </Link>
                          )}
                      </li>
                    )}
                  </>
                )}
              {/* create part */}

              {/* profile part */}
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Profile-View" ||
                  role === "Introducer-Profile-View" ||
                  role === "User-Profile-View"
              ) && (
                  <>
                    {isToggle ? (
                      <li className="nav-item ">
                        <a className="nav-link text-white" onClick={handleToggle}>
                          &nbsp; <i className="fa-solid fas fa-user" />
                          <p>
                            &nbsp;Profile
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a className="nav-link text-white" onClick={handleToggle}>
                          &nbsp;
                          <i className="fa-solid fas fa-user" />
                          <p>
                            &nbsp; Profile
                            <i className="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Profile-View" ||
                            role === "User-Profile-View"
                        ) && (
                            <Link to="userprofile" className="nav-link text-white" onClick={() => handleMenuClick('userProfile')}>
                              <i className="far fa-circle nav-icon" />
                              <p>User Profile</p>
                            </Link>
                          )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" ||
                            role === "Profile-View" ||
                            role === "Introducer-Profile-View"
                        ) && (
                            <Link
                              to="/introducerprofile"
                              className="nav-link text-white"
                              onClick={() => handleMenuClick('introducerProfile')}
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>Introducer</p>
                            </Link>
                          )}
                        {userrole.some(
                          (role) => role === "superAdmin" || role === ""
                        ) && (
                            <Link to="/adminlist" className="nav-link text-white" onClick={() => handleMenuClick('subAdminProfile')}>
                              <i className="far fa-circle nav-icon" />
                              <p>SubAdmin</p>
                            </Link>
                          )}
                      </li>
                    )}
                  </>
                )}
              {/* profile part */}
              {/* report part */}
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "report-all-txn" ||
                  role === "report-my-txn"

              ) && (
                  <>
                    {isToggleDash ? (
                      <li className="nav-item ">
                        <a className="nav-link " onClick={handleToggleDash}>
                          &nbsp;{" "}
                          <FontAwesomeIcon
                            icon={faExchangeAlt}
                            className="transaction-icon text-white"
                          />
                          <p className="text-white">
                            &nbsp;Report
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a className="nav-link " onClick={handleToggleDash}>
                          &nbsp;
                          <FontAwesomeIcon
                            icon={faExchangeAlt}
                            className="transaction-icon text-white"
                          />
                          <p className="text-white">
                            &nbsp; Report
                            <i className="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "report-all-txn"
                        ) && (
                            <Link
                              to="/maintransactionpage"
                              className="nav-link text-white"
                              onClick={() => handleMenuClick('AllTransactionDetails')}
                            >
                              <i className="far fa-circle nav-icon" />
                              <p>All Transaction Details</p>
                            </Link>
                          )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "report-my-txn"
                        ) && (
                            <Link to="/mytxn" className="nav-link text-white"onClick={() => handleMenuClick('MyTransactions')}>
                              <i className="far fa-circle nav-icon" />
                              <p>My Transactions</p>
                            </Link>
                          )}
                      </li>
                    )}
                  </>
                )}
              {/* report part */}

              {/* request part */}
              {userrole.some(
                (role) => role === "superAdmin" || role === "RequestAdmin"
              ) && (
                  <>
                    {" "}
                    {IsToggleRequest ? (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleRequest}
                        >
                          &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                          &nbsp;
                          <p>
                            &nbsp;Request
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleRequest}
                        >
                          &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                          &nbsp;
                          <p>
                            &nbsp;Request
                            <i class="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        <Link to="/alert" className="nav-link text-white" onClick={() => handleMenuClick('AllTransactionRequest')}>
                          <i className="far fa-circle nav-icon" />
                          <p>All transaction</p>
                        </Link>
                        <Link
                          to="/introduceralert"
                          className="nav-link text-white"
                          onClick={() => handleMenuClick('introducerTransactionRequest')}

                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Introducer transaction</p>
                        </Link>
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "RequestAdmin"
                        ) && (
                            <>
                              {IsToggleBank ? (
                                <Link
                                  className="nav-link text-white"
                                  onClick={handleToggleBank}
                                 
                                >
                                  <i className="far fa-circle nav-icon" />
                                  <p>
                                    Bank
                                    <i className="fas fa-angle-left right" />
                                  </p>
                                </Link>
                              ) : (
                                <li className="nav-item ">
                                  <Link
                                    to="#"
                                    className="nav-link text-white"
                                    onClick={handleToggleBank}
                                  >
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                      Bank
                                      <i class="fas fa-chevron-down right"></i>
                                    </p>
                                  </Link>
                                  <Link
                                    to="/bankEdit"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('BankEdit')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>Edit</p>
                                  </Link>

                                  <Link
                                    to="/bankDelete"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('BankDelete')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>Delete</p>
                                  </Link>
                                  <Link
                                    to="/newbank"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('NewBank')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>New Bank</p>
                                  </Link>
                                </li>
                              )}
                            </>
                          )}
                        {userrole.some(
                          (role) =>
                            role === "superAdmin" || role === "RequestAdmin"
                        ) && (
                            <>
                              {IsToggleWebsite ? (
                                <li
                                  className="nav-link text-white"
                                  onClick={handleToggleWebsite}
                                >
                                  <i className="far fa-circle nav-icon" />
                                  <p>
                                    Website
                                    <i className="fas fa-angle-left right" />
                                  </p>
                                </li>
                              ) : (
                                <li className="nav-item ">
                                  <Link
                                    to="#"
                                    className="nav-link text-white "
                                    onClick={handleToggleWebsite}
                                  >
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                      Website
                                      <i class="fas fa-chevron-down right"></i>
                                    </p>
                                  </Link>
                                  <Link
                                    to="/websiteEdit"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('WebsiteEdit')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>Edit</p>
                                  </Link>
                                  <Link
                                    to="/websiteDelete"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('WebsiteDelete')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>Delete</p>
                                  </Link>
                                  <Link
                                    to="/newwebsite"
                                    className="nav-link text-white"
                                    onClick={() => handleMenuClick('newWebsite')}
                                  >
                                    <i className="far fa-circle nav-icon" />
                                    <p>New Website</p>
                                  </Link>
                                </li>
                              )}
                            </>
                          )}
                      </li>
                    )}
                  </>
                )}
              

              {/* recylebin part */}
              {userrole.some(
                (role) => role === "superAdmin" || role === "RecycleBin-View"
              ) && (
                  <>
                    {" "}
                    {isToggleRecycleBin ? (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleRecycleBin}
                        >
                          &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faTrash} />
                          &nbsp;
                          <p>
                            &nbsp;Recycle Bin
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ">
                        <a
                          className="nav-link text-white"
                          onClick={handleToggleRecycleBin}
                        >
                          &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faTrash} />
                          &nbsp;
                          <p>
                            &nbsp;Recycle Bin
                            <i class="fas fa-chevron-down right"></i>
                          </p>
                        </a>
                        <Link to="trashAllTransaction" className="nav-link text-white" onClick={() => handleMenuClick('AllTransactionTrash')}>
                          <i className="far fa-circle nav-icon" />
                          <p>All transaction</p>
                        </Link>
                        {/* <Link
                          to="trashIntroducerTransaction"
                          className="nav-link text-white"
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Introducer transaction</p>
                        </Link> */}

                      </li>
                    )}
                  </>
                )}

              {/* recylebin part */}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default NavSide;
