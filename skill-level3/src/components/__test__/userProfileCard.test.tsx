import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/rootReducer";
import { RootState } from "../../redux/store";
import UserProfileCard from "../UserProfileCard";

const createMockStore = (preloadedState: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

describe("UserProfileCard", () => {
  it("Should display the default image if `image` is empty", () => {
    const store = createMockStore({
      user: {
        firstName: "John",
        lastName: "Doe",
        birthDate: "1990-01-01",
        image: "",
        daysToBirthday: 10,
        loading: false,
        error: null,
      },
    });

    const { getByAltText } = render(
      <Provider store={store}>
        <UserProfileCard
          userData={{
            firstName: "John",
            lastName: "Doe",
            birthDate: "1990-01-01",
          }}
        />
      </Provider>
    );

    const image = getByAltText("John Doe") as HTMLImageElement;
    expect(image.src).toContain("/no_image_available.png");
  });

  it("Should display the user image if `image` is set", () => {
    const store = createMockStore({
      user: {
        firstName: "John",
        lastName: "Doe",
        birthDate: "1990-01-01",
        image: "https://example.com/john_doe.jpg",
        daysToBirthday: 10,
        loading: false,
        error: null,
      },
    });

    const { getByAltText } = render(
      <Provider store={store}>
        <UserProfileCard
          userData={{
            firstName: "John",
            lastName: "Doe",
            birthDate: "1990-01-01",
            image: "https://example.com/john_doe.jpg",
          }}
        />
      </Provider>
    );

    const image = getByAltText("John Doe") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/john_doe.jpg");
  });
});
