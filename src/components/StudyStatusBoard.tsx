function StudyStatusBoard({ members } : any) {
  const sorted = [...members].sort((a, b) => {
    if (b.recordCount === a.recordCount) {
      return new Date(a.lastRecord).getTime() - new Date(b.lastRecord).getTime();
    }
    return b.recordCount - a.recordCount;
  });

  return (
    <section>
      <h2>스터디 현황</h2>
      <table>
        <thead>
          <tr><th>순위</th><th>이름</th><th>기록 수</th></tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr key={m.id}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.recordCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StudyStatusBoard;