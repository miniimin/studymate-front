'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUser } from '@/api/user';
import { usePathname, useRouter } from 'next/navigation';

interface UserContextType {
    user: { nickname: string } | null;
    loading: boolean;
    isLoggedIn: boolean;
    setUser: (user: { nickname: string } | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    isLoggedIn: false,
    setUser: () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContextType["user"]>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetchUser();
                if (res.data.isLoggedIn) {
                    setUser({ nickname: res.data.nickname });
                } else {
                    setUser(null);
                    if (pathname !== '/login' && pathname !== '/join') {
                        router.push('/login');
                    }
                }
            } catch (err) {
                console.error(err);
                setUser(null);
                if (pathname !== '/login' && pathname !== '/join') {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                loading,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
