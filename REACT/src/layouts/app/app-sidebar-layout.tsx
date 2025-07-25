import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AdminDashboardAuthContext } from '@/providers/admin-dashboard-provider';
import { StoreDashboardAuthContext } from '@/providers/store-dashboard-provider';
import { type BreadcrumbItem } from '@/types';
import { useContext, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { user } = useContext(AdminDashboardAuthContext);
    const { store } = useContext(StoreDashboardAuthContext);

    return (
        <AppShell variant="sidebar">
            <AppSidebar type={user ? 'admin' : 'store'} user={user ? user : store!} />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
