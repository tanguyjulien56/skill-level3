import React from "react";
import useUserData from "../hooks/useUserData";
import { UserData } from "../types/userService";

interface UserProfileProps {
  userData: UserData;
}

const UserProfileCard: React.FC<UserProfileProps> = ({ userData }) => {
  const { imageUrl, daysToBirthday, loading } = useUserData(userData);

  return (
    <div className="max-w-5xl flex justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <figure>
          {loading ? (
            <div className="w-full h-60 bg-gray-300 animate-pulse"></div> // Effet de chargement
          ) : (
            <img
              className="w-full h-60 object-cover"
              src={imageUrl}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userData.firstName} {userData.lastName}
          </h2>
          <p>
            {typeof daysToBirthday === "number"
              ? `Votre anniversaire est dans ${daysToBirthday} jours`
              : daysToBirthday}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
