import { NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { LayoutGrid } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const AdminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: "/admin/dashboard",
        icon: LayoutGrid,
    },
    {
        title: 'Store Categories',
        url: '/admin/dashboard/store-categories',
        icon: LayoutGrid,
        // ability: 'view-categories',
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


export const StoreNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: "/store/dashboard",
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        url: '/store/dashboard/categories',
        icon: LayoutGrid,
        ability: 'view-categories',
    },
    {
        title: 'Products',
        url: '/store/dashboard/products',
        icon: LayoutGrid,
        ability: 'view-products',
    },
];

export const AdminSidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        url: '/admin/dashboard/settings/profile',
        icon: null,
    },
    // {
    //     title: 'Password',
    //     url: '/admin/dashboard/settings/password',
    //     icon: null,
    // },
    {
        title: 'Appearance',
        url: '/admin/dashboard/settings/appearance',
        icon: null,
    },
];

export const StoreSidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        url: '/store/dashboard/settings/profile',
        icon: null,
    },
    {
        title: 'Appearance',
        url: '/store/dashboard/settings/appearance',
        icon: null,
    },
];