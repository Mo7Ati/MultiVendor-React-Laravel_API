import { DashboardAuthContext } from '@/providers/dashboard-provider';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Loader } from './loader';


const Auth = () => {
    const { user, loaded } = useContext(DashboardAuthContext);
    console.log(user, loaded);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user && loaded) {
            navigate('/admin/login');
        }
    }, [user, loaded, navigate]);

    return (loaded && user) ? <Outlet /> : <Loader />

}
//  : <Spin fullscreen />
export default Auth;
