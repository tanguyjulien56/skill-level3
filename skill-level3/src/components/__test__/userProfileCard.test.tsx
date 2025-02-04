import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import useUserData from "../../hooks/useUserData";
import UserProfileCard from "../UserProfileCard";

jest.mock("../../hooks/useUserData"); // Mock de useUserData

describe("UserProfileCard", () => {
  it("doit afficher l'image par défaut si imageUrl est vide", () => {
    // Mock de useUserData pour renvoyer des valeurs spécifiques
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: 10,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    // Rendu du composant
    const { getByAltText } = render(<UserProfileCard userData={userData} />);

    // Vérification que l'image par défaut est affichée
    const image = getByAltText("John Doe") as HTMLImageElement; // Cast à HTMLImageElement
    expect(image.src).toContain("/no_image_available.png");
  });

  it("doit afficher l'image utilisateur si imageUrl est présente", () => {
    // Mock de useUserData pour renvoyer une URL d'image
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "https://example.com/john_doe.jpg",
      daysToBirthday: 10,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    // Rendu du composant
    const { getByAltText } = render(<UserProfileCard userData={userData} />);

    // Vérification que l'image utilisateur est affichée
    const image = getByAltText("John Doe") as HTMLImageElement; // Cast à HTMLImageElement
    expect(image.src).toBe("https://example.com/john_doe.jpg");
  });

  it("doit afficher le message d'anniversaire avec un nombre de jours", () => {
    // Mock de useUserData pour renvoyer un nombre de jours avant l'anniversaire
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: 5,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    // Rendu du composant
    const { getByText } = render(<UserProfileCard userData={userData} />);

    // Vérification du message d'anniversaire
    expect(
      getByText("Votre anniversaire est dans 5 jours")
    ).toBeInTheDocument();
  });

  it("doit afficher un message générique si daysToBirthday n'est pas un nombre", () => {
    // Mock de useUserData pour renvoyer un message non-numérique
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: "Inconnu",
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    // Rendu du composant
    const { getByText } = render(<UserProfileCard userData={userData} />);

    // Vérification du message générique d'anniversaire
    expect(getByText("Inconnu")).toBeInTheDocument();
  });
});
