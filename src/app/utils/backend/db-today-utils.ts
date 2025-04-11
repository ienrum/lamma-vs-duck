export const parseToday = (today: string) => {
  const [date, userId] = today.split(':');
  return { date, userId };
}

export const mergeToday = (date: string, userId: string) => {
  return `${date}:${userId}`;
}