import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "../components/UserProfileCard";
import { RootState } from "../redux/store";
import { UserData } from "../types/userService";

const HomePage: React.FC = () => {
  // Récupérer les données utilisateur depuis Redux
  const userState = useSelector((state: RootState) => state.user);

  // Construire userData uniquement si userState change
  const userData = useMemo<UserData>(
    () => ({
      firstName: userState.firstName || "",
      lastName: userState.lastName || "",
      birthDate: userState.birthDate || "",
    }),
    [userState]
  );
  const hasValidUser = userData.firstName && userData.lastName;

  return (
    <div className="home_page max-w-md m-auto pt-24">
      {hasValidUser ? (
        <UserProfileCard userData={userData} />
      ) : (
        <div className="text-center text-lg text-red-500">
          Aucune donnée utilisateur disponible
        </div>
      )}
    </div>
  );
};

export default HomePage;
