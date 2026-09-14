import { useState } from "react";
import { useNavigate } from "react-router";
import "./Welcome.css";

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
    <div className="welcome">
      <h1 className="welcome-title">
        תחזית מזג האוויר
      </h1>

      <p className="welcome-text">
        אנא הכנס את שמך
      </p>

      <form className="welcome-form" onSubmit={handleSubmit}>
        <input
          className="welcome-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="שם המחפש"
        />

        <button className="welcome-button" type="submit">
          הירשם כאן
        </button>
      </form>
    </div>
  );
}

