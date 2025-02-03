import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar fixed glass z-10">
      <div className="navbar-start">
        {/* Logo pour grand écran */}
        <Link to="/" className="btn btn-ghost text-xl">
          SkillLevel3
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Menu horizontal pour écrans larges */}
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/informations">Informations</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Bouton burger pour le menu mobile */}
        <div className="dropdown">
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
      </div>
    </div>
  );
}
