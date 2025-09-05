import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { changeAdminRegion, fetchRegion } from "../services/region";
import { IRegion } from "../types/region";

type ContextType = {
  region: IRegion;
  changeRegion: (val: IRegion) => Promise<void>;
};

export const RegionContext = createContext<ContextType | undefined>(undefined);

export const RegionProvider = ({ children }: PropsWithChildren) => {
  const [region, setRegion] = useState<IRegion>("NG");

  const handleError = (error: string) => {
    throw error || "An error occurred.";
  };

  const fetchUserRegion = async () => {
    try {
      const result = await fetchRegion();
      setRegion(result.region);
    } catch (error) {
      handleError(error as string);
    }
  };

  const changeRegion = async (val: IRegion) => {
    try {
      await changeAdminRegion(val);
      fetchUserRegion();
    } catch (error) {
      handleError(error as string);
    }
  };

  useEffect(() => {
    fetchUserRegion();
  }, []);

  return (
    <RegionContext.Provider
      value={{
        changeRegion,
        region,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};
