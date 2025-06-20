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
import { fetchImage } from '@/lib/query';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function SliderCreate({ open, onClose }: Props) {
    // useForm Slider
    const { data: sliderData, setData: setSliderData, post: postSlider, processing: processingSlider, reset: resetSlider, errors: errorSlider } = useForm({
        title: '',
        subtitle: '',
        message: '',
        title_color: '#000000',
        subtitle_color: '#000000',
        background_color: '#000000',
        text_button: '',
        button_style: ButtonStyle.Standard,
        button_link: '',
        is_active: false as boolean,
        image_id: '',
    });

    //useForm Image
    const { data: imageData, setData: setImageData, post: postImage, processing: processingImage, reset: resetImage, errors: errorImage, setError: setImageError } = useForm({
        image: null as File | null,
        name: '',
        alt: '',
        legend: '',
    });

    //Create Image
    //on envois via axios car il faut un retour en json du controller (pas possible avec inertia via useForm)
    const sendImage = async () => {
        const formData = new FormData();
        if (imageData.image) formData.append('image', imageData.image);

        formData.append('name', imageData.name)
        formData.append('alt', imageData.alt)
        formData.append('legend', imageData.legend)

        try {
            const response = await fetchImage(formData);

            //reset errors
            setImageError({});

            return response;
        } catch (error: any) {
            // gestion des erreurs
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key: any) => {
                    setImageError(key, errors[key][0]);
                });
            } else {
                console.error('Erreur inconnue dans sendImage :', error);
            }
        }
    }

    // Submit to create Slider
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //create Image
        const uploadedImage: any = await sendImage();

        if (uploadedImage) {
            // set l'image_id
            setSliderData({
                ...sliderData,
                image_id: uploadedImage.image_id,
            });
    
            postSlider(route('slider.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    resetSlider();
                    onClose();
                    //envoyer un message de success
                },
            });
        }

    };

    useEffect(() => {
        if (!open) resetSlider();
    }, [open]);

    if (!open) return null;

    return (
        <Modal show={open} onClose={onClose}>
            <h3 className='mb-5 font-bold text-lg text-black'>Ajouter un slider</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="title" className={`text-black`}>Titre</Label>
                        <Input id="title" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="title" value={sliderData.title} onChange={(e) => setSliderData('title', e.target.value)} placeholder="Titre" />
                        <InputError message={errorSlider.title}  />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title_color" className={`text-black`}>Couleur du titre</Label>
                        <input id='title_color' type="color" value={sliderData.title_color} className='rounded-md border bg-transparent' onChange={(e) => setSliderData('title_color', e.target.value)}/>
                        <InputError message={errorSlider.title_color} />
                    </div>

                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="subtitle" className={`text-black`}>Sous titre</Label>
                        <Input id="subtitle" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="subtitle" value={sliderData.subtitle} onChange={(e) => setSliderData('subtitle', e.target.value)} placeholder="Sous titre" />
                        <InputError message={errorSlider.subtitle} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subtitle_color" className={`text-black`}>Couleur du sous titre</Label>
                        <input id='subtitle_color' type="color" value={sliderData.subtitle_color} className={`rounded-md border bg-transparent`} onChange={(e) => setSliderData('subtitle_color', e.target.value)}/>
                        <InputError message={errorSlider.subtitle_color} />
                    </div>
                </div>
                <div className="grid  gap-6">
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="message" className={`text-black`}>Message</Label>
                        <textarea id="message" required tabIndex={1} rows={5}  autoComplete="message" value={sliderData.message} onChange={(e) => setSliderData('message', e.target.value)} placeholder="Message" className={`rounded-md border bg-transparent px-3 py-1 text-base text-black shadow-xs md:text-sm ${errorSlider.message ? 'border-red-500' : ''}`}/>
                        <InputError message={errorSlider.message} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="background_color" className={`text-black`}>Couleur de fond</Label>
                    <input id='background_color' type="color" value={sliderData.background_color} className={`rounded-md border bg-transparent`} onChange={(e) => setSliderData('background_color', e.target.value)}/>
                    <InputError message={errorSlider.background_color} />
                </div>

                <Separator/>

                <div className="grid grid-cols-3 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor='file' className={`text-black`}>Image</Label>
                        <input type="file" onChange={(e) => setImageData('image', e.target.files?.[0] ?? null)} className={`cursor-pointer rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm w-full min-w-0 ${errorImage.image ? 'border-red-500' : ''}`}/>
                        <InputError message={errorImage.image} />
                    </div>
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="name" className={`text-black`}>Nom de l'image</Label>
                        <Input id="name" type="text" className={`text-black ${errorImage.name ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="name" value={imageData.name} onChange={(e) => setImageData('name', e.target.value)} placeholder="Nom de l'image" />
                        <InputError message={errorImage.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="alt" className={`text-black`}>Alt</Label>
                        <Input id="alt" type="text" className={`text-black ${errorImage.alt ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="alt" value={imageData.alt} onChange={(e) => setImageData('alt', e.target.value)} placeholder="Alt" />
                        <InputError message={errorImage.alt} />
                    </div>
                    <div className="grid gap-2 col-span-2">
                        <Label htmlFor="legend" className={`text-black ${errorImage.legend ? 'border-red-500' : ''}`}>Légende de l'image</Label>
                        <Input id="legend" type="text" className={`text-black ${errorImage.legend ? 'border-red-500' : ''}`} required autoFocus tabIndex={1} autoComplete="legend" value={imageData.legend} onChange={(e) => setImageData('legend', e.target.value)} placeholder="Légende de l'image" />
                        <InputError message={errorImage.legend} />
                    </div>
                </div>

                <Separator/>

                <div className="grid gap-2">
                    <Label htmlFor="button_link" className={`text-black`}>Lien du bouton</Label>
                        <Input id="button_link" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="button_link" value={sliderData.button_link} onChange={(e) => setSliderData('button_link', e.target.value)} placeholder="https://mon-site.fr" />
                    <InputError message={errorSlider.button_link} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="text_button" className={`text-black`}>Style du bouton</Label>
                        <Select value={sliderData.button_style} onValueChange={(value) => setSliderData("button_style", value as ButtonStyle)}>
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

                    <div className="grid gap-2">
                        <Label htmlFor="text_button" className={`text-black`}>Texte du bouton</Label>
                        <Input id="text_button" type="text" className={`text-black`} required autoFocus tabIndex={1} autoComplete="text_button" value={sliderData.text_button} onChange={(e) => setSliderData('text_button', e.target.value)} placeholder="Valider" />
                        <InputError message={errorSlider.text_button} />
                    </div>
                </div>

                <div className="grid">
                    <Label htmlFor="is_active" className={`text-black`}>Activer</Label>
                    <Checkbox className='mt-2' checked={sliderData.is_active} onCheckedChange={(checked) => setSliderData("is_active", !!checked)}/>
                </div>


                <Button type="submit" className="m-auto mt-4 w-full cursor-pointer bg-linear-20 from-sky-200 via-blue-400 to-indigo-900 to-90%" tabIndex={4} disabled={processingSlider} >
                    {processingSlider && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Créer
                </Button>

            </form>
        </Modal>
    );
}
