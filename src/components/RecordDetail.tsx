import React, { useState } from 'react';
import styles from './RecordList.module.css';
import { submitComment } from '@/api/study';

interface StudyComment {
  commentId: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface RecordDetailProps {
  recordId?: number;
  content?: string;
  comments?: StudyComment[];
}

export default function RecordDetail({ recordId, content, comments }: RecordDetailProps) {
  const [comment, setComment] = useState('');

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitComment(recordId, comment);
    setComment('');
  };

  return (
    <div className={styles.recordBody}>
      <p>{content}</p>
      <h4>💬 댓글</h4>
      <ul>
        {(comments || []).map((c) => (
          <ul key={c.commentId}>
            <li>{c.authorName}</li>
            <li>{c.content}</li>
            <li>{c.createdAt}</li>
          </ul>
        ))}
      </ul>
      <form onSubmit={handleComment} className={styles.commentForm}>
        <input
          name="comment"
          placeholder="댓글 입력"
          className={styles.commentInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className={styles.commentButton}>등록</button>
      </form>
    </div>
  );
}