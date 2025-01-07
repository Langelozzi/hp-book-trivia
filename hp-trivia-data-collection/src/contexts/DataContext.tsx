import React, { createContext, useContext, useEffect, useState } from 'react';
import { Question } from '../interfaces/question';
import { getRecords } from '../api/firebase-crud';

const DataContext = createContext<{
    data: Question[];
    refetchData: () => void;
    setData: React.Dispatch<React.SetStateAction<Question[]>>;
    loading: boolean;
}>({ data: [], setData: () => { }, loading: true, refetchData: () => { } });

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true); // Track the loading state

    const refetchData = () => {
        getRecords().then((fetchedData) => {
            setData(fetchedData);
            setLoading(false); // Set loading to false once the data is fetched
        });
    }

    useEffect(() => {
        if (data.length === 0) {
            refetchData();
        } else {
            setLoading(false); // If data is already present, stop loading
        }
    }, [setData]);

    return (
        <DataContext.Provider value={{ data, setData, loading, refetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
