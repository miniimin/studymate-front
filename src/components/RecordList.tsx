import React, { useState } from 'react';
import styles from './RecordList.module.css';

function RecordList({ records, isParticipant }: any) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id: any) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const [comment, setComment] = useState('');
  console.log("참여중? " + isParticipant)

  const handleComment = (recordId: any, comment: any) => {
    console.log(`댓글 등록: ${recordId} - ${comment}`);
  };

  return (
    <section className={styles.recordSection}>
      <h2>기록 목록</h2>
      <ul className={styles.recordList}>
        <li className={styles.recordHeaderRow}>
          <p>📅 날짜</p>
          <p>제목</p>
          <p>작성자</p>
        </li>
          {(records || []).map((r: any) => (
            <li key={r.id}>
              <div onClick={() => toggle(r.id)} className={styles.recordHeader}>
                <p>📅 {new Date(r.createdAt).toLocaleDateString()} </p>
                <p> {r.title} </p>
                <p> {r.authorName} </p>
              </div>
              {isParticipant &&
                (openId === r.id && (
                  <div className={styles.recordBody}>
                    <p>{r.content}</p>
                    <h4>💬 댓글</h4>
                    <ul>
                      {(r.comments || []).map((c: any) => (
                        <ul key={c.id}>
                          <li>{c.authorName}</li>
                          <li>{c.content}</li>
                          <li>{c.createdAt}</li>
                        </ul>
                      ))}
                    </ul>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleComment(r.id, comment);
                      }}
                      className={styles.commentForm}>
                      <input
                        name="comment"
                        placeholder="댓글 입력"
                        className={styles.commentInput}
                        onChange={(e) => setComment(e.target.value)} />
                      <button type="submit" className={styles.commentButton}>등록</button>
                    </form>
                  </div>
                ))
              }
            </li>
          ))}
      </ul>
    </section>
  );
}

export default RecordList;