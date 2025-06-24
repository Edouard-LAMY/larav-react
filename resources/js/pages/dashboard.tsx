import { SliderCreate } from '@/components/Sliders/SliderCreate';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { MessageFlash, Slider, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function Dashboard({userCounter, sliders}: {userCounter: number, sliders: Slider[]}) {
    //Updated Slider 
    const [editingSlider, setEditingSlider] = useState<Slider | null>(null);

    console.log('====================================');
    console.log('ici ', sliders);
    console.log('====================================');

    // Modal Create Slider
    const [isModalCreateSliderOpen, setModalCreateSliderOpen] = useState<boolean>(false);

    //Message after submit
    const { flash } = usePage<MessageFlash>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {flash?.saved && (
                <Alert>
                    <AlertTitle>{flash?.saved}</AlertTitle>
                    <AlertDescription>{flash?.saved}</AlertDescription>
                </Alert>
            )}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-y-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="grid auto-rows-min gap-4">
                        <div className="flex justify-between p-3 items-center h-20 w-full border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border-3">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                Users
                            </div>
                            {userCounter}
                        </div>
                        <div className="h-20 w-full border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border-3">
                            
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                {/* ------------ SLIDERS ------------ */}
                <button onClick={() => {setEditingSlider(null); setModalCreateSliderOpen(true);} } className=" rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] cursor-pointer w-40 self-end">
                    Créer un slider
                </button>
                <div className="flex-1 justify-between border-sidebar-border/70 dark:border-sidebar-border relative h-150 overflow-hidden rounded-xl border md:min-h-min pt-5 overflow-y-auto">
                    <SliderCreate open={isModalCreateSliderOpen} onClose={() => setModalCreateSliderOpen(!isModalCreateSliderOpen)} slider={editingSlider}/>
                    {sliders?.map(slider => (
                        <div className="flex items-center w-full">
                            <div className={`flex h-80 w-full border-sidebar-border/70 dark:border-sidebar-border aspect-video overflow-hidden rounded-xl border-3 mb-3 mx-5`} key={slider.id} style={{ background: `url("${slider.image?.url}")` }}>
                                    {slider.title + ' ' + slider.subtitle} 
                            </div>
                            <button onClick={() => {setEditingSlider(slider); setModalCreateSliderOpen(true);} } className="rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] cursor-pointer w-40 mr-5">
                                Modifier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
