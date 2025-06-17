import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '../input-error';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ButtonStyle } from '@/types/enum';
import { Checkbox } from '../ui/checkbox';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SliderCreate({ open, onClose }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        subtitle: '',
        message: '',
        title_color: '',
        subtitle_color: '',
        background_color: '',
        text_button: '',
        button_style: ButtonStyle.Standard,
        button_link: '',
        is_active: false as boolean,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('message', data.message);
        formData.append('title_color', data.title_color);
        formData.append('subtitle_color', data.subtitle_color);
        formData.append('background_color', data.background_color);
        formData.append('text_button', data.text_button);
        formData.append('button_style', data.button_style);
        formData.append('button_link', data.button_link);
        formData.append('is_active', data.is_active);
        if (data.image) formData.append('image', data.image);

        console.log('====================================');
        console.log('quand je soumet le form ', data);
        console.log('====================================');

        post(route('slider.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    if (!open) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <h3 className='mb-5 font-bold text-lg'>Ajouter un slider</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input id="title" type="text" required autoFocus tabIndex={1} autoComplete="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Titre" />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title_color">Couleur du titre</Label>
                        <input id='title_color' type="color" value={data.title_color} className='rounded-md border bg-transparent' onChange={(e) => setData('title_color', e.target.value)}/>
                        <InputError message={errors.title_color} />
                    </div>

                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="subtitle">Sous titre</Label>
                        <Input id="subtitle" type="text" required autoFocus tabIndex={1} autoComplete="subtitle" value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} placeholder="Sous titre" />
                        <InputError message={errors.subtitle} />

                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subtitle_color">Couleur du sous titre</Label>
                        <input id='subtitle_color' type="color" value={data.subtitle_color} className='rounded-md border bg-transparent' onChange={(e) => setData('subtitle_color', e.target.value)}/>
                        <InputError message={errors.subtitle_color} />
                    </div>

                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea id="message" required tabIndex={1} rows={5} autoComplete="message" value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Message" className='rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm'/>
                    <InputError message={errors.message} />
                </div>

                <Separator/>

                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor='file'>Image</Label>
                        <input type="file" onChange={(e) => setData('image', e.target.files?.[0] ?? null)} className='cursor-pointer rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm w-full min-w-0' />
                        <InputError message={errors.image} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="background_color">Couleur de fond</Label>
                        <input id='background_color' type="color" value={data.background_color} className='rounded-md border bg-transparent' onChange={(e) => setData('background_color', e.target.value)}/>
                        <InputError message={errors.background_color} />
                    </div>
                </div>

                <Separator/>

                <div className="grid grid-cols-3 gap-6">
                     <div className="grid gap-2 col-span-2">
                        <Label htmlFor="button_link">Lien du bouton</Label>
                         <Input id="button_link" type="text" required autoFocus tabIndex={1} autoComplete="button_link" value={data.button_link} onChange={(e) => setData('button_link', e.target.value)} placeholder="https://mon-site.fr" />
                        <InputError message={errors.button_link} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="text_button">Style du bouton</Label>
                        <Select value={data.button_style} onValueChange={(value) => setData("button_style", value as ButtonStyle)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Style de bouton" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ButtonStyle).map(([label, val]) => (
                                    <SelectItem key={val} value={val}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid">
                    <Label htmlFor="is_active">Activer</Label>
                    <Checkbox className='mt-2' checked={data.is_active} onCheckedChange={(checked: boolean) => setData("is_active", !!checked)}/>
                </div>


                <Button type="submit" className="m-auto mt-4 w-full cursor-pointer bg-linear-20 from-sky-200 via-blue-400 to-indigo-900 to-90%" tabIndex={4} disabled={processing} >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Créer
                </Button>

            </form>
        </Modal>
    );
}
