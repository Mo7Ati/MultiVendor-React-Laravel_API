import axiosClient from "@/axios-client";
import adminsReducer, { IAction } from "@/reducers/admin-reducer";
import { AdminType } from "@/types/dashboard"
import { createContext, useReducer, useState } from "react";


type IAdminsContext = {
    admins: AdminType[];
    loaded: boolean;
    flashMessage: string;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setFlashMessage: React.Dispatch<React.SetStateAction<string>>;
    dispatch: React.ActionDispatch<[action: IAction]>;
    getAdmins: () => Promise<void>;
}

const INITIAL: IAdminsContext = {
    admins: [],
    loaded: false,
    flashMessage: '',
    dispatch: () => { },
    setLoaded: () => { },
    getAdmins: () => new Promise(() => { }),
    setFlashMessage: () => { },
}


export const AdminsContext = createContext<IAdminsContext>(INITIAL);


export default function AdminsProvider({ children }: { children: React.ReactNode }) {
    const [admins, dispatch] = useReducer(adminsReducer, []);
    const [loaded, setLoaded] = useState<boolean>(false)
    const [flashMessage, setFlashMessage] = useState<string>('')

    const getAdmins = async () => {
        try {
            const response = await axiosClient.get("/admin/dashboard/admins");
            dispatch({ type: "INITIAL_STATE", payload: response.data.admins });
            setLoaded(true);
        } catch (error) {

        }
    }
    return (
        <AdminsContext.Provider value={{
            admins,
            flashMessage,
            loaded,
            setLoaded,
            setFlashMessage,
            dispatch,
            getAdmins,
        }}>
            {children}
        </AdminsContext.Provider>

    )
}
