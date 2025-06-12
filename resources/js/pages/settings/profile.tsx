import { Roles, type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useMemo, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import MultiSelect from '@/components/ui/MultiSelect';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: route('profile'),
    },
];

type ProfileForm = {
    lastname: string;
    firstname: string;
    email: string;
    roles: any[];
}

export default function Profile({ mustVerifyEmail, status, roles, rolesUser }: { mustVerifyEmail: boolean; status?: string; roles: Roles[], rolesUser: any}) {
    const { auth } = usePage<SharedData>().props;

    const isAdmin = rolesUser.some((role: Roles) => role.name === 'admin');
    const rolesUserText = rolesUser.map((role: Roles) => rolesUser.length > 1 ? role.label + ' | ' : role.label);

    console.log('====================================');
    console.log('ici ', isAdmin, rolesUserText, rolesUser.length);
    console.log('====================================');

    //SELECT
    const [selectedRoles, setSelectedRoles] = useState(rolesUser);
    //UseMemo for retech option in select
    const roleOptions = useMemo(() => {
        const selectedIds = selectedRoles.map((role: Roles) => role.id);

        return roles.map((role) => ({
            value: role.id,
            label: role.label,
            color: '#3b82f6',
            isDisabled: selectedIds.length > 0 && selectedIds.includes(role.id), // Désactive seulement si sélection
        }));
    }, [roles, selectedRoles]);

    //FORMDATA
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        lastname: auth.user.lastname,
        firstname: auth.user.firstname,
        email: auth.user.email,
        roles: rolesUser.map((role: Roles) => role.id),
    });

    //SUBMIT
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Nom</Label>
                            <Input
                                id="lastname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="Nom"
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                disabled={processing}
                                placeholder="Nom"
                            />
                            <InputError message={errors.lastname} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="firstname">Prénom</Label>
                            <Input
                                id="firstname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="Prénom"
                                value={data.firstname}
                                onChange={(e) => setData('firstname', e.target.value)}
                                disabled={processing}
                                placeholder="Prénom"
                            />
                            <InputError message={errors.firstname} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        {isAdmin ? 
                            <div className="grid gap-2">
                                <div className="">
                                    <label className="block text-sm font-medium">Rôles</label>
                                    <MultiSelect
                                        options={roleOptions}
                                        value={selectedRoles}
                                        onChange={(value) => {
                                            setData('roles', value.map((role) => role.value));
                                            setSelectedRoles(value)
                                        }}
                                        placeholder="Choisir les rôles"
                                        id="roles"
                                    />
                                </div>
                            </div>
                            : 
                            <div className="grid gap-2">
                                <div className="">
                                    <label className="block text-sm font-medium">Vos rôles : {rolesUserText}</label>
                                </div>
                            </div>
                        }

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
