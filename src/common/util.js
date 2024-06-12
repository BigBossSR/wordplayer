export const areTermsEqual = (str1, str2) => {
  return str1.toUpperCase() === str2.toUpperCase();
}

export const getAlphanumerics = str => {
  return str ? removeAccents(str).match(/[a-zA-Z]+/g).join('') : '';
}

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function getCookie (name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getCookieJSON = appKey => JSON.parse(getCookie(appKey));

export const setCookieJSON = (appKey, data, days) => {
  setCookie(appKey, JSON.stringify(data), days);
}

/*export const setCookie = (appKey, data) => {
  const saved = document.cookie ? JSON.parse(document.cookie) : {};
  saved[appKey] = data;
  document.cookie = JSON.stringify(saved);
}*/

export const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');