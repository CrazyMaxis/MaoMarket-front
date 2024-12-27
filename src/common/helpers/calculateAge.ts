import dayjs from 'dayjs';

export const calculateAge = (birthDate: string) => {
  const now = dayjs();
  const birth = dayjs(birthDate);

  if (!birth.isValid()) {
    return 'Некорректная дата';
  }

  const years = now.diff(birth, 'year');
  if (years > 0) {
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`;
  }

  const months = now.diff(birth, 'month');
  return `${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`;
};
