'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUser } from '@/api/user';

interface UserContextType {
    user: { nickname: string } | null;
    loading: boolean;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (user: { nickname: string } | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    setUser: () =>{}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContextType["user"]>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchUser()
            .then(res => {
                if (res.data.isLoggedIn) {
                    setUser({ nickname: res.data.nickname });
                } else {
                    setUser(null);
                }
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            })
            .finally(() => setLoading(false))
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                loading,
                setIsLoggedIn,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
