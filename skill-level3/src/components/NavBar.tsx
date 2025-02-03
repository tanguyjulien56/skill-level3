import { Link } from "react-router-dom";
import DesktopMenu from "./Menu/DeskTopMenu";
import MobileMenu from "./Menu/MobileMenu";

// Composant pour le menu mobile

export default function NavBar() {
  return (
    <div className="navbar fixed glass z-10">
      <div className="navbar-start">
        {/* Affichage du menu mobile avec le bouton burger */}
        <MobileMenu />
        {/* Logo avec lien vers la page d'accueil */}
        <Link to="/" className="btn btn-ghost text-xl">
          SkillLevel3
        </Link>
      </div>
      <div className="navbar-center">
        {/* Centre de la navbar, vide ici mais peut être utilisé pour ajouter du contenu */}
      </div>
      {/* Affichage du menu desktop */}
      <DesktopMenu />
    </div>
  );
}
