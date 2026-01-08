import { createContext, PropsWithChildren, useState } from "react";
import { IReport } from "../types/report";
import { getReport, getReports } from "../services/report";

type ContextType = {
  reports: IReport[];
  fetchReports: (data: { status?: string; search?: string }) => Promise<void>;
  fetchReport: (id: string) => Promise<IReport>;
};

export const ReportContext = createContext<ContextType | undefined>(undefined);

export const ReportProvider = ({ children }: PropsWithChildren) => {
  const [reports, setReports] = useState<IReport[]>([]);

  const fetchReports = async (data: { status?: string; search?: string }) => {
    try {
      const result = await getReports(data);
      setReports(result);
    } catch (error) {
      throw error;
    }
  };

  const fetchReport = async (id: string) => {
    try {
      const result = await getReport({ id });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ReportContext.Provider
      value={{
        fetchReports,
        reports,
        fetchReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
