export const areTermsEqual = (str1, str2) => {
  return str1.toUpperCase() === str2.toUpperCase();
}

export const getAlphanumerics = str => {
  return str ? str.match(/[a-zA-Z]+/g).join('') : '';
}

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export const setCookie = (appKey, data) => {
  const saved = JSON.parse(document.cookie);
  saved[appKey] = data;
  document.cookie = JSON.stringify(saved);
}