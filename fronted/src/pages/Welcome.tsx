import { useState } from "react";
import { useNavigate } from "react-router";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    localStorage.setItem("explorerName", name.trim());
    navigate("/app");
  }

  return (
    <div>
      <h1>ברוך הבא ללוח התחזית</h1>

      <p>אנא הכנס את שמך</p>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="שם המחפש"
        />

        <button type="submit">
          הירשם כאן
        </button>
      </form>
    </div>
  );
}