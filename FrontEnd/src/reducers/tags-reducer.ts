import { CategoryType, TagType } from "@/types/dashboard";

export type IAction =
    { type: "INITIAL_STATE", payload: TagType[] } |
    { type: "UPDATE_TAGS", payload: string[] };


export default function tagsReducer(state: TagType[], action: IAction) {
    switch (action.type) {
        case "INITIAL_STATE": {
            return action.payload;
        }
        case "UPDATE_TAGS": {
            const newArray = [...state];
            action.payload.forEach(t => {
                if (!newArray.find(tag => tag.value === t)) {
                    newArray.push({ label: t, value: t });
                }
            })
            return newArray;
        }
    }
}
