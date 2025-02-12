import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../redux/userSlice";
import { UserData } from "../types/userService";

interface UserProfileProps {
  userData: UserData;
}

const UserProfileCard: React.FC<UserProfileProps> = ({ userData }) => {
  const dispatch = useDispatch();

  // Récupérer l'état de l'utilisateur depuis le store
  const { firstName, lastName, image, daysToBirthday, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(
      updateUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      })
    );
  }, [dispatch, userData.firstName, userData.lastName, userData.image]);

  return (
    <div className="max-w-5xl flex justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <figure>
          {loading ? (
            <div className="w-full h-60 bg-gray-300 animate-pulse"></div>
          ) : (
            <img
              className="w-full h-60 object-cover"
              src={image || "/no_image_available.png"}
              alt={`${firstName} ${lastName}`}
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {typeof daysToBirthday === "number"
              ? `Votre anniversaire est dans ${daysToBirthday} jours`
              : "Date de naissance inconnue"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
