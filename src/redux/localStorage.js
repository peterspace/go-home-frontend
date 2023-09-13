export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// export const getLocalStorage = (key) => {
//   try {
//     return JSON.parse(localStorage.getItem(key));
//   } catch (error) {
//     console.log('Error: ', error.message);
//   }
//   return JSON.parse(localStorage.getItem(key));
// };

export const getLocalStorage = (key) => {
  try {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
  } catch (error) {
    console.log('Error Local Storage: ', error.message);
  }
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const setAdvancedLocalStorage = (data) => {
  let key = data.title;
  let value = data.userData;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageVerified = (key) => {
  let response = getLocalStorage(key);
  if (response) {
    return response;
  } else {
    return '';
  }
};

// clear local storage (in browser console)
// localStorage.clear()

// const value = undefined;

// try {
//   const result = JSON.parse(value);
//   console.log(result);
// } catch (err) {
//   // 👇️ This runs
//   console.log('Error: ', err.message);
// }
