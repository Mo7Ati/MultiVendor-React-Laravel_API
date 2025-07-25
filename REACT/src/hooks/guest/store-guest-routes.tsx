import { Loader } from '@/components/loader';
import { StoreDashboardAuthContext } from '@/providers/store-dashboard-provider';
import { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';



export const StoreGuestRoutes = () => {
    const { store, loaded } = use(StoreDashboardAuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (store && loaded) {
            navigate('/store/dashboard');
        }
    }, [store, loaded]);

    return (!store && loaded) ? <Outlet /> : <Loader />;
}

