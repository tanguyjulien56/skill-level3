import React from "react";
import UserProfile from "../components/UserProfileCard";
import { userData } from "../data/userData";
const HomePage: React.FC = () => {
  return (
    <div className="App">
      <UserProfile userData={userData} />
    </div>
  );
};

export default HomePage;
