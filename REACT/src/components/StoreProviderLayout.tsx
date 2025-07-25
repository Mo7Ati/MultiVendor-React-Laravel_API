import { StoreDashboardAuthProvider } from '@/providers/store-dashboard-provider'
import { Outlet } from 'react-router-dom'

const StoreProviderLayout = () => {
    return (
        <StoreDashboardAuthProvider>
            {<Outlet />}
        </StoreDashboardAuthProvider>
    )
}

export default StoreProviderLayout