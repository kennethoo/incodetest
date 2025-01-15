import axios from "axios";
import apiUrl from "apiUrl/url";
export const meettumApi = axios.create({});

export const rceApi = axios.create({
  baseURL: apiUrl.codeRce,
});

export default axios;
