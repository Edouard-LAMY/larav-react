import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

// ------ MESSAGE FLASH ------ 
export type MessageFlash = {
    flash?: {
      saved?: string;
      updated?: string;
      deleted?: string;
    };
}



// ------ USER ------ 
export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// ------ ROLES ------ 
export type Roles = {
    id: number;
    name: string;
    label: string;
}

// ------- SLIDERS -------
export type Slider = {
    id: number;
    title: string;
    subtitle: string;
    message: string;
    title_color: string;
    subtitle_color: string;
    background_color: string;
    text_button: string;
    button_style: ButtonStyle;
    button_link: string;
    image_id: number;
    is_active: boolean;
}

// ------ IMAGES ------ 
export type Image = {
    id: number;
    name: string;
    legend: string;
    alt: string;
}
