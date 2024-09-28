// src/utils/tokenUtils.js

export function ensureTokenStored() {
    console.log('ensureTokenStored');
    return new Promise((resolve) => {
      const checkToken = setInterval(() => {
        const storedToken = localStorage.getItem('accessSessionToken');  // Make sure the key matches
        if (storedToken) {
          clearInterval(checkToken);
          resolve();
        }
      }, 100); // Check every 100ms if the token is stored
    });
  }
  