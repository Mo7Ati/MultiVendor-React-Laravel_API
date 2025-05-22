import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import AdminForm from "./admins.form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admins',
    },
];



export default function CreateAdmin(props: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admins" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <AdminForm {...props} formType={'create'} />
            </div>
        </AppLayout >
    );
}
