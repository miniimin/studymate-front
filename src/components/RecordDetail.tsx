import React, { useState } from 'react';
import styles from './RecordList.module.css';
import { submitComment } from '@/api/study';
import { getComments } from '@/api/study';

interface StudyComment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface RecordDetailProps {
  recordId?: number;
  content?: string;
  comments?: StudyComment[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    hour12:false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RecordDetail({ recordId, content, comments }: RecordDetailProps) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<StudyComment[]>(comments || []);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitComment(recordId, comment);
    setComment('');
    const updatedComments = await getComments(recordId);
    setCommentList(updatedComments);
  };

  return (
    <div className={styles.recordBody}>
      <p>{content}</p>
      <h4>💬 댓글</h4>
      {(commentList || []).map((c) => (
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