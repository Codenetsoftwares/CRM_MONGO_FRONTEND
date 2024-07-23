import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class AccountService {
  depositlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/deposit/login",
      data: data,
    });
  }
  withdrawlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/withdraw/login",
      data: data,
    });
  }
  adminlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/admin/login",
      data: data,
    });
  }
  createuser(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/create/user-admin",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  websitedetails(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-website-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  addbank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-bank-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getbank(user, page) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-bank-name?page=${page}&itemsPerPage=4`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getActiveBank(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-activeBank-name`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getActiveWebsite(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-activeWebsite-name`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getactivebankweb(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/active-visible-bank",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getrequestedbank(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-bank-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getrequestedwebsite(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/view-website-requests",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  website(user, page, search) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-website-name?page=${page}&pageSize=10&search=${search}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  userId(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/user-id",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  introducerId(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/superadmin/Introducer-id",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  IntroducerUserId(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/superadmin/Introducer-id`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletebank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/save-bank-request",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deletewebsite(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/save-website-request",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  addBank(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/add-bank-name",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  inneruserprofile(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/user-profile-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  singleIntroducerprofileEdit(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/intoducer-profile-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  editsubadminprofile(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/subAdmin-profile-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  introducerProfile(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-single-Introducer/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  userprofile(page, search, user) {
    console.log(user);
    return axios({
      method: "get",
      url: `${API_HOST}/api/user-profile/${page}?search=${search}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  singleuserprofile(user, id) {
    console.log("from service =>>>>", user);
    return axios({
      method: "get",
      url: `${API_HOST}/api/single-user-profile/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  introducerUsersingleProfile(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/introducer-user-single-data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  introducerLiveBalance(id, user) {
    console.log(id);
    if (id !== undefined) {
      return axios({
        method: "get",
        url: `${API_HOST}/api/admin/introducer-live-balance/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }

  Introducerprofile(page, search, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/introducer-profile/${page}?search=${search}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  singlebank(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/get-single-bank-name/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  editBank(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/bank-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualBankEntryDeposit(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/add-bank-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  ManualBankEntryWithdraw(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/withdraw-bank-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetBankStMent(user, id) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/manual-user-bank-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  GetBankuserStMent(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/user-bank-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualWebsiteEntryDeposit(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/add-website-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ManualWebsiteEntryWithdraw(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/withdraw-website-balance/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetWebsiteStateMent(user, id) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/manual-user-website-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetWebsiteSmmry(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/user-website-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  createIntroducer(data, user) {
    console.log("user", user);
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/accounts/introducer/register",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  introducerProfileEdit(data, id, user) {
    console.log("user", user);
    return axios({
      method: "put",
      url: `${API_HOST}/api/intoducer-name-edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  createActualuser(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/user/register",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntroducerClient(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/intoducer/client-data/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  getAdminList(page, search, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/view-sub-admins/${page}?search=${search}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  getSingleAdmin(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/single-sub-admin/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  updateSingleAdminPermission(id, data, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/admin/edit-subadmin-roles/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  Introducercut(id, user, data) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/introducer/introducerCut/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  SaveTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/save-transaction-request`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  SaveBankTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/save-bank-transaction-request`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  SaveWebsiteTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/save-website-transaction-request`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  EditWebsite(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/website-edit/${id}`,
      data: data,

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  DeleteBankTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-bank-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  DeleteWebsiteTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-website-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  DeleteTransaction(id, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/delete-transaction/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  UserResetPassword(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/user/reset-password",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IntoducerResetPassword(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/intorducer/reset-password",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  SubAdResetPassword(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/admin/reset-password",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  DeleteIntroducerTransaction(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/save-introducer-transaction-request`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ResetPassword(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/super-admin/reset-password`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  activeInactiveBank(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/bank/isactive/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  revokeAllPermissionBank(id, subAdminId, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/bank/delete-subadmin/${id}/${subAdminId}`,

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  revokeAllPermissionWebsite(id, subAdminId, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/website/delete-subadmin/${id}/${subAdminId}`,

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  activeInactiveWebsite(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/website/isactive/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  subadminbankpermission(id, data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/bank/assign-subadmin/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  subadminassigneedbankview(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/bank/view-subadmin/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  subadminassigneedwebsiteview(username, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/admin/website/view-subadmin/${username}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  permissionrenewBank(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/bank/edit-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  permissionrenewWebsite(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/website/edit-request/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new AccountService();
