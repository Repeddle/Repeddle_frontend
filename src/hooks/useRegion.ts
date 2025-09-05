import { useContext } from "react";
import { RegionContext } from "../context/RegionContext";

const useRegion = () => {
  const context = useContext(RegionContext);

  if (!context)
    throw new Error("useRegion must be used within a category context");

  return context;
};

export default useRegion;
