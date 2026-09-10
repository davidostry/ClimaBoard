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
      <h1>Welcome to ClimaBoard</h1>

      <p>Enter your explorer name</p>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Explorer name"
        />

        <button type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}