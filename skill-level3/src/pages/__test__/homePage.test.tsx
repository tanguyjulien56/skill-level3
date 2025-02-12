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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("HomePage", () => {
  it("Should display an error message if no user data is available", () => {
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue({
      firstName: "",
      lastName: "",
      birthDate: null,
    });

    const { getByText } = render(<HomePage />);

    expect(
      getByText("Aucune donnée utilisateur disponible")
    ).toBeInTheDocument();
  });

  it("Should display the `UserProfileCard` if valid user data is available", async () => {
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
    });

    // Simuler `dispatch` pour ne pas lever d'erreur
    const dispatchMock = jest.fn();
    jest.spyOn(redux, "useDispatch").mockReturnValue(dispatchMock);

    const { getByText } = render(<HomePage />);

    await waitFor(() => expect(getByText("John Doe")).toBeInTheDocument());
  });
});
