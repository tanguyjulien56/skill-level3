import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserProfileCard from "../../components/UserProfileCard";
import { UserData } from "../../types/userService";

// Mock des données utilisateur
const mockUserData: UserData = {
  firstName: "John",
  lastName: "Doe",
  birthDate: "1990-01-01",
};

describe("UserProfileCard", () => {
  it("should render the user's image and name", () => {
    render(<UserProfileCard userData={mockUserData} />);

    // Vérifie que l'image est présente
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/no_image_available.png"
    ); // Par défaut l'image de remplacement
    expect(
      screen.getByAltText(`${mockUserData.firstName} ${mockUserData.lastName}`)
    ).toBeInTheDocument();

    // Vérifie que le nom complet est bien affiché
    expect(
      screen.getByText(`${mockUserData.firstName} ${mockUserData.lastName}`)
    ).toBeInTheDocument();
  });

  it("should display the correct number of days to birthday", () => {
    render(<UserProfileCard userData={mockUserData} />);

    // Vérifie que le texte concernant l'anniversaire est bien affiché
    expect(
      screen.getByText(/Votre anniversaire est dans \d+ jours/)
    ).toBeInTheDocument();
  });

  it("should display an error message when no birthDate is provided", () => {
    const mockUserDataWithoutBirthDate: UserData = {
      firstName: "Jane",
      lastName: "Doe",
      birthDate: "",
    };

    render(<UserProfileCard userData={mockUserDataWithoutBirthDate} />);

    // Vérifie que le texte de l'anniversaire invalide est affiché
    expect(
      screen.getByText("Date d'anniversaire invalide")
    ).toBeInTheDocument();
  });
});
