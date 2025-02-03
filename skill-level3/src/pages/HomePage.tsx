import React from "react";

import ThemeToggle from "../services/theme/ThemeToogle";

const HomePage: React.FC = () => {
  return (
    <>
      <ThemeToggle />
      <p>Page d'accueil</p>
    </>
  );
};

export default HomePage;
