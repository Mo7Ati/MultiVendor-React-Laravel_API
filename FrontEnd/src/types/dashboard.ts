export enum EStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}
export enum EAbilityType {
    ALLOW = 'allow',
    DENY = 'deny',
}

export type CategoryType = {
    id?: number;
    name: string;
    description: string;
    image: any;
    image_url: any;
    status: EStatus;
    parent: CategoryType | null;
    parent_id: number | string | null;
    removeImage: boolean;
    _method?: string;
}

export type ProductType = {
    id?: number;
    name: string;
    category_id: number;
    category: CategoryType;
    store_id: number;
    store: StoreType; //edit later
    price: number;
    compare_price: number,
    quantity: number;
    tags: string[];
    description: string;
    image: any;
    image_url: any;
    status: EStatus;
    removeImage: boolean;
    _method: string;
}

export type StoreType = {
    id: number;
    name: string;
    logo_image: any;
    logo_url: string;
    description: string;
    status: EStatus;
    _method: 'PUT' | 'POST';
    removeImage: boolean;
}

export type TagType = {
    id: number,
    name: string,
}

export type RoleType = {
    id: number;
    name: string;
    abilities: AbilityType[];
}

export type AbilityType = {
    id?: number;
    ability?: string;
    name: string;
    type: EAbilityType;
}

export enum EForm {
    CREATE = 'create',
    EDIT = 'edit',
}

export type AdminType = {
    id: number;
    name: string;
    username: string;
    phone_number: number;
    email: string;
    status: EStatus;
    password: any;
    super_admin: boolean;
    roles: RoleType[];
}
