import { getBackendErrorMessage } from "../utils/error";
import api from "./api";
import { IRegion } from "../types/region";

export const fetchRegion = async () => {
  try {
    let url = "/regions";

    const resp: {
      region: IRegion;
      status: boolean;
    } = await api.get(url);

    if (!resp.status) {
      throw new Error("Fetch region failed: " + getBackendErrorMessage(resp));
    }

    return resp;
  } catch (error) {
    console.error("Fetch region error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const changeAdminRegion = async (region: IRegion) => {
  try {
    let url = "/regions";

    const resp: {
      token: string;
      status: boolean;
    } = await api.put(url, { region });

    if (!resp.status) {
      throw new Error("change region failed: " + getBackendErrorMessage(resp));
    }
    localStorage.setItem("authToken", resp.token);

    return resp;
  } catch (error) {
    console.error("change region error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};
