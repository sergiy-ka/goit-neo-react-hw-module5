import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const generateActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={generateActiveClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={generateActiveClass}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
