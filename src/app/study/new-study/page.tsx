'use client';
import { useEffect, useState } from 'react';
import globalStyles from "@/app/page.module.css";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { createStudy } from '@/api/study';

export default function NewStudyPage() {
  const today = new Date().toISOString().split('T')[0];
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    participantsMax: '1',
    startDate: today,
    endDate: '',
    alwaysRecruit: 'always',
    recruitDeadline: ''
  });

  const handleChange =
    (e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      startDate: `${form.startDate}T00:00:00`,
      endDate: `${form.endDate}T00:00:00`,
      recruitDeadline:
        form.alwaysRecruit === 'beforeStart'
          ? `${form.startDate}T00:00:00`
          : `${form.endDate}T00:00:00`
    };

    console.log(form);
    try {
      const res = await createStudy(payload); 
      alert('스터디가 만들어졌습니다.');
      router.push(`/study/detail-study/${res.data.id}`);
    } catch (err) {
      console.log(err)
      alert('스터디를 만드는데 실패했습니다.');
    }
  }

  const [deadlineOptionDisabled, setDeadlineOptionDisabled] = useState(true);

  useEffect(() => {
    if (form.participantsMax === '1') {
      setDeadlineOptionDisabled(true);
    } else {
      setDeadlineOptionDisabled(false);
    }
    console.log(form.alwaysRecruit);
  }, [form.participantsMax]);

  return (
    <>
      <div className={globalStyles.title}>스터디 만들기</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <span className={styles.label}>스터디 제목</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>스터디 설명</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>최대 인원</span>
          <select
            name="participantsMax"
            value={form.participantsMax}
            onChange={handleChange}
            className={styles.select}
          >
            {Array.from({ length: 10 }, (v, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}명 {i + 1 === 1 ? '(개인 스터디)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>스터디 시작일</span>
          <span className={styles.helpText}>오늘부터 일주일 이내의 날짜만 선택할 수 있어요</span>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className={styles.input}
            min={today}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>스터디 마감일</span>
          <span className={styles.helpText}>스터디 시작일 다음 날부터 1년 이내로 설정 가능합니다.</span>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className={styles.input}
            min={new Date(new Date(form.startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            max={new Date(new Date(form.startDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.label}>모집 마감 설정</span>
          <span className={styles.helpText}>모집 마감이 있으면 스터디 시작 전까지만 다른 이용자가 참여할 수 있어요. <br />
            모집 마감이 없으면 스터디 기간 동안 언제든지 참여 가능합니다.</span>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="alwaysRecruit"
                value="always"
                checked={form.alwaysRecruit === 'always'}
                onChange={handleChange}
                disabled={deadlineOptionDisabled}
              />
              모집 마감 없음 (자유로운 참여 가능)
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="alwaysRecruit"
                value="beforeStart"
                checked={form.alwaysRecruit === 'beforeStart'}
                onChange={handleChange}
                disabled={deadlineOptionDisabled}
              />
              모집 마감 있음 (스터디 시작일 전까지 참여 가능)
            </label>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          완성!
        </button>
      </form>
    </>)
}
