import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

interface NavbarProps {
    brand?: { label: string; href: string };
    leftLinks?: { label: string; href: string }[];
    rightLinks?: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({
    brand = { label: '키플리', href: '/' },
}) => {
    const leftNavLinks = [
        { label: '스터디찾기', href: '/study/search' },
    ];
    const loggedOutRightNavLinks = [
        { label: '나의 스터디', href: '/study/my-study' },
        { label: '로그인', href: '/login' },
        { label: '회원가입', href: '/join' },
    ];
    const loggedInRightNavLinks = [
        { label: '나의 스터디', href: '/study/my-study' },
    ];
    const isLoggedIn = false; // 추후 수정
    const rightNavLinks = isLoggedIn ? loggedInRightNavLinks : loggedOutRightNavLinks;
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarInner}>
                <div className={styles.left}>
                    <div className={styles.brand}>
                        <Link href={brand.href}>{brand.label}</Link>
                    </div>
                    <ul className={styles.navList}>
                        {leftNavLinks.map((link) => (
                            <li key={link.href} className={styles.navItem}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className={styles.navList}>
                    {rightNavLinks.map((link) => (
                        <li key={link.href} className={styles.navItem}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;