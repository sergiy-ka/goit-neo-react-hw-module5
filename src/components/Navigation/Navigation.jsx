import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const generateActiveClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.isActive);
};

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={generateActiveClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={generateActiveClass}>
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
