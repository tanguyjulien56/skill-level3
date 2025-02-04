import React from "react";

import useUserData from "../hooks/useUserData";
import { UserData } from "../types/userService";

// Déclaration de l'interface pour les props
interface UserProfileProps {
  userData: UserData;
}

const UserProfileCard: React.FC<UserProfileProps> = ({ userData }) => {
  const { imageUrl, daysToBirthday } = useUserData(userData);

  return (
    <div className="max-w-5xl flex justify-center ">
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
            <p>
              {typeof daysToBirthday === "number"
                ? `Votre anniversaire est dans ${daysToBirthday} jours`
                : daysToBirthday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
