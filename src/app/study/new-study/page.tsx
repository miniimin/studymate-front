'use client';
import { useState } from 'react';
import globalStyles from "@/app/page.module.css";
import styles from './page.module.css';

export default function NewStudyPage() {
  const today = new Date().toISOString().split('T')[0];
    const [form, setForm] = useState({
    title: '',
    description: '',
    maxParticipants: 1,
    startDate: today,
    endDate: '',
    deadlineOption: 'none', // 'none' | 'custom'
    deadline: ''
  });
  return (
    <>
      <div className={globalStyles.title}>스터디 생성 페이지</div>
      <form className={styles.form} >
        <div className={styles.formGroup}>
          <label className={styles.label}>스터디 제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
         
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>스터디 설명</label>
          <textarea
            name="description"
            value={form.description}
       
            className={styles.textarea}
            rows={4}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>최대 인원</label>
          <select
            name="maxParticipants"
            value={form.maxParticipants}

            className={styles.select}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}명 {i + 1 === 1 ? '(개인 스터디)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>스터디 시작일</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
   
            className={styles.input}
            min={today}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>스터디 마감일</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}

            className={styles.input}
            min={form.startDate}
            max={new Date(new Date(form.startDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>모집 마감일 설정</span>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deadlineOption"
                value="none"
                checked={form.deadlineOption === 'none'}
          
              />
              마감일 없음
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deadlineOption"
                value="custom"
                checked={form.deadlineOption === 'custom'}

              />
              마감일 있음
            </label>
          </div>
          {form.deadlineOption === 'custom' && (
            <input
              type="date"
              name="deadline"
              value={form.deadline}

              className={styles.input}
              min={today}
              max={new Date(new Date(form.startDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              required
            />
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          완성!
        </button>
      </form>
    </>)
}