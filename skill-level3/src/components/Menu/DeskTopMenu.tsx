import { Link } from "react-router-dom";


// Composant pour le menu desktop
const DesktopMenu = () => (
  <div className="navbar-end hidden lg:flex">
    {/* Menu horizontal pour les écrans larges */}
    <ul className="menu menu-horizontal px-1 gap-4">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/informations">Informations</Link>
      </li>
    </ul>
  </div>
);

export default DesktopMenu;
