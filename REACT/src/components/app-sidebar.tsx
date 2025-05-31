import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from 'react-router-dom';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: "/admin/dashboard",
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        url: '/admin/dashboard/categories',
        icon: LayoutGrid,
        ability: 'view-categories',
    },
    {
        title: 'Stores',
        url: '/admin/dashboard/stores',
        icon: LayoutGrid,
        ability: 'view-stores',
    },
    {
        title: 'Products',
        url: '/admin/dashboard/products',
        icon: LayoutGrid,
        ability: 'view-products',
    },
    {
        title: 'Admins',
        url: '/admin/dashboard/admins',
        icon: LayoutGrid,
        ability: 'view-admins',
    },
    {
        title: 'Roles',
        url: '/admin/dashboard/roles',
        icon: LayoutGrid,
        ability: 'view-roles',
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         url: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         url: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard" prefetch={'intent'}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>


            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
