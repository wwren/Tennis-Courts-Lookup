export const getTimetable = async function (date) {
  const data = await fetch(
    `https://us-central1-tennis-timetable.cloudfunctions.net/scraper?date=${date}`
  )
    .then((response) => response.json())
    .then((data) => data);

  return data;
};
