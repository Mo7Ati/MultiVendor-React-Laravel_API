import axiosClient from "@/axios-client";
import storesReducer from "@/reducers/stores-reducer";
import { StoreType } from "@/types/dashboard";
import { useReducer, createContext, useState } from "react";


interface IStoreContext {
    stores: StoreType[],
    loaded: boolean,
    flashMessage: string,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    setFlashMessage: React.Dispatch<React.SetStateAction<string>>,
    getStores: () => Promise<void>,
    dispatch: React.ActionDispatch<[action: any]>,
}
export const storesContext = createContext<IStoreContext>(
    {
        stores: [],
        loaded: false,
        flashMessage: '',
        getStores: () => new Promise(() => { }),
        dispatch: () => { },
        setLoaded: () => { },
        setFlashMessage: () => { },
    });

export const StoresProvider = ({ children }: { children: React.ReactNode }) => {

    const getStores = async () => {
        try {
            const response = await axiosClient.get('/admin/dashboard/stores')
            dispatch({ type: "INITIAL_STATE", payload: response.data.stores });
            setLoaded(true);
        } catch (error) {
            throw error;
        }
    }

    const [stores, dispatch] = useReducer(storesReducer, []);
    const [flashMessage, setFlashMessage] = useState<string>('');

    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <storesContext.Provider value={{
            stores,
            loaded,
            flashMessage,
            getStores,
            dispatch,
            setLoaded,
            setFlashMessage,
        }}>
            {children}
        </storesContext.Provider>
    );
}

