import { DashboardAuthContext } from '@/providers/dashboard-provider';
import { Spin } from 'antd';
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const Auth = () => {
    const { user, loaded } = useContext(DashboardAuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user && loaded) {
            navigate('/admin/login');
        }
    }, [user, loaded, navigate]);

    return (loaded && user) ? <Outlet /> : <Spin fullscreen />;
}

export default Auth;
