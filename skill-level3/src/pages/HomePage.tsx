import React from "react";
import { useSelector } from "react-redux";
import UserProfileCard from "../components/UserProfileCard";
import { RootState } from "../redux/store";
import { UserData } from "../types/UserData";

const HomePage: React.FC = () => {
  // Récupérer les données utilisateur depuis Redux (formData)
  const formData = useSelector((state: RootState) => state.form);

  // Assurer que formData est conforme à l'interface UserData, y compris la gestion de birthDate null
  const userData: UserData = {
    firstName: formData.firstName || "", // fallback si firstName est manquant
    lastName: formData.lastName || "", // fallback si lastName est manquant
    birthDate: formData.birthDate || "", // fallback si birthDate est manquant
  };

  return (
    <div className="home_page max-w-md m-auto pt-24">
      {/* Vérifier si formData est valide avant de passer les données */}
      {userData.firstName && userData.lastName ? (
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
