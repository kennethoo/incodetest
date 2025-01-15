import meettumApi from "ApiServiveGateWay/apiConfig";
class UserMannager {
  userId: any;
  constructor(userId) {
    this.userId = userId;
  }

  deleteAccount = async () => {
    const { data } = await meettumApi.get("/api/v1/delete/account");
    return { data };
  };

  updateUserProfile = async (userProfile) => {
    const { data } = await meettumApi.post(
      "/api/update-my-info-for-myprofile",
      userProfile,
    );
    return { data };
  };
  removeUserProfile = async () => {
    const { data } = await meettumApi.post("/api/profile/remove");
    return { data };
  };
  uploadUserProfile = async (dataFormat) => {
    const { data } = await meettumApi.post("/api/profile/image", dataFormat);
    return { data };
  };

  getUserSubScription = async () => {
    const { data } = await meettumApi.get("/api/v1/user/subscription");
    return data;
  };

  canCelSubScription = async (planId) => {
    const { data } = await meettumApi.post("/api/v1/user/subscription/cancel", {
      planId,
    });
    return data;
  };

  getCustomerPaymentMethode = async () => {
    const { data } = await meettumApi.get("/api/v1/payment/methode");
    return data;
  };

  removePaymentMethde = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/v1/payment/methode/remove",
      payload,
    );
    return data;
  };
  markPaymentInfoAsDefault = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/v1/payment/methode/update",
      payload,
    );
    return data;
  };

  seachUserProfileUsingUserName = async (username) => {};
}
export default UserMannager;
