import React, { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router";
import { RootState } from "../redux/store";
import { UserData } from "../types/userService";

// Chargement dynamique de UserProfileCard
const UserProfileCard = lazy(() => import("../components/UserProfileCard"));

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
        <Suspense fallback={<div>Chargement du profil...</div>}>
          <UserProfileCard userData={userData} />
        </Suspense>
      ) : (
        <div className="text-center text-lg flex flex-col gap-4 ">
          <p>Aucune donnée utilisateur disponible</p>
          <button className="btn btn-primary w-1/2 m-auto">
            <Link to="/informations">Renseigner un utilisateur </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
