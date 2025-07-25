import { DashboardAuthContext } from '@/providers/admin-dashboard-provider';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { StoreDashboardAuthContext } from '@/providers/store-dashboard-provider';


const StoreAuth = () => {
    const { store, loaded } = useContext(StoreDashboardAuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!store && loaded) {
            navigate('/store/login');
        }
    }, [store, loaded, navigate]);

    return (loaded && store) ? <Outlet /> : <Loader />

}
export default StoreAuth;
