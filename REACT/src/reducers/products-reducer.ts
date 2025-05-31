import { ProductType } from "@/types/dashboard";

type IAction =
    { type: "INITIAL_STATE", payload: ProductType[] } |
    { type: "ADD_PRODUCT", payload: ProductType } |
    { type: "UPDATE_PRODUCT", payload: ProductType } |
    { type: "DELETE_PRODUCT", payload: Number };

export default function productsReducer(state: ProductType[], action: IAction) {
    switch (action.type) {
        case "INITIAL_STATE": {
            return action.payload;
        }
        case "ADD_PRODUCT": {
            return [
                ...state, action.payload
            ];
        }
        case "UPDATE_PRODUCT": {
            const newArray = [...state].map(product =>
                product.id !== action.payload.id ? product : action.payload
            );
            return newArray;
        }
        case "DELETE_PRODUCT": {
            return [
                ...state.filter(product => product.id !== action.payload),
            ];
        }
    }
}
