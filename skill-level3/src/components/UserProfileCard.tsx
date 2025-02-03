// src/components/UserProfile.tsx

import React from "react";
import { useSelector } from "react-redux";
import useUserData from "../services/api/useUserData";
import { RootState } from "./store";
import { UserData } from "../types/UserData";

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  // Récupère les données de l'utilisateur à partir du store Redux
  const userData = useSelector((state: RootState) => state.user);

  const { imageUrl, daysToBirthday } = useUserData(userData);

  return (
    <>
      <div className="max-w-5xl flex justify-center mt-16">
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
          <figure>
            <img
              className="w-full h-60 object-cover"
              src={imageUrl ? imageUrl : "/no_image_available.png"}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
          </figure>
          <div className="home-page">
            <div className="card-body">
              <h2 className="card-title">
                {userData.firstName} {userData.lastName}
              </h2>
              {daysToBirthday !== null ? (
                <p>Votre anniversaire est dans {daysToBirthday} jours</p>
              ) : (
                <p>Anniversaire non défini ou invalide</p>
              )}
              <div className="card-actions grid grid-cols-2 items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
