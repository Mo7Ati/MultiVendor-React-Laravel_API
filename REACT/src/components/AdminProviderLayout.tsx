import { AdminDashboardAuthProvider } from '@/providers/admin-dashboard-provider'
import { Outlet } from 'react-router-dom'


const AdminProviderLayout = () => {
    return (
        <AdminDashboardAuthProvider>
            {<Outlet />}
        </AdminDashboardAuthProvider>
    )
}

export default AdminProviderLayout