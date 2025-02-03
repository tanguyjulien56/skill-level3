import axios from "axios";
import { useEffect, useState } from "react";
import { UserData } from "../../types/UserData";

const useUserData = (userData: UserData) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [daysToBirthday, setDaysToBirthday] = useState<number | string>(
    "Date d'anniversaire invalide"
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/users/search?q=${userData.firstName}`
        );

        // Filtrer les utilisateurs pour obtenir celui qui correspond au prénom et au nom
        const user = response.data.users?.find(
          (user: UserData) =>
            user.firstName.toLowerCase() === userData.firstName.toLowerCase() &&
            user.lastName.toLowerCase() === userData.lastName.toLowerCase()
        );

        if (user) {
          console.log("utilisateur trouvé:", user);
        } else {
          console.log("utilisateur non trouvé");
        }

        // Si l'utilisateur est trouvé, on définit son image, sinon on définit l'image par défaut
        setImageUrl(user?.image || "/no_image_available.png");
      } catch (error) {
        console.error("Error fetching image", error);
        setImageUrl("/no_image_available.png");
      }
    };

    const calculateDaysToBirthday = () => {
      if (!userData.birthDate) {
        return setDaysToBirthday("Pas de date d'anniversaire définie");
      }

      const birthday = new Date(userData.birthDate);
      if (isNaN(birthday.getTime())) {
        return setDaysToBirthday("Date d'anniversaire invalide");
      }

      // Si la date d'anniversaire est incomplète
      const dateParts = userData.birthDate.split("-");
      if (dateParts.length !== 3) {
        return setDaysToBirthday("Date d'anniversaire incomplète");
      }

      const today = new Date();
      birthday.setFullYear(today.getFullYear());
      if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1); // Si anniversaire passé, on prend l'année suivante
      }

      const daysLeft = Math.ceil(
        (birthday.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      setDaysToBirthday(daysLeft);
    };

    fetchImage();
    calculateDaysToBirthday();
  }, [userData]);

  return { imageUrl, daysToBirthday };
};

export default useUserData;
