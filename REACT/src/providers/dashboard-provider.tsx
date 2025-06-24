import axiosClient from '@/axios-client';
import { User } from '@/types';
import React, { createContext, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface IAuthContext {
    user: User | null,
    permissions: string[],
    loaded: boolean,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setPermissions: React.Dispatch<React.SetStateAction<never[]>>,
    fetchUser: () => any,
}

const INITIAL: IAuthContext = {
    user: null,
    permissions: [],
    loaded: false,
    setUser: () => { },
    setPermissions: () => { },
    fetchUser: () => { },
}

export const DashboardAuthContext = createContext<IAuthContext>(INITIAL);

export const DashboardAuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<User | null>(null);
    const [permissions, setPermissions] = useState([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = useCallback(() => {
        setLoaded(false);
        axiosClient.get('/api/admin')
            .then(response => {
                setUser(response.data.user);
                setPermissions(response.data.permissions);
            }).finally(() => setLoaded(true));
    }, [user, loaded]);

    return (
        < DashboardAuthContext.Provider value={
            {
                user,
                permissions,
                loaded,
                setUser,
                setPermissions,
                fetchUser,
            }
        }>
            {children}
        </ DashboardAuthContext.Provider>
    )
}

