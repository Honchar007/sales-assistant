export const getColor = (color: number):string => {
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
