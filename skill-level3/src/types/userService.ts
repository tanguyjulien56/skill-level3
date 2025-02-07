export interface UserData {
  firstName: string;
  lastName: string;
  birthDate: string; // format 'YYYY-MM-DD'
  image?: string;
}

export interface UserState extends UserData {
  imageUrl: string | undefined;
  daysToBirthday: number | string;
  error: string | null;
  loading: boolean;
}