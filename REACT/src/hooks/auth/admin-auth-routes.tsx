import { AdminDashboardAuthContext } from '@/providers/admin-dashboard-provider';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Loader } from '../../components/loader';


const AdminAuth = () => {
    const { user, loaded } = useContext(AdminDashboardAuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user && loaded) {
            navigate('/admin/login');
        }
    }, [user, loaded, navigate]);

    return (loaded && user) ? <Outlet /> : <Loader />

}
export default AdminAuth;
