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
        is_active: false,
        image: null as File | null,
        image_id: '',
        name: '',
        alt: '',
        legend: '',
    });

    //Create Image
    const sendImage = async () => {
        const formData = new FormData();
        if (data.image) formData.append('image', data.image);

        formData.append('name', data.name)
        formData.append('alt', data.alt)
        formData.append('legend', data.legend)

        post(route('image.store'), {
            preserveScroll: true,
        });
    }

    // Submit to create Slider
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //create Image
        const uploadedImage: any = await sendImage();

        
        if (!uploadedImage) {
            return;
        }

        // set l'image_id
        setData('image_id', uploadedImage.id);

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
        formData.append('is_active', data.is_active ? '1' : '0');

        console.log('====================================');
        console.log('quand je soumet le form ', data);
        console.log('====================================');

        // post(route('slider.store'), {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         reset();
        //         onClose();
        //     },
        // });
    };



    useEffect(() => {
        if (!open) reset();
    }, [open]);

    if (!open) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <h3 className='mb-5 font-bold text-lg text-black'>Ajouter un slider</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="title" className={`text-black`}>Titre</Label>
                        <Input id="title" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Titre" />
                        <InputError message={errors.title}  />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title_color" className={`text-black`}>Couleur du titre</Label>
                        <input id='title_color' type="color" value={data.title_color} className='rounded-md border bg-transparent' onChange={(e) => setData('title_color', e.target.value)}/>
                        <InputError message={errors.title_color} />
                    </div>

                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="subtitle" className={`text-black`}>Sous titre</Label>
                        <Input id="subtitle" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="subtitle" value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} placeholder="Sous titre" />
                        <InputError message={errors.subtitle} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subtitle_color" className={`text-black`}>Couleur du sous titre</Label>
                        <input id='subtitle_color' type="color" value={data.subtitle_color} className={`rounded-md border bg-transparent`} onChange={(e) => setData('subtitle_color', e.target.value)}/>
                        <InputError message={errors.subtitle_color} />
                    </div>
                </div>
                <div className="grid  gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="message" className={`text-black`}>Message</Label>
                        <textarea id="message" required tabIndex={1} rows={5}  autoComplete="message" value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Message" className={`rounded-md border bg-transparent px-3 py-1 text-base text-black shadow-xs md:text-sm ${errors.message ? 'border-red-500' : ''}`}/>
                        <InputError message={errors.message} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="background_color" className={`text-black`}>Couleur de fond</Label>
                    <input id='background_color' type="color" value={data.background_color} className={`rounded-md border bg-transparent`} onChange={(e) => setData('background_color', e.target.value)}/>
                    <InputError message={errors.background_color} />
                </div>

                <Separator/>

                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor='file' className={`text-black`}>Image</Label>
                        <input type="file" onChange={(e) => setData('image', e.target.files?.[0] ?? null)} className={`cursor-pointer rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm w-full min-w-0 ${errors.image ? 'border-red-500' : ''}`}/>
                        <InputError message={errors.image} />
                    </div>
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="name" className={`text-black`}>Nom de l'image</Label>
                        <Input id="name" type="text" className={`text-black ${errors.name ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nom de l'image" />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="alt" className={`text-black`}>Alt</Label>
                        <Input id="alt" type="text" className={`text-black ${errors.alt ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="alt" value={data.alt} onChange={(e) => setData('alt', e.target.value)} placeholder="Alt" />
                        <InputError message={errors.alt} />
                    </div>
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="legend" className={`text-black ${errors.legend ? 'border-red-500' : ''}`}>Légende de l'image</Label>
                        <Input id="legend" type="text" className={`text-black ${errors.legend ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="legend" value={data.legend} onChange={(e) => setData('legend', e.target.value)} placeholder="Légende de l'image" />
                        <InputError message={errors.legend} />
                    </div>
                </div>

                <Separator/>

                <div className="grid grid-cols-3 gap-6">
                     <div className="grid gap-2 col-span-2">
                        <Label htmlFor="button_link" className={`text-black`}>Lien du bouton</Label>
                         <Input id="button_link" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="button_link" value={data.button_link} onChange={(e) => setData('button_link', e.target.value)} placeholder="https://mon-site.fr" />
                        <InputError message={errors.button_link} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="text_button" className={`text-black`}>Style du bouton</Label>
                        <Select value={data.button_style} onValueChange={(value) => setData("button_style", value as ButtonStyle)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Style de bouton"  />
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
                    <Label htmlFor="is_active" className={`text-black`}>Activer</Label>
                    <Checkbox className='mt-2' checked={data.is_active} onCheckedChange={(checked) => setData("is_active", !!data.is_active)}/>
                </div>


                <Button type="submit" className="m-auto mt-4 w-full cursor-pointer bg-linear-20 from-sky-200 via-blue-400 to-indigo-900 to-90%" tabIndex={4} disabled={processing} >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Créer
                </Button>

            </form>
        </Modal>
    );
}
