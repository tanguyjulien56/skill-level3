// src/components/UserProfile.tsx

import React from "react";
import useUserData from "../services/api/useUserData";
import { UserData } from "../types/UserData";

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  console.log(userData);
  const { imageUrl, daysToBirthday } = useUserData(userData);
  
  return (
    <>
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
              {daysToBirthday !== null && (
                <p>Votre anniversaire est dans {daysToBirthday} jours</p>
              )}
              <div className="card-actions grid grid-cols-2 items-center">
                <button className="btn btn-primary">Voir plus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
