import { AbilityType, EAbilityType } from "@/types/dashboard"

export function useAbilities(abilities: string[]) {
    return abilities.map((ability: string) => {
        return ({
            name: ability,
            type: EAbilityType.DENY,
        });
    })
}
