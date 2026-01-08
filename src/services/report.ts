import { IReport } from "../types/report";
import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export interface CreateReportPayload {
  targetType:
    | "product"
    | "message"
    | "conversation"
    | "comment"
    | "review"
    | "reply"
    | "user";
  targetId: string;
  reason: string;
  description?: string;
  image?: string;
}

export const createReport = async (data: CreateReportPayload) => {
  try {
    const res = await api.post("/reports", data);
    return res;
  } catch (error: any) {
    console.error("create report  error:", getBackendErrorMessage(error));

    throw getBackendErrorMessage(error);
  }
};

export const getReports = async ({
  search,
  status,
}: {
  status?: string;
  search?: string;
}): Promise<IReport[]> => {
  try {
    const res: { success: boolean; reports: IReport[] } = await api.get(
      `/reports?search=${search}&status=${status}`
    );
    return res.reports;
  } catch (error: any) {
    console.error("get report  error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const getReport = async ({ id }: { id: string }): Promise<IReport> => {
  try {
    const res: { success: boolean; report: IReport } = await api.get(
      `/reports/${id}`
    );
    return res.report;
  } catch (error: any) {
    console.error("get report  error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const updateReport = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IReport>;
}): Promise<IReport> => {
  try {
    const res: { success: boolean; report: IReport } = await api.patch(
      `/reports/${id}`,
      data
    );
    return res.report;
  } catch (error: any) {
    console.error("update report error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};
