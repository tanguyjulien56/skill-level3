import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import useUserData from "../../hooks/useUserData";
import UserProfileCard from "../UserProfileCard";

jest.mock("../../hooks/useUserData");

describe("UserProfileCard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("doit afficher l'image par défaut si imageUrl est vide", async () => {
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: 10,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    const { getByAltText } = render(<UserProfileCard userData={userData} />);
    await waitFor(() => {
      const image = getByAltText("John Doe") as HTMLImageElement;
      expect(image.src).toContain("/no_image_available.png");
    });
  });
  it("doit afficher l'image utilisateur si imageUrl est présente", () => {
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "https://example.com/john_doe.jpg",
      daysToBirthday: 10,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    const { getByAltText } = render(<UserProfileCard userData={userData} />);

    const image = getByAltText("John Doe") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/john_doe.jpg");
  });

  it("doit afficher le message d'anniversaire avec un nombre de jours", () => {
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: 5,
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    const { getByText } = render(<UserProfileCard userData={userData} />);

    expect(
      getByText("Votre anniversaire est dans 5 jours")
    ).toBeInTheDocument();
  });

  it("doit afficher un message générique si daysToBirthday n'est pas un nombre", () => {
    (useUserData as jest.Mock).mockReturnValue({
      imageUrl: "",
      daysToBirthday: "Inconnu",
    });

    const userData = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    };

    const { getByText } = render(<UserProfileCard userData={userData} />);

    expect(getByText("Inconnu")).toBeInTheDocument();
  });
});
