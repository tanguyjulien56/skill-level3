// src/pages/HomePage.tsx

import React from "react";
import UserProfile from "../components/UserProfileCard";
import { UserData } from "../types/UserData";

const HomePage: React.FC = () => {
  const userData: UserData = {
    firstName: "Juien",
    lastName: "Doe",
    birthDate: "1980-06-15", // Date d'anniversaire manquante
  };

  return (
    <div className="App">
      <UserProfile userData={userData} />
    </div>
  );
};

export default HomePage;
