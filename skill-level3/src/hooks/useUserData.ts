import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api/userApi.ts";
import { UserData } from "../types/userService.ts";
import { calculateDaysToBirthday } from "../utils/dateUtils";

const useUserData = (userData: UserData) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [daysToBirthday, setDaysToBirthday] = useState<number | string>(
    "Date d'anniversaire invalide"
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const user = await fetchUserData(userData.firstName, userData.lastName);
        setImageUrl(user?.image || "/no_image_available.png");
      } catch (error) {
        console.error("Erreur lors de la récupération de l'image", error);
        setImageUrl("/no_image_available.png");
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    setDaysToBirthday(calculateDaysToBirthday(userData.birthDate));
    fetchImage();
  }, [userData]);

  return { imageUrl, daysToBirthday, error, loading };
};

export default useUserData;
