import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import StoreForm from "./stores.form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stores',
        href: '/Stores',
    },
];



export default function CreateStore(props: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <StoreForm {...props} formType={'create'} />
            </div>
        </AppLayout >
    );
}
