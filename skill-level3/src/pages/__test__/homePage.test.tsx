import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as redux from "react-redux"; 
import HomePage from "../HomePage";

jest.mock("react-redux"); // Mock de tout le module react-redux

describe("HomePage", () => {
  it("doit afficher un message d'erreur si aucune donnée utilisateur n'est disponible", () => {
    // Utilisation de jest.spyOn pour espionner useSelector
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue({
      firstName: "",
      lastName: "",
      birthDate: null,
    });

    // Rendu du composant
    const { getByText } = render(<HomePage />);

    // Vérification de l'affichage du message d'erreur
    expect(
      getByText("Aucune donnée utilisateur disponible")
    ).toBeInTheDocument();
  });

  it("doit afficher le UserProfileCard si des données utilisateur valides sont présentes", () => {
    // Simule useSelector pour retourner des données utilisateur valides
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    });

    // Rendu du composant
    const { getByText } = render(<HomePage />);

    // Vérification de l'affichage des données utilisateur dans le UserProfileCard
    expect(getByText("John Doe")).toBeInTheDocument(); // Vérifie que le texte "John Doe" est dans le document
  });
});
