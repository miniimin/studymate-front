'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useUser } from '@/context/UserContext';
import { logout } from '@/api/user';

interface NavbarProps {
    brand?: { label: string; href: string };
}

const Navbar: React.FC<NavbarProps> = ({
    brand = { label: '키플리', href: '/' },
}) => {
    const { user, isLoggedIn, loading, setUser } = useUser();
    const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await logout();
            setUser(null);
            alert('로그아웃 성공');
            window.location.href = '/';
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarInner}>
                <div className={styles.left}>
                    <div className={styles.brand}>
                        <Link href={brand.href}>{brand.label}</Link>
                    </div>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href={'/study/search'}>스터디찾기</Link>
                        </li>
                    </ul>
                </div>
                <ul className={styles.navList}>
                    {loading ? (
                        <li>정보를 불러오는 중입니다</li>
                    ) : (
                        (isLoggedIn ? (
                            <>
                                <li className={styles.navItem}>
                                    <Link href='/study/my-study'>나의 스터디</Link>
                                </li>
                                <li className={styles.navItemDropDown}
                                    onMouseEnter={() => setIsMyMenuOpen(true)}
                                    onMouseLeave={() => setIsMyMenuOpen(false)}>
                                    <span>{user?.nickname}님 환영합니다</span>
                                    {isMyMenuOpen && (
                                        <ul className={styles.dropDownMenu} onClick={handleLogout}>
                                            <li>로그아웃</li>
                                        </ul>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={styles.navItem}>
                                    <Link href='/login'>로그인</Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link href='/join'>회원가입</Link>
                                </li>
                            </>
                        )
                        )
                    )}
                </ul>
            </div >
        </nav >
    );
};

export default Navbar;