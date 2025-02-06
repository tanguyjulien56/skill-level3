import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import useUserData from "../../hooks/useUserData";
import { fetchUserData } from "../../services/api/userApi.ts";
import { UserData } from "../../types/userService";
import { calculateDaysToBirthday } from "../../utils/dateUtils.ts";

// Mock des fonctions externes
jest.mock("../../services/api/userApi.ts", () => ({
  fetchUserData: jest.fn(),
}));

jest.mock("../../utils/dateUtils.ts");

const MockComponent = ({ userData }: { userData: UserData }) => {
  const { imageUrl, daysToBirthday, error, loading } = useUserData(userData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <img src={imageUrl} alt={`${userData.firstName} ${userData.lastName}`} />
      <p>Votre anniversaire est dans {daysToBirthday} jours</p>
    </div>
  );
};

describe("useUserData", () => {
  const mockUserData: UserData = {
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
  };

  it("should display the default image and handle invalid birthday", async () => {
    // Simuler une réponse d'API où l'image n'est pas fournie
    (fetchUserData as jest.Mock).mockResolvedValueOnce({
      image: "", // L'image est vide pour déclencher l'affichage de l'image par défaut
    });
    // Simuler un calcul de jours avant l'anniversaire invalide
    (calculateDaysToBirthday as jest.Mock).mockReturnValueOnce(
      "Date d'anniversaire invalide"
    );

    render(<MockComponent userData={mockUserData} />);

    // Attendre la disparition du message de chargement
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Vérifie que l'image par défaut est bien affichée
    const image = screen.getByAltText("John Doe") as HTMLImageElement;

    // Vérifier que l'image par défaut est utilisée
    expect(image.src).toContain("no_image_available.png"); // On cherche seulement le chemin relatif

    // Vérifie que le texte pour l'anniversaire invalide est bien affiché
    await waitFor(() =>
      expect(
        screen.getByText(
          "Votre anniversaire est dans Date d'anniversaire invalide jours"
        )
      ).toBeInTheDocument()
    );
  });
  it("should handle errors and display an error message", async () => {
    // Simuler une erreur d'API
    (fetchUserData as jest.Mock).mockRejectedValueOnce(new Error("API error"));
    (calculateDaysToBirthday as jest.Mock).mockReturnValueOnce(
      "Date d'anniversaire invalide"
    );

    render(<MockComponent userData={mockUserData} />);

    // Attendre la disparition du message de chargement
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Vérifie que l'erreur est affichée
    expect(
      screen.getByText("Erreur lors de la récupération des données")
    ).toBeInTheDocument();
  });
});
