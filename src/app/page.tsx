'use client';
import { useUser } from '@/context/UserContext';
import LoginPage from './login/page';
import Home from './main/page';

export default function Main() {
  const { isLoggedIn } = useUser();

  return (
    <div>
      {isLoggedIn ? <Home /> : <LoginPage />}
    </div>
  );
}
