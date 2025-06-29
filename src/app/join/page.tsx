'use client'

import styles from './page.module.css';
import globalStyels from '@/app/page.module.css';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';


const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

export default function JoinPage() {
  const Router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //axios.post(`${apiUrl}/api/user`, form)
    Router.push('/login'); // 회원가입 후 로그인 페이지로 이동
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