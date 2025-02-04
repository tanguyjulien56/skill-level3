import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import InformationPage from "../InformationPage";

// Mock de la modal
jest.mock("../../components/Modal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onClose,
    message,
  }: {
    isOpen: boolean;
    onClose: () => void;
    message: string;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("InformationPage", () => {
  test("renders the form with initial values from Redux", () => {
    render(
      <Provider store={store}>
        <InformationPage />
      </Provider>
    );

    // Vérification de l'affichage des champs du formulaire avec leurs labels
    expect(screen.getByLabelText(/Prénom/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de naissance/)).toBeInTheDocument();
  });

  test("displays validation errors when submitting with empty fields", async () => {
    render(
      <Provider store={store}>
        <InformationPage />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/i }));

    // Attente que les messages d'erreur apparaissent
    await waitFor(() => {
      expect(screen.getByText(/Le prénom est requis/)).toBeInTheDocument();
      expect(screen.getByText(/Le nom est requis/)).toBeInTheDocument();
      expect(
        screen.getByText(/La date de naissance est requise/)
      ).toBeInTheDocument();
    });
  });

  test("displays a modal after successful form submission", async () => {
    render(
      <Provider store={store}>
        <InformationPage />
      </Provider>
    );

    // Remplir les champs avec des données valides
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Nom/), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Date de naissance/), {
      target: { value: "1990-01-01" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/i }));

    // Vérification que la modal apparaît avec le message
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(
        screen.getByText("Utilisateur enregistré avec succès !")
      ).toBeInTheDocument();
    });
  });

  test("does not submit form with invalid data", async () => {
    render(
      <Provider store={store}>
        <InformationPage />
      </Provider>
    );

    // Remplir un champ incorrect (prénom trop court)
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: { value: "J" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/i }));

    // Vérification de l'erreur liée au prénom
    await waitFor(() => {
      expect(
        screen.getByText(/Le prénom doit contenir au moins 2 lettres/)
      ).toBeInTheDocument();
    });
  });
});
