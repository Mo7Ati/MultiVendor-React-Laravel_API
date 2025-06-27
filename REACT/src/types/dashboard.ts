import { Url } from "url";

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
    name: { ar: string, en: string };
    description: { ar: string, en: string };
    is_active: boolean,
    image: any;
    media: any;
    _method?: string;
}

export type ProductType = {
    id?: number;
    name: string;
    category_id?: number | string;
    category?: CategoryType;
    store_id: number | string;
    store?: StoreType | null;
    price: number;
    compare_price: number,
    quantity: number;
    tags: string[];
    description: string;
    image: any;
    image_url?: any;
    status: EStatus;
    removeImage?: boolean;
    _method?: string;
}
export type StoreType = {
    id?: number;
    media: {
        original_url?: string,
    }[],
    name: {
        en: string;
        ar: string;
    };
    address: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    keywords: {
        en: string;
        ar: string;
    };
    social_media: { platform: string, url: string };

    email: string;
    phone: string;
    password: string;
    logo: string;
    gallery: string[];
    is_active: boolean;
    rate: number;
};


export type TagType = {
    id?: number,
    label: string,
    value: string,
}

export type RoleType = {
    id?: number;
    name: string;
    abilities: AbilityType[];
}

export type AbilityType = {
    id?: number;
    ability?: string;
    name: string;
    type: EAbilityType;
}

export type AdminType = {
    id?: number;
    name: string;
    username: string;
    phone_number: number | string;
    email: string;
    status: EStatus;
    password: any;
    super_admin: boolean;
    roles: RoleType[];
}
