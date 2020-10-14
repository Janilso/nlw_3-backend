const removeSpecialCharacters = (string = "", withSpace = false) => {
  const newString = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return withSpace ? newString : newString.replace(/\s/g, "");
};

export { removeSpecialCharacters };
