export interface UserData {
  firstName: string;
  lastName: string;
  birthDate: string; 
  image?: string;
}

export interface UserState extends UserData {
  daysToBirthday: number | string;
  error: string | null;
  loading: boolean;
}
