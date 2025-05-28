import { AbilityType, EAbilityType, RoleType } from "@/types/dashboard";

export type IAction =
    { type: "INITIAL_STATE", payload: { roles: RoleType[], allAbilities: string[] } } |
    { type: "ADD_ROLE", payload: RoleType } |
    { type: "UPDATE_ROLE", payload: RoleType } |
    { type: "DELETE_ROLE", payload: number };


export type IState = {
    roles: RoleType[],
    allAbilities: AbilityType[],
}


const rolesReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case "INITIAL_STATE": {

            const all_abilities: AbilityType[] = action.payload.allAbilities
                .map(ability => ({ name: ability.replace('-', ' '), ability: ability, type: EAbilityType.DENY }))

            return { ...state, roles: action.payload.roles, allAbilities: all_abilities };
        }
        case "ADD_ROLE": {
            return { ...state, roles: [...state.roles, action.payload] };
        }
        case "UPDATE_ROLE": {
            const newArray = [...state.roles];
            newArray.map(role => role.id !== action.payload.id ? role : action.payload);

            return { ...state, roles: newArray };
        }
        case "DELETE_ROLE": {
            return {
                ...state, roles: [...state.roles].filter(role => role.id !== action.payload)
            }
        }
        default: return { ...state };
    }
}

export default rolesReducer;

