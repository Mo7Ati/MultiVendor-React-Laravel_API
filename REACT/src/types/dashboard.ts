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
    name: {
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
    category_id?: number | string;
    category?: CategoryType;
    store_id: number | string;
    store?: StoreType | null;
    price: number;
    compare_price: number,
    quantity: number;
    image_url?: any;
    is_active: boolean;
    is_accepted: boolean;
}


export type MediaType = {
    id?: number;
    model_type?: string;
    model_id?: number;
    uuid?: string;
    collection_name?: string;
    name?: string;
    file_name?: string;
    mime_type?: string;
    disk?: string;
    conversions_disk?: string;
    size?: number;
    manipulations?: any;
    custom_properties?: any;
    generated_conversions?: {
        [key: string]: boolean;
    };
    responsive_images?: any;
    order_column?: number;
    created_at?: string;
    updated_at?: string;
    original_url?: string;
    preview_url?: string;
}

export type StoreType = {
    id?: number;
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
    social_media: {
        platform: string,
        url: string
    }[];

    delivery_time: number;
    gallery_tmo?: string[];
    logo_tmp?: string[];

    email: string;
    phone: string;
    password: string;

    is_active: boolean;
    rate: number;
    category_id: number | null,
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
    email: string;
    password: any;
    roles: RoleType[];
}

export interface StoreCategoryType {
    id?: number;
    name: {
        en: string;
        ar: string;
    };
    description?: {
        en?: string;
        ar?: string;
    };
    created_at?: string;
    updated_at?: string;
}
export interface StoreCategoryIndexType {
    id?: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}
