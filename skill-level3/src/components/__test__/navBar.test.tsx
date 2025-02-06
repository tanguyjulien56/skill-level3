import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

describe("NavBar", () => {
  test("Should display navigation links in DesktopMenu", () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Vérification des liens dans le DesktopMenu
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Informations").length).toBeGreaterThan(0);
  });

  test("Should display navigation links in MobileMenu", () => {
    render(
      <Router>
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
