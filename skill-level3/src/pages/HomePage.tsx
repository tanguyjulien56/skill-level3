import React from "react";
import UserProfile from "../components/UserProfileCard";
import { userData } from "../data/userData";
const HomePage: React.FC = () => {
  return (
    <div className="home_page max-w-md m-auto pt-24">
      <UserProfile userData={userData} />
    </div>
  );
};

export default HomePage;
