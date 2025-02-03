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
        if (response.data.users && response.data.users.length > 0) {
          setImageUrl(response.data.users[0]?.image || null);
        } else {
          setImageUrl("/no_image_available.png"); // Image par défaut si pas trouvée
        }
      } catch (error) {
        console.error("Error fetching image", error);
        setImageUrl("/no_image_available.png"); // Image de secours en cas d'erreur
      }
    };

    const calculateDaysToBirthday = () => {
      if (userData.birthDate) {
        const birthday = new Date(userData.birthDate);
        if (isNaN(birthday.getTime())) {
          setDaysToBirthday("Date d'anniversaire invalide");
          return;
        }

        const today = new Date();
        if (userData.birthDate.split("-").length !== 3) {
          setDaysToBirthday("Date d'anniversaire incomplète");
          return;
        }

        birthday.setFullYear(today.getFullYear());
        if (today > birthday) {
          birthday.setFullYear(today.getFullYear() + 1);
        }

        const diffTime = birthday.getTime() - today.getTime();
        setDaysToBirthday(Math.ceil(diffTime / (1000 * 3600 * 24)));
      } else {
        setDaysToBirthday("Pas de date d'anniversaire définie");
      }
    };

    fetchImage();
    calculateDaysToBirthday();
  }, [userData]);

  return { imageUrl, daysToBirthday };
};

export default useUserData;
