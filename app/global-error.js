"use client";

// Ошибка в самом каркасе сайта (layout): показываем текст ошибки и кнопку сброса
export default function GlobalError({ error }) {
  const clearData = () => {
    try {
      localStorage.removeItem("sport-quest-v1");
    } catch {}
    window.location.href = "/";
  };

  return (
    <html lang="ru">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#03090b", color: "#fff", fontFamily: "Segoe UI, sans-serif", padding: 20 }}>
        <div style={{ maxWidth: 480, width: "100%", background: "#07191d", borderRadius: 28, padding: 32, textAlign: "center", border: "1px solid rgba(217,228,229,.1)" }}>
          <h1 style={{ margin: 0, fontSize: 26 }}>Что-то пошло не так</h1>
          <pre style={{ marginTop: 16, background: "#03090b", color: "#ff8a3d", padding: 12, borderRadius: 12, fontSize: 12, whiteSpace: "pre-wrap", textAlign: "left" }}>
            {String(error?.message || error)}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, width: "100%", height: 48, border: 0, borderRadius: 16, background: "#18f5b5", fontWeight: 700, cursor: "pointer" }}>
            Обновить страницу
          </button>
          <button onClick={clearData} style={{ marginTop: 8, width: "100%", height: 48, borderRadius: 16, background: "transparent", color: "#d9e4e5", border: "1px solid rgba(217,228,229,.2)", fontWeight: 700, cursor: "pointer" }}>
            Сбросить данные сайта
          </button>
        </div>
      </body>
    </html>
  );
}
