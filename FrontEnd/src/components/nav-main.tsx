import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePermissions } from '@/hooks/use-permissions';
import { type NavItem } from '@/types';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const location = useLocation();
    const can = usePermissions();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    !item.ability ? (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                                <Link to={item.url} prefetch={'intent'}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ) :
                        can(item.ability) && (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                                    <Link to={item.url} prefetch={'intent'}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
