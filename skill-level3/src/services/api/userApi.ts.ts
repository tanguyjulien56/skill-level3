import axios from "axios";
import { UserData } from "../../types/userService";

const API_URL = "https://dummyjson.com/users";

// Fonction pour récupérer un utilisateur par prénom ou nom
export const fetchUserData = async (
  firstName: string,
  lastName: string
): Promise<UserData | null> => {
  try {
    // Choisir quel paramètre envoyer à l'API (firstName ou lastName)
    const query = firstName ? firstName : lastName; // Si firstName est défini, on l'utilise, sinon on utilise lastName
    const response = await axios.get(`${API_URL}/search?q=${query}`);

    // Filtrer l'utilisateur en fonction du prénom et du nom
    const user = response.data.users?.find(
      (user: UserData) =>
        user.firstName.toLowerCase() === firstName.toLowerCase() &&
        user.lastName.toLowerCase() === lastName.toLowerCase()
    );

    return user || null;
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
};
