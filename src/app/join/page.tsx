'use client'

import styles from './page.module.css';
import globalStyels from '@/app/page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postUser } from '@/api/user';

export default function JoinPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postUser(form);
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (e) {
      alert('회원가입에 실패했습니다.' + e);
    }
  };

  return (<>
    <div className={globalStyels.title}>회원가입</div>
    <div className={styles.joinFormContainer}>
      <form className={styles.joinForm} onSubmit={handleSubmit}>
        <input
          className={styles.joinInput}
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.joinInput}
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        <input
          className={styles.joinInput}
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.joinInput}
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.joinButton}>가입하기</button>
      </form>
    </div>
  </>)
}