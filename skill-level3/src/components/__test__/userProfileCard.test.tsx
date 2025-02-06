import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import useUserData from "../../hooks/useUserData";
import UserProfileCard from "../UserProfileCard";

jest.mock("../../hooks/useUserData");

describe("UserProfileCard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should display the default image if `imageUrl` is empty", async () => {
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
  it("Should display the user image if `imageUrl` is present", () => {
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

  it("Should display the birthday message with the number of days remaining", () => {
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

  it("Should display a generic message if `daysToBirthday` is not a number", () => {
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
