import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

export type DataContextType = {
    spaces: Space[] | null;
    setSpaces: React.Dispatch<React.SetStateAction<Space[] | null>>;
    temperatureOffsets: {
        min: number;
        max: number;
    };
    setTemperatureOffsets: React.Dispatch<
        React.SetStateAction<{
            min: number;
            max: number;
        }>
    >;
    asset: Asset | null;
    setAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
    temperature: number | null;
    setTemperature: React.Dispatch<React.SetStateAction<number | null>>;
    energies: Energy[] | null;
    setEnergies: React.Dispatch<React.SetStateAction<Energy[] | null>>;
    newEnergy: Energy | null;
    setNewEnergy: React.Dispatch<React.SetStateAction<Energy | null>>;
};

interface IDataProviderProps {
    children: ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<IDataProviderProps> = ({ children }) => {
    const [spaces, setSpaces] = useState<Space[] | null>(null);
    const [asset, setAsset] = useState<Asset | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [energies, setEnergies] = useState<Energy[] | null>(null);
    const [newEnergy, setNewEnergy] = useState<Energy | null>(null);

    const [temperatureOffsets, setTemperatureOffsets] = useState({
        min: 19,
        max: 24,
    });

    useEffect(() => {
        if (energies && newEnergy) {
            const newEnergies = energies.map(energy =>
                energy.id === newEnergy.id ? newEnergy : energy
            );
            setEnergies(newEnergies);
            setNewEnergy(null);
        }
        return () => {
            setNewEnergy(null);
        };
    }, [newEnergy, energies]);

    return (
        <DataContext.Provider
            value={{
                spaces,
                setSpaces,
                temperatureOffsets,
                setTemperatureOffsets,
                asset,
                setAsset,
                temperature,
                setTemperature,
                energies,
                setEnergies,
                newEnergy,
                setNewEnergy,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);

    if (context === null) {
        throw new Error("useData must be used within a DataProvider");
    }

    return context;
};
