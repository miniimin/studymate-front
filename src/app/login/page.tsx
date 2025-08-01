'use client';

import styles from './page.module.css';
import globalStyles from '@/app/page.module.css';
import { useState } from 'react';
import { login } from '@/api/user';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      alert('로그인 성공');
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 실패');
    }
  };

  return (
    <>
      <div className={globalStyles.title}>로그인</div>
      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            className={styles.loginInput}
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.loginInput}
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.loginButton}>로그인</button>
        </form>
      </div>
    </>
  );
}