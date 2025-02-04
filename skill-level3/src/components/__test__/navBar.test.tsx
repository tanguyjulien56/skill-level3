import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

describe("NavBar", () => {
  test("devrait afficher les liens de navigation dans DesktopMenu", () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Vérification des liens dans le DesktopMenu
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Informations").length).toBeGreaterThan(0);
  });

  test("devrait afficher les liens de navigation dans MobileMenu", () => {
    render(
      <Router>
        {" "}
        {/* Envelopper le composant avec Router */}
        <NavBar />
      </Router>
    );

    // Ouvrir le menu mobile en cliquant sur le bouton hamburger
    fireEvent.click(screen.getByLabelText(/menu/i));

    // Vérification des liens dans le MobileMenu
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0); // Vérifier qu'il y a au moins un "Home"
    expect(screen.getAllByText("Informations").length).toBeGreaterThan(0); // Vérifier qu'il y a au moins un "Informations"
  });
});
