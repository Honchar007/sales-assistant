export function parseInfoBlock(infoBlockData) {
  const infoObject = {};

  infoBlockData.forEach((item) => {
    infoObject[item.key] = item.value;
  });

  return infoObject;
}
