import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@headlessui/react';
import axiosClient from '@/axios-client';
import { AdminDashboardAuthContext } from '@/providers/admin-dashboard-provider';
import { use } from 'react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user, type }: { user: UserMenuContentProps, type: 'admin' | 'store' }) {
    const cleanup = useMobileNavigation();
    const navigate = useNavigate();
    const { setUser } = use(AdminDashboardAuthContext);
    console.log(user);

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" to={`/${type}/dashboard/settings/profile`} prefetch={'intent'} onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Button className="block w-full" onClick={(e) => {
                    cleanup();
                    axiosClient.post('/admin/logout')
                        .then(res => {
                            setUser(null);
                            navigate('/admin/login');
                        });
                }} >
                    <LogOut className="mr-2" />
                    Log out
                </Button>
            </DropdownMenuItem >
        </>
    );
}
