import { AdminDashboardAuthContext, DashboardAuthContext } from "@/providers/admin-dashboard-provider";
import { useContext } from "react";


export function usePermissions() {
    const { permissions, user } = useContext(AdminDashboardAuthContext);

    return (ability: string) => {

        if (user?.super_admin) {
            return true;
        }

        return true;//permissions.includes(ability);
    };
}
