import { useContext } from "react";
import { ReportContext } from "../context/ReportContext";

const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within an ReportProvider");
  }
  return context;
};

export default useReport;
