export function getNextMonday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
    ),
  );

  return nextMonday;
}

export function getNextSunday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextFriday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 7) % 7 || 7),
    ),
  );

  return nextFriday;
}