const getColor = (color: number):string => {
  if (color >= 0 && color < 100) {
    return 'rose';
  } else if (color >= 100 && color < 150) {
    return 'apricot';
  } else if (color >= 150 && color < 200) {
    return 'lemon';
  } else if (color >= 200 && color < 250) {
    return 'tea-green';
  } else if (color >= 250) {
    return 'jagged-ice';
  }

  return 'grey-200';
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}`;
}

export { getColor, formatDate };
