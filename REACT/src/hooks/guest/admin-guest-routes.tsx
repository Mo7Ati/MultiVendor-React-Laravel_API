import { Loader } from '@/components/loader';
import { AdminDashboardAuthContext } from '@/providers/admin-dashboard-provider';
import { Spin } from 'antd';
import React, { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';


export const AdminGuestRoutes  = () => {
    const { user, loaded } = use(AdminDashboardAuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && loaded) {
            navigate('/admin/dashboard');
        }
    }, [user, loaded]);

    return (!user && loaded) ? <Outlet /> : <Loader/>;
}

