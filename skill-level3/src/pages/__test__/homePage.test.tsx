import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import * as redux from "react-redux";
import HomePage from "../HomePage";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-redux"); // Mock de tout le module react-redux

describe("HomePage", () => {
  it("Should display an error message if no user data is available", () => {
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

  it("Should display the `UserProfileCard` if valid user data is available", async () => {
    // Simule useSelector pour retourner des données utilisateur valides
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    });

    // Rendu du composant
    const { getByText } = render(<HomePage />);

    // Attendre le rendu du UserProfileCard
    await waitFor(() => expect(getByText("John Doe")).toBeInTheDocument());
  });
});
