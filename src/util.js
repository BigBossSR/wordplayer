export const areTermsEqual = (str1, str2) => {
  return str1.toUpperCase() === str2.toUpperCase();
}

export const getAlphanumerics = str => {
  return str.match(/[a-zA-Z]+/g).join('');
}