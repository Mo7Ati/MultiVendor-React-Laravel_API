import axiosClient from "@/axios-client";
import rolesReducer, { IState } from "@/reducers/roles-reducer";
import { IAction } from "@/reducers/roles-reducer";
import { RoleType } from "@/types/dashboard"
import { createContext, useReducer, useState } from "react";


type IRolesContext = {
    state: IState;
    loaded: boolean;
    flashMessage: string;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setFlashMessage: React.Dispatch<React.SetStateAction<string>>;
    dispatch: React.ActionDispatch<[action: IAction]>;
    getRoles: () => Promise<void>;
}

const INITIAL: IRolesContext = {
    state: { roles: [], allAbilities: [] },
    loaded: false,
    flashMessage: '',
    dispatch: () => { },
    setLoaded: () => { },
    getRoles: () => new Promise(() => { }),
    setFlashMessage: () => { },
}


export const RolesContext = createContext<IRolesContext>(INITIAL);


export default function RolesProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(rolesReducer, { roles: [], allAbilities: [] });
    const [loaded, setLoaded] = useState<boolean>(false)
    const [flashMessage, setFlashMessage] = useState<string>('')

    const getRoles = async () => {
        try {
            const response = await axiosClient.get("/api/admin/dashboard/roles");
            dispatch({ type: "INITIAL_STATE", payload: response.data });
            setLoaded(true);
        } catch (error) {

        }
    }
    return (
        <RolesContext.Provider value={{
            state,
            flashMessage,
            loaded,
            setLoaded,
            setFlashMessage,
            dispatch,
            getRoles,
        }}>
            {children}
        </RolesContext.Provider>

    )
}
