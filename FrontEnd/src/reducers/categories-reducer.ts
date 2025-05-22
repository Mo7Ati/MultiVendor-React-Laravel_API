import { categoriesContext } from "@/providers/categories-provider";
import { CategoryType } from "@/types/dashboard";
import { useContext } from "react";

type IAction =

    { type: "INITIAL_STATE", payload: CategoryType[] } |
    { type: "ADD_CATEGORY", payload: CategoryType } |
    { type: "UPDATE_CATEGORY", payload: CategoryType } |
    { type: "DELETE_CATEGORY", payload: Number };






export default function categoriesReducer(state: CategoryType[], action: IAction) {
    switch (action.type) {
        case "INITIAL_STATE": {
            return action.payload;
        }
        case "ADD_CATEGORY": {
            return [
                ...state, action.payload
            ];
        }
        case "UPDATE_CATEGORY": {
            const newArray = [...state].map(category =>
                category.id !== action.payload.id ? category : action.payload
            );
            return newArray;
        }
        case "DELETE_CATEGORY": {
            return [
                ...state.filter(category => category.id !== action.payload),
            ];
        }
    }
}
