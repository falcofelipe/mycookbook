export const capitalCaseArray = stringArray => {
  const capitalizedArray = stringArray.map(
    string => string[0].toUpperCase() + string.slice(1)
  );
  return capitalizedArray;
};
