import { AdminType } from "@/types/dashboard";

export type IAction =
    { type: "INITIAL_STATE", payload: AdminType[] } |
    { type: "ADD_ADMIN", payload: AdminType } |
    { type: "UPDATE_ADMIN", payload: AdminType } |
    { type: "DELETE_ADMIN", payload: Number };

export default function adminsReducer(admins: AdminType[], action: IAction) {
    switch (action.type) {

        case "INITIAL_STATE": {
            return action.payload;
        }
        case "ADD_ADMIN": {
            return [
                ...admins, action.payload
            ];
        }
        case "UPDATE_ADMIN": {
            return [...admins].map(store =>
                store.id !== action.payload.id ? store : action.payload
            );;
        }
        case "DELETE_ADMIN": {
            return [
                ...admins.filter(store => store.id !== action.payload),
            ];
        }
    }
}
