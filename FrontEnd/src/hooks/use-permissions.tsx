import { DashboardAuthContext } from "@/providers/dashboard-provider";
import { useContext } from "react";


export function usePermissions() {
    const { permissions, user } = useContext(DashboardAuthContext);

    return (ability: string) => {

        if (user?.super_admin) {
            return true;
        }

        return permissions.includes(ability);
    };
}
