import { Link } from "react-router-dom";

const MobileMenu = () => (
  <div className="dropdown">
    {/* Bouton hamburger pour ouvrir le menu */}
    <label tabIndex={0} className="btn btn-ghost rounded-full lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </label>
    {/* Menu déroulant pour les petites écrans */}
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/informations">Informations</Link>
      </li>
    </ul>
  </div>
);
export default MobileMenu;