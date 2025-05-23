import { categoriesContext } from "@/providers/categories-provider";
import { CategoryType, TagType } from "@/types/dashboard";
import { useContext } from "react";

export type IAction =
    { type: "INITIAL_STATE", payload: TagType[] } |
    { type: "UPDATE_TAGS", payload: TagType[] };


export default function tagsReducer(state: TagType[], action: IAction) {
    switch (action.type) {
        case "INITIAL_STATE": {
            return action.payload;
        }
        case "UPDATE_TAGS": {
            action.payload.forEach(tag => {
                if (!state.find(t => t.id === tag.id)) {
                    state.push(tag);
                }
            });

            return [
                ...state
            ];
        }
    }
}
