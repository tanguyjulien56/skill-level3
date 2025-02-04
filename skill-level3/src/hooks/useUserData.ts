// /src/hooks/useUserData.ts
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api/userApi.ts";
import { UserData } from "../types/userService.ts";
import { calculateDaysToBirthday } from "../utils/dateUtils";

const useUserData = (userData: UserData) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [daysToBirthday, setDaysToBirthday] = useState<number | string>(
    "Date d'anniversaire invalide"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer l'image de l'utilisateur
    const fetchImage = async () => {
      try {
        const user = await fetchUserData(userData.firstName, userData.lastName);

        if (user) {
          setImageUrl(user.image || "/no_image_available.png");
        } else {
          setImageUrl("/no_image_available.png");
          setError("Utilisateur non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'image", error);
        setImageUrl("/no_image_available.png");
        setError("Erreur lors de la récupération des données");
      }
    };

    // Calcul des jours restants jusqu'à l'anniversaire
    setDaysToBirthday(calculateDaysToBirthday(userData.birthDate));

    // Appel de l'API pour récupérer l'image
    fetchImage();
  }, [userData]); // Déclenché quand `userData` change

  return { imageUrl, daysToBirthday, error };
};

export default useUserData;
