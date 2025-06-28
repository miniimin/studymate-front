import React, { useState } from 'react';
import styles from './RecordList.module.css';

function RecordList({ records, isReadOnly } : any) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id : any) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleComment = (recordId:any, comment:any) => {
    console.log(`댓글 등록: ${recordId} - ${comment}`);
    // 서버 전송 또는 로컬 상태 업데이트
  };

  return (
    <section className={styles.recordSection}>
      <h2>기록 목록</h2>
      <ul className={styles.recordList}>
        {records.map((r:any) => (
          <li key={r.id}>
            <div onClick={() => toggle(r.id)}  className={styles.recordHeader}>
              <p>📅 {new Date(r.date).toLocaleDateString()} </p>
              <p> {r.title} </p>
              <p> {r.author} </p>
            </div>
            {openId === r.id && (
              <div className={styles.recordBody}>
                <p>{r.content}</p>
                <h4>💬 댓글</h4>
                <ul>
                  {(r.comments || []).map((c : any, i :any) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                {!isReadOnly && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
      
                    }}
                   className={styles.commentForm}>
                    <input name="comment" placeholder="댓글 입력"  className={styles.commentInput}/>
                    <button type="submit" className={styles.commentButton}>등록</button>
                  </form>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecordList;