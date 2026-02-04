import axios from "axios";
import {
  PaymentResponse,
  Payments,
  PaymentWithPagination,
} from "../types/payments";
import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export const fetchPaymentsService = async (params?: string) => {
  try {
    let url = "/payments";

    if (params && params.length) {
      url = url + `?${params}`;
    }

    const resp: PaymentWithPagination & { status: boolean } =
      await api.get(url);

    if (!resp.status) {
      // Handle Fetch payments error, e.g., display an error message to the user
      throw new Error("Fetch payments failed: " + getBackendErrorMessage(resp));
    }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch payments error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const fetchPaymentByIdService = async (id: string) => {
  try {
    const resp: PaymentResponse = await api.get(`/payments/${id}`);

    // if (!resp.status) {
    //   // Handle Fetch payments error, e.g., display an error message to the user
    //   throw new Error("Fetch payments failed: " + getBackendErrorMessage(resp))
    // }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch payments error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const paySellerService = async (
  orderId: string,
  itemId: string,
  userId: string,
) => {
  try {
    const resp: { message: string; status: boolean; payment: Payments } =
      await api.post(`/payments/pay-seller/${orderId}/${itemId}`, { userId });

    if (!resp.status) {
      // Handle Fetch payments error, e.g., display an error message to the user
      throw new Error("pay seller failed: " + getBackendErrorMessage(resp));
    }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("pay seller error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const refundBuyerService = async (
  orderId: string,
  itemId: string,
  userId: string,
) => {
  try {
    const resp: { message: string; status: boolean; payment: Payments } =
      await api.post(`/payments/refund-buyer/${orderId}/${itemId}`, { userId });

    if (!resp.status) {
      // Handle Fetch payments error, e.g., display an error message to the user
      throw new Error("refund buyer failed: " + getBackendErrorMessage(resp));
    }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("refund buyer error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};
export const approvePaymentWalletService = async (
  paymentId: string,
  userId: string,
) => {
  try {
    const resp: { message: string; status: boolean; payment: Payments } =
      await api.post(`/payments/approve/${paymentId}`, { userId });

    if (!resp.status) {
      // Handle Fetch payments error, e.g., display an error message to the user
      throw new Error(
        "approve payment failed: " + getBackendErrorMessage(resp),
      );
    }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("approve payment error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};
export const declinePaymentWalletService = async (
  paymentId: string,
  userId: string,
) => {
  try {
    const resp: { message: string; status: boolean; payment: Payments } =
      await api.post(`/payments/decline/${paymentId}`, { userId });

    if (!resp.status) {
      // Handle Fetch payments error, e.g., display an error message to the user
      throw new Error(
        "decline payment failed: " + getBackendErrorMessage(resp),
      );
    }

    return resp;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("decline payment error:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const generatePayfastSignatureService = async (
  data: Record<string, string>,
) => {
  try {
    const resp: { message: string; status: boolean; signature: string } =
      await api.post(`/payments/get-payfast-signature`, { data });

    if (!resp.status) {
      throw new Error(
        "generate signature failed: " + getBackendErrorMessage(resp),
      );
    }

    return resp;
  } catch (error) {
    console.error("generate signature error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const initPayFastOnsiteService = async (
  myData: Record<string, string>,
): Promise<string> => {
  try {
    const dataToString = (dataArray: Record<string, string>) => {
      // Convert your data array to a string
      let pfParamString = "";
      for (let key in dataArray) {
        if (dataArray.hasOwnProperty(key)) {
          pfParamString += `${key}=${encodeURIComponent(dataArray[key].trim()).replace(/%20/g, "+")}&`;
        }
      }
      // Remove last ampersand
      return pfParamString.slice(0, -1);
    };

    const generatePaymentIdentifier = async (pfParamString: string) => {
      const result = await axios
        .post(`https://www.payfast.co.za/onsite/process`, pfParamString)
        .then((res) => {
          console.log("res", res);
          return res.data.uuid || null;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log("res.data", result);
      return result;
    };

    const pfParamString = dataToString(myData);
    const identifier = await generatePaymentIdentifier(pfParamString);
    console.log("identifier", identifier);

    return identifier;
  } catch (error) {
    throw "PayFast init error";
  }
};
