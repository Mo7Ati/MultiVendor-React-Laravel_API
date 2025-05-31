import axiosClient from "@/axios-client";
import categoriesReducer from "@/reducers/categories-reducer";
import { CategoryType } from "@/types/dashboard";
import { useReducer, createContext, useState } from "react";


interface ICategoryContext {
    categories: CategoryType[],
    categoriesLoaded: boolean,
    flashMessage: string,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    setFlashMessage: React.Dispatch<React.SetStateAction<string>>,
    getCategories: () => Promise<void>,
    dispatch: React.ActionDispatch<[action: any]>,
}
export const categoriesContext = createContext<ICategoryContext>(
    {
        categories: [],
        categoriesLoaded: false,
        flashMessage: '',
        getCategories: () => new Promise(() => { }),
        dispatch: () => { },
        setLoaded: () => { },
        setFlashMessage: () => { },
    });

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {

    const getCategories = async () => {
        try {
            const response = await axiosClient.get('/admin/dashboard/categories')
            dispatch({ type: "INITIAL_STATE", payload: response.data.categories });
            setLoaded(true);
        } catch (error) {
            throw error;
        }
    }

    const [categories, dispatch] = useReducer(categoriesReducer, []);
    const [flashMessage, setFlashMessage] = useState<string>('');

    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <categoriesContext.Provider value={{
            categories,
            categoriesLoaded: loaded,
            flashMessage,
            getCategories,
            dispatch,
            setLoaded,
            setFlashMessage,
        }}>
            {children}
        </categoriesContext.Provider>
    );
}

