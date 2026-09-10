import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>

      <p>העמוד לא נמצא.</p>

      <Link to="/">חזרה לדף הבית</Link>
    </div>
  );
}