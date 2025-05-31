import { StoreType } from "@/types/dashboard";

type IAction =
    { type: "INITIAL_STATE", payload: StoreType[] } |
    { type: "ADD_STORE", payload: StoreType } |
    { type: "UPDATE_STORE", payload: StoreType } |
    { type: "DELETE_STORE", payload: Number };

export default function storesReducer(state: StoreType[], action: IAction) {
    switch (action.type) {
        case "INITIAL_STATE": {
            return action.payload;
        }
        case "ADD_STORE": {
            return [
                ...state, action.payload
            ];
        }
        case "UPDATE_STORE": {
            const newArray = [...state].map(store =>
                store.id !== action.payload.id ? store : action.payload
            );
            return newArray;
        }
        case "DELETE_STORE": {
            return [
                ...state.filter(store => store.id !== action.payload),
            ];
        }
    }
}
