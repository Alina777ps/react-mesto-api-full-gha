import { checkResponse } from "./checkResponse";

//export const BASE_URL = "https://api.tarnakova.mesto.nomoredomains.rocks";

export const BASE_URL = "http://localhost:3001";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then(checkResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token)
      return data
    }
  })
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};
