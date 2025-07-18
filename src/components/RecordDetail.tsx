import React, { useEffect, useState } from 'react';
import styles from './RecordList.module.css';
import { modifyRecord, submitComment, modifyComment } from '@/api/study';
import { useUser } from '@/context/UserContext';

interface StudyComment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface RecordDetailProps {
  recordId: number;
  isAuthor: boolean;
  title: string;
  content: string;
  comments: StudyComment[];
  onCommentSubmit: (recordId: number) => void;
  onRecordModify: (recordId: any) => void;
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

export default function RecordDetail({ recordId, isAuthor, title, content, comments = [], onCommentSubmit, onRecordModify }: RecordDetailProps) {
  const { user } = useUser();

  const [comment, setComment] = useState('');
  const [modifyMode, setModifyMode] = useState(false);

  const [modifiedTitle, setModifiedTitle] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');

  const [modifycommentId, setModifyCommentId] = useState<number | null>(null);
  const [modifyCommentContent, setModifyCommentContent] = useState('');

  useEffect(() => {
    if (modifyMode) {
      setModifiedTitle(title);
      setModifiedContent(content);
    }
  }, [modifyMode, title, content]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await submitComment(recordId, comment);
    setComment('');
    onCommentSubmit(recordId);
  };

  const handleRecordModify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modifiedContent.trim() || !modifiedTitle.trim()) return;
    const res = await modifyRecord(recordId, {
      title: modifiedTitle,
      content: modifiedContent
    });
    setModifyMode(false);
    onRecordModify(res.data);
  }

  const handleCancleModify = () => {
    setModifiedTitle(title);
    setModifiedContent(content);
    setModifyMode(false);
  }

  const handleCommentModify = (c: StudyComment) => {
    setModifyCommentId(c.id);
    setModifyCommentContent(c.content);
  }

  const handleCommentModifySubmit = async () => {
    if (!modifyCommentContent.trim()) return;
    try {
      await modifyComment(modifycommentId, modifyCommentContent);
      setModifyCommentId(null);
      setModifyCommentContent('');
      onCommentSubmit(recordId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.recordBody}>
      {modifyMode ? (
        <form onSubmit={handleRecordModify} className={styles.modifyForm}>
          <h4>수정하기</h4>
          <p className={styles.label}>제목</p>
          <input
            name="title"
            className={styles.input}
            value={modifiedTitle}
            onChange={(e) => setModifiedTitle(e.target.value)}
          />
          <p className={styles.label}>내용</p>
          <textarea
            name="content"
            className={styles.textarea}
            value={modifiedContent}
            onChange={(e) => setModifiedContent(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button className={styles.modifyButton}>저장</button>
            <button type="button" className={styles.modifyButton} onClick={handleCancleModify}>
              취소
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.recordContent}>{content}</div>
          {isAuthor && <div className={styles.buttonGroup}>
            <button className={styles.modifyButton}
              onClick={() => setModifyMode(prev => !prev)}>
              수정
            </button>
          </div>}
        </>
      )
      }
      <h4>💬 댓글</h4>
      {
        comments.map((c) => (
          <ul key={c.id} className={styles.commentBody}>
            <li>{c.authorName}</li>
            {modifycommentId === c.id ? (
              <textarea className={styles.commentInput}
                value={modifyCommentContent}
                onChange={(e) => setModifyCommentContent(e.target.value)} />
            ) : (
              <>
                <li>{c.content}</li>
                <li>{formatDate(c.createdAt)}</li>
              </>
            )
            }<div className={styles.commentButtonGroup}>
              {user?.nickname === c.authorName &&
                modifycommentId === c.id ? (
                <>
                  <button className={styles.modifyButton}
                    onClick={() => handleCommentModifySubmit()}
                  >저장
                  </button>
                  <button className={styles.modifyButton}
                    onClick={() => {
                      setModifyCommentId(null);
                      setModifyCommentContent('');
                    }}
                  >취소
                  </button>
                </>
              ) : (
                <button className={styles.modifyButton}
                  onClick={() => handleCommentModify(c)}
                >수정
                </button>
              )}</div>
          </ul>
        ))
      }
      <form onSubmit={handleComment} className={styles.commentForm}>
        <textarea
          name="comment"
          placeholder="댓글 입력"
          className={styles.commentInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className={styles.commentButton}>등록</button>
      </form>
    </div >
  );
}