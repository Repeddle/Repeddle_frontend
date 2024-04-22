/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, Dispatch, SetStateAction } from 'react';

// Define the context type
interface StoreContextType {
 dispatch: Dispatch<SetStateAction<any>>; // Adjust the type based on your actual dispatch function
}

// Create the context
export const Store = createContext<StoreContextType | undefined>(undefined);