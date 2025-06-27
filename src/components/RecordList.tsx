import React, { useState } from 'react';

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
    <section>
      <h2>기록 목록</h2>
      <ul>
        {records.map((r:any) => (
          <li key={r.id}>
            <div onClick={() => toggle(r.id)} className="recordHeader">
              📅 {new Date(r.date).toLocaleDateString()} / {r.title} / {r.author}
            </div>
            {openId === r.id && (
              <div className="recordBody">
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
                  >
                    <input name="comment" placeholder="댓글 입력" />
                    <button type="submit">등록</button>
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