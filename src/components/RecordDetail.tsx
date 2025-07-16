import React, { useState } from 'react';
import styles from './RecordList.module.css';
import { submitComment } from '@/api/study';

interface StudyComment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface RecordDetailProps {
  recordId: number;
  isAuthor: boolean;
  content: string;
  comments: StudyComment[];
  onCommentSubmit: (recordId: number) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RecordDetail({ recordId, isAuthor, content, comments = [], onCommentSubmit }: RecordDetailProps) {
  const [comment, setComment] = useState('');

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await submitComment(recordId, comment);
    setComment('');
    onCommentSubmit(recordId);
  };

  return (
    <div className={styles.recordBody}>
      <div className={styles.recordContent}>{content}</div>
      {isAuthor && <div className={styles.buttonGroup}>
        <button className={styles.modifyButton}>수정</button>
      </div>}
      <h4>💬 댓글</h4>
      {comments.map((c) => (
        <ul key={c.id} className={styles.commentBody}>
          <li>{c.authorName}</li>
          <li>{c.content}</li>
          <li>{formatDate(c.createdAt)}</li>
        </ul>
      ))}
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