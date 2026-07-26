import axios from "axios";

export const fetchUserService = async () => {
  return await axios.get(`http://localhost:3000/api/auth/me`, {
    withCredentials: true,
  });
};

export const getUrlsService = async () => {
  return await axios.get(`http://localhost:3000/api/urls/`, {
    withCredentials: true,
  });
};

export const logoutUserService = async () => {
  return await axios.post(
    `http://localhost:3000/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
};

export const updateUrlService = async (originalUrl, urlId) => {
  return await axios.patch(
    `http://localhost:3000/api/urls/${urlId}`,
    {
      originalUrl,
    },
    {
      withCredentials: true,
    },
  );
};
