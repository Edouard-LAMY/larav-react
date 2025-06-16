import { SharedData, User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import FingerprintScriptLoader from '@/components/FingerprintScriptLoader';
import { useUsers } from '../lib/query';
import  NavFront from '@/components/ui/NavFront';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const { data: users, isLoading: usersLoading, error: usersError } = useUsers();

    // if (usersLoading) return <p>Chargement...</p>;
    // if (error) return <p>Erreur</p>;

    console.log('====================================');
    console.log('ici et la ', usersLoading, users);
    console.log('====================================');

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] relative">
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden fixed top-0 py-5 flex flex-wrap justify-center">
                    <NavFront />
                    <div className="absolute right-15">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                             <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Connexion
                                </Link>
                                <Link href={route('register')} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">Inscription
                                </Link>
                            </>
                        )}
                    </div>
                </header>
                {!usersLoading ? (
                    <div>
                        <ul className='columns-3 gap-8 mb-5'>
                            {users?.map((user: User) => (
                                <li key={user.id} className="flex-1 rounded-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:p-20 dark:text-[#000000] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">{user.lastname} {user.firstname}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <SkeletonCard repeat={3} />
                )}
            </div>
        </>
    );
}
