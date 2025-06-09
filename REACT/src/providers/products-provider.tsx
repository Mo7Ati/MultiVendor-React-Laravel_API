import axiosClient from "@/axios-client";
import productsReducer from "@/reducers/products-reducer";
import { ProductType } from "@/types/dashboard";
import { useReducer, createContext, useState } from "react";


interface ICategoryContext {
    products: ProductType[],
    loaded: boolean,
    flashMessage: string,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    setFlashMessage: React.Dispatch<React.SetStateAction<string>>,
    getProducts: () => Promise<void>,
    dispatch: React.ActionDispatch<[action: any]>,
}
export const productsContext = createContext<ICategoryContext>(
    {
        products: [],
        loaded: false,
        flashMessage: '',
        getProducts: () => new Promise(() => { }),
        dispatch: () => { },
        setLoaded: () => { },
        setFlashMessage: () => { },
    });

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {

    const getProducts = async () => {
        try {
            const response = await axiosClient.get('/api/admin/dashboard/products')
            dispatch({ type: "INITIAL_STATE", payload: response.data.products });
            setLoaded(true);
        } catch (error) {
            throw error;
        }
    }

    const [products, dispatch] = useReducer(productsReducer, []);
    const [flashMessage, setFlashMessage] = useState<string>('');

    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <productsContext.Provider value={{
            products,
            loaded,
            flashMessage,
            getProducts,
            dispatch,
            setLoaded,
            setFlashMessage,
        }}>
            {children}
        </productsContext.Provider>
    );
}

