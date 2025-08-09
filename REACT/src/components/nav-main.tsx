import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePermissions } from '@/hooks/use-permissions';
import { type NavItem, type NavGroup } from '@/types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface NavMainProps {
    groups?: Array<NavGroup | NavItem>;
}

const NavItemComponent = ({ item, location }: { item: NavItem, location: any }) => {
    const can = usePermissions();
    
    if (item.ability && !can(item.ability)) {
        return null;
    }

    return (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                <Link to={item.url} prefetch={'intent'}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export function NavMain({ groups = [] }: NavMainProps) {
    const location = useLocation();
    
    return (
        <div className="space-y-6">
            {groups.map((group) => {
                // Handle both grouped and ungrouped items for backward compatibility
                const isGroup = 'items' in group;
                const items = isGroup ? group.items : [group];
                const title = isGroup ? group.title : '';
                
                return (
                    <SidebarGroup key={title || 'ungrouped'} className="px-2 py-0">
                        {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
                        <SidebarMenu>
                            {items.map((item) => (
                                <NavItemComponent 
                                    key={item.title} 
                                    item={item} 
                                    location={location} 
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </div>
    );
}
