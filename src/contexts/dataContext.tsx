import React, { createContext, useContext, ReactNode, useState } from "react";

export type DataContextType = {
    space: Space | null;
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
};

interface IDataProviderProps {
    children: ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<IDataProviderProps> = ({ children }) => {
    const [space, setSpace] = useState<Space | null>(null);

    return <DataContext.Provider value={{ space, setSpace }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType | null => {
    return useContext(DataContext);
};
