export const calculateDaysToBirthday = (birthDate: string): number | string => {
  if (!birthDate) {
    return "Pas de date d'anniversaire définie";
  }

  const birthday = new Date(birthDate);
  if (isNaN(birthday.getTime())) {
    return "Date d'anniversaire invalide";
  }

  const dateParts = birthDate.split("-");
  if (dateParts.length !== 3) {
    return "Date d'anniversaire incomplète";
  }

  const today = new Date();
  birthday.setFullYear(today.getFullYear());

  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1); // Si l'anniversaire est passé, on prend l'année suivante
  }

  const daysLeft = Math.ceil(
    (birthday.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
  return daysLeft;
};
