import meettumApi from "ApiServiveGateWay/apiConfig";
export class ContactApi {
  PENDING: string;
  DECLINE: string;
  ACCEPTED: string;
  constructor() {
    this.PENDING = "pending";
    this.DECLINE = "decline";
    this.ACCEPTED = "accepted";
  }
  getUserContactInfo = async (query) => {
    const data = await meettumApi.get(
      `/api/v1/contact/info/${JSON.stringify(query)}`,
    );
    return data;
  };
  createContact = async (payload) => {
    const data = await meettumApi.post(`/api/v1/contact/create`, payload);
    return data;
  };

  responseToContactRequest = async (payload) => {
    const data = await meettumApi.post(`/api/v1/contact/respond`, payload);
    return data;
  };
}

export const contactApi = new ContactApi();
