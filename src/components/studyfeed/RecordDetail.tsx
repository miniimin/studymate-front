import React, { useState } from 'react';
import styles from './RecordDetail.module.css';
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

const RecordDetail = ({
  recordId,
  isAuthor,
  title,
  content,
  comments = [],
  onCommentSubmit,
  onRecordModify
}: RecordDetailProps) => {
  const { user } = useUser();

  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const handleRecordEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedContent.trim() || !editedTitle.trim()) return;
    const res = await modifyRecord(recordId, {
      title: editedTitle,
      content: editedContent
    });
    setIsEditingRecord(false);
    onRecordModify(res.data);
  }

  const handleNewCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;
    await submitComment(recordId, newCommentContent);
    setNewCommentContent('');
    onCommentSubmit(recordId);
  };

  const handleEditedCommentSubmit = async () => {
    if (!editedCommentContent.trim()) return;
    try {
      await modifyComment(editingCommentId, editedCommentContent);
      setEditingCommentId(null);
      setEditedCommentContent('');
      onCommentSubmit(recordId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.recordBody}>
      {isEditingRecord ? (
        <form onSubmit={handleRecordEditSubmit} className={styles.modifyForm}>
          <h4>수정하기</h4>
          <p className={styles.label}>제목</p>
          <input
            className={styles.input}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <p className={styles.label}>내용</p>
          <textarea
            className={styles.textarea}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button className={styles.modifyButton}>저장</button>
            <button type="button"
              className={styles.modifyButton}
              onClick={() => setIsEditingRecord(false)}>
              취소
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.recordContent}>{content}</div>
          {isAuthor &&
            <div className={styles.buttonGroup}>
              <button className={styles.modifyButton}
                onClick={() => {
                  setIsEditingRecord(true);
                  setEditedTitle(title);
                  setEditedContent(content);
                }}>
                수정
              </button>
            </div>}
        </>
      )
      }
      <h4>💬 댓글</h4>
      {comments.map((c) => (
        <div key={c.id} className={styles.commentBody}>
          <span>{c.authorName}</span>
          {editingCommentId === c.id ? (
            <textarea className={styles.commentInput}
              value={editedCommentContent}
              onChange={(e) =>
                setEditedCommentContent(e.target.value)} />
          ) : (
            <>
              <span>{c.content}</span>
              <span>{formatDate(c.createdAt)}</span>
            </>
          )}
          <div className={styles.commentButtonGroup}>
            {user?.nickname === c.authorName &&
              editingCommentId === c.id ? (
              <>
                <button className={styles.modifyButton}
                  onClick={() =>
                    handleEditedCommentSubmit()}
                >저장
                </button>
                <button className={styles.modifyButton}
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditedCommentContent('');
                  }}
                >취소
                </button>
              </>
            ) : (
              <button className={styles.modifyButton}
                onClick={() => {
                  setEditingCommentId(c.id);
                  setEditedCommentContent(c.content);
                }}
              >수정
              </button>
            )}
          </div>
        </div>
      )
      )}
      <form onSubmit={handleNewCommentSubmit} className={styles.commentForm}>
        <textarea
          placeholder="댓글 입력"
          className={styles.commentInput}
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
        <button type="submit" className={styles.commentButton}>등록</button>
      </form>
    </div >
  );
}

export default RecordDetail;