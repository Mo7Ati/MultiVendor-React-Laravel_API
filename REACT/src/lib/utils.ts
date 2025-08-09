import { NavGroup, NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { LayoutGrid, Package, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const AdminNavItems: NavGroup[] = [
    {
        title: 'Main',
        items: [
            {
                title: 'Dashboard',
                url: "/admin/dashboard",
                icon: LayoutGrid,
            }
        ]
    },
    {
        title: 'User Management',
        items: [
            {
                title: 'Admins',
                url: '/admin/dashboard/admins',
                icon: Users,
                ability: 'view-admins',
            },
            {
                title: 'Roles',
                url: '/admin/dashboard/roles',
                icon: Users,
                ability: 'view-roles',
            },
        ]
    },
    {
        title: 'Store Management',
        items: [
            {
                title: 'Store Categories',
                url: '/admin/dashboard/store-categories',
                icon: Package,
            },
            {
                title: 'Stores',
                url: '/admin/dashboard/stores',
                icon: Package,
                ability: 'view-stores',
            },
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'Products',
                url: '/admin/dashboard/products',
                icon: Package,
                ability: 'view-products',
            },
            {
                title: 'Orders',
                url: '/admin/dashboard/orders',
                icon: Package,
                ability: 'view-orders',
            },
        ]
    },
];

export const StoreNavItems: NavGroup[] = [
    {
        title: 'Main',
        items: [
            {
                title: 'Dashboard',
                url: "/store/dashboard",
                icon: LayoutGrid,
            }
        ]
    },
    {
        title: 'Catalog',
        items: [
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
        ]
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