import { NavGroup, NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { LayoutGrid, Package, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

/**
 * Format a number as a currency string
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param currency - The currency code to use (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string or Date object into a human-readable format
 * @param date - The date to format (string, number, or Date object)
 * @param options - Intl.DateTimeFormatOptions to customize the output format
 * @returns Formatted date string
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
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
        title: 'Product Management',
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