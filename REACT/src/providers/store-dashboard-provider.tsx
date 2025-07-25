import axiosClient from '@/axios-client';
import { User } from '@/types';
import React, { createContext, ReactElement, useCallback, useEffect, useState } from 'react'

interface IAuthContext {
    store: User | null,
    // permissions: string[],
    loaded: boolean,
    setStore: React.Dispatch<React.SetStateAction<User | null>>,
    // setPermissions: React.Dispatch<React.SetStateAction<never[]>>,
    fetchStore: () => any,
}

const INITIAL: IAuthContext = {
    store: null,
    // permissions: [],
    loaded: false,
    setStore: () => { },
    // setPermissions: () => { },
    fetchStore: () => { },
}

export const StoreDashboardAuthContext = createContext<IAuthContext>(INITIAL);

export const StoreDashboardAuthProvider = ({ children }: { children: ReactElement }) => {
    const [store, setStore] = useState<User | null>(null);
    // const [permissions, setPermissions] = useState([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchStore();
    }, []);

    const fetchStore = () => {
        setLoaded(false);
        axiosClient.get('/api/store')
            .then(response => {
                setStore(response.data.store);
                // setPermissions(response.data.permissions);
            }).finally(() => setLoaded(true));
    };

    return (
        <StoreDashboardAuthContext.Provider value={
            {
                store,
                // permissions,
                loaded,
                setStore,
                // setPermissions,
                fetchStore,
            }
        }>
            {children}
        </ StoreDashboardAuthContext.Provider>
    )
}

