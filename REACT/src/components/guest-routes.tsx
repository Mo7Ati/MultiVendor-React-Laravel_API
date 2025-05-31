import { DashboardAuthContext } from '@/providers/dashboard-provider';
import { Spin } from 'antd';
import React, { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';


export const Guest = () => {
    const { user, loaded } = use(DashboardAuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && loaded) {
            navigate('/admin/dashboard');
        }
    }, [user, loaded]);

    return (!user && loaded) ? <Outlet /> : <Spin fullscreen />;
}

