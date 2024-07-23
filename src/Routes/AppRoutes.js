import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../Utils/RequireAuth";
import { useAuth } from "../Utils/Auth";
import Welcome from "../Component/DashBoard/Welcome";
import ErrorPage from "../pages/ErrorPage";
import Login from "../Component/Login/Login";
import AdminLayout from "../Component/Sidebar/AdminLayout";
// import Withdraw from "../Component/DashBoard/Withdraw";
// import Deposit from "../Component/DashBoard/Deposit";
import AdminBank from "../Component/DashBoard/AdminBank";
import WebsiteDetails from "../Component/DashBoard/WebsiteDetails";
import AdminList from "../Component/SuperAdmin/AdminList";
import AdminEditrole from "../Component/SuperAdmin/AdminEditrole";
import CreateUser from "../Component/DashBoard/CreateUser";
import CreateActualUser from "../Component/DashBoard/CreateActualUser";
import CreateIntroducer from "../Component/DashBoard/CreateIntroducer";
import IntroducerProfile from "../Component/DashBoard/IntroducerProfile";
import UserProfile from "../Component/DashBoard/UserProfile";
import MainTransactionPage from "../pages/TransactionPage/MainTransactionPage";
import MyTxn from "../Component/DashBoard/MyTxn";
import Alert from "../Component/DashBoard/Alert";
import IntroducerAlert from "../Component/IntroducerAlert";
import BankDelete from "../Component/DashBoard/Request/Bank/BankDelete";
import BankEdit from "../Component/DashBoard/Request/Bank/BankEdit";
import NewBank from "../NewBank&Website/NewBank";
import NewWebsite from "../NewBank&Website/NewWebsite";
import WebsiteEdit from "../Component/DashBoard/Request/Website/WebsiteEdit";
import WebsiteDelete from "../Component/DashBoard/Request/Website/WebsiteDelete";
import TrashAllTransaction from "../Component/TrashAllTransaction";
import AdminDash from "../Component/DashBoard/AdminDash";
import IntroducerStatement from "../Component/DashBoard/IntroducerStatement";
import WebsiteStatement from "../Component/DashBoard/WebsiteStatement";

import BankTransactionPage from "../pages/TransactionPage/BankTransactionPage";
import WebsiteTransactionPage from "../pages/TransactionPage/WebsiteTransactionPage";
import InnerIntroducer from "../Component/DashBoard/InnerIntroducer";
import CreateTransaction from "../Component/DashBoard/CreateTransaction";
import InnerUserProfile from "../Component/DashBoard/InnerUserProfile";
import SingleIntroducer from "../Component/DashBoard/SingleIntroducer";
import EditProfileSubadmin from "../Component/SuperAdmin/EditProfileSubadmin";
import IntroShowPr from "../Component/DashBoard/IntroShowPr";
import TransactionDetails from "../Component/DashBoard/TransactionDetails";
import EditTransaction from "../Component/Modal/EditTransaction";
import EditWebTransaction from "../Component/DashBoard/EditWebTransaction";
import EditBnkTransaction from "../Component/DashBoard/EditBnkTransaction ";
import EditBank from "../Component/EditBank";
import ResetPassword from "../Component/DashBoard/ResetPassword";
import BankStatement from "../Component/DashBoard/BankStatement";
import Deposit from "../pages/createTransaction/Deposit";
import Withdraw from "../pages/createTransaction/Withdraw";

const AppRoutes = () => {
  const userrole = sessionStorage.getItem("role") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route
            path="welcome"
            element={
              <RequireAuth>
                <Welcome />
              </RequireAuth>
            }
          />
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") ||
              role.includes("Create-Withdraw-Transaction") ||
              role.includes("Create-Transaction")
          ) && (
              <Route
                path="withdraw"
                element={
                  <RequireAuth>
                    <Withdraw />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") ||
              role.includes("Create-Withdraw-Transaction") ||
              role.includes("Create-Transaction")
          ) && (
              <Route
                path="deposit"
                element={
                  <RequireAuth>
                    <Deposit />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) => role.includes("superAdmin") || role.includes("Bank-View")
          ) && (
              <Route
                path="bank"
                element={
                  <RequireAuth>
                    <AdminBank />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("Website-View")
          ) && (
              <Route
                path="website"
                element={
                  <RequireAuth>
                    <WebsiteDetails />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some((role) => role.includes("superAdmin")) && (
            <Route
              path="createuser"
              element={
                <RequireAuth>
                  <CreateUser />
                </RequireAuth>
              }
            />
          )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("Create-User")
          ) && (
              <Route
                path="createactualuser"
                element={
                  <RequireAuth>
                    <CreateActualUser />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("Create-Introducer")
          ) && (
              <Route
                path="createintroducer"
                element={
                  <RequireAuth>
                    <CreateIntroducer />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") ||
              role.includes("Profile-View") ||
              role.includes("User-Profile-View")
          ) && (
              <Route
                path="userprofile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") ||
              role.includes("Profile-View") ||
              role.includes("Introducer-Profile-View")
          ) && (
              <Route
                path="introducerprofile"
                element={
                  <RequireAuth>
                    <IntroducerProfile />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some((role) => role.includes("superAdmin")) && (
            <Route
              path="adminlist"
              element={
                <RequireAuth>
                  <AdminList />
                </RequireAuth>
              }
            />
          )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("report-all-txn")
          ) && (
              <Route
                path="maintransactionpage"
                element={
                  <RequireAuth>
                    <MainTransactionPage />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("report-my-txn")
          ) && (
              <Route
                path="mytxn"
                element={
                  <RequireAuth>
                    <MyTxn />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="alert"
                element={
                  <RequireAuth>
                    <Alert />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="introduceralert"
                element={
                  <RequireAuth>
                    <IntroducerAlert />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="bankDelete"
                element={
                  <RequireAuth>
                    <BankDelete />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="bankEdit"
                element={
                  <RequireAuth>
                    <BankEdit />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="newbank"
                element={
                  <RequireAuth>
                    <NewBank />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="newwebsite"
                element={
                  <RequireAuth>
                    <NewWebsite />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="websiteEdit"
                element={
                  <RequireAuth>
                    <WebsiteEdit />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="websiteDelete"
                element={
                  <RequireAuth>
                    <WebsiteDelete />
                  </RequireAuth>
                }
              />
            )}
          {[userrole]?.some(
            (role) =>
              role.includes("superAdmin") || role.includes("RequestAdmin")
          ) && (
              <Route
                path="trashAllTransaction"
                element={
                  <RequireAuth>
                    <TrashAllTransaction />
                  </RequireAuth>
                }
              />
            )}
          <Route
            path="subadminedit/:id"
            element={
              <RequireAuth>
                <AdminEditrole />
              </RequireAuth>
            }
          />
          <Route
            path="admindash"
            element={
              <RequireAuth>
                <AdminDash />
              </RequireAuth>
            }
          />
          <Route
            path="introducerstatement/:id"
            element={
              <RequireAuth>
                <IntroducerStatement />
              </RequireAuth>
            }
          />
          <Route
            path="websitestatement/:id"
            element={
              <RequireAuth>
                <WebsiteStatement />
              </RequireAuth>
            }
          />

          <Route
            path="bankstatement/:id"
            element={
              <RequireAuth>
                <BankStatement />
              </RequireAuth>
            }
          />
          <Route
            path="banktransactionpage/:id"
            element={
              <RequireAuth>
                <BankTransactionPage />
              </RequireAuth>
            }
          />
          <Route
            path="websitetransactionpage/:id"
            element={
              <RequireAuth>
                <WebsiteTransactionPage />
              </RequireAuth>
            }
          />
          <Route
            path="introducerprofile"
            element={
              <RequireAuth>
                <IntroducerProfile />
              </RequireAuth>
            }
          />
          <Route
            path="innerintroducer/:id"
            element={
              <RequireAuth>
                <InnerIntroducer />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <CreateTransaction />
              </RequireAuth>
            }
          />

          <Route
            path="innerprofile"
            element={
              <RequireAuth>
                <InnerUserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="singleintroducer/:id"
            element={
              <RequireAuth>
                <SingleIntroducer />
              </RequireAuth>
            }
          />
          <Route
            path="editsubadmin/:id"
            element={
              <RequireAuth>
                <EditProfileSubadmin />
              </RequireAuth>
            }
          />

          <Route
            path="showpercentageintroducer"
            element={
              <RequireAuth>
                <IntroShowPr />
              </RequireAuth>
            }
          />
          <Route
            path="transactiondetails"
            element={
              <RequireAuth>
                <TransactionDetails />
              </RequireAuth>
            }
          />
          <Route
            path="admindash/:id"
            element={
              <RequireAuth>
                <EditTransaction />
              </RequireAuth>
            }
          />

          <Route
            path="editwebsitedata/:id"
            element={
              <RequireAuth>
                <EditWebTransaction />
              </RequireAuth>
            }
          />
          <Route
            path="editbankdata/:id"
            element={
              <RequireAuth>
                <EditBnkTransaction />
              </RequireAuth>
            }
          />
          <Route
            path="editbank/:id"
            element={
              <RequireAuth>
                <EditBank />
              </RequireAuth>
            }
          />
          <Route
            path="websiteEdit"
            element={
              <RequireAuth>
                <WebsiteEdit />
              </RequireAuth>
            }
          />
          <Route
            path="bankEdit"
            element={
              <RequireAuth>
                <BankEdit />
              </RequireAuth>
            }
          />
          <Route
            path="resetpassword"
            element={
              <RequireAuth>
                <ResetPassword />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
