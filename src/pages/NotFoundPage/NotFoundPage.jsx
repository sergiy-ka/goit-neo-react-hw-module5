import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className={css.link}>
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
