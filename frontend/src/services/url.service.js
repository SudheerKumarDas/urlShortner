import axios from "axios";

export const fetchUserService = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
    withCredentials: true,
  });
};

export const getUrlsService = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/urls/`, {
    withCredentials: true,
  });
};

export const logoutUserService = async () => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
};

export const updateUrlService = async (originalUrl, urlId) => {
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/urls/${urlId}`,
    {
      originalUrl,
    },
    {
      withCredentials: true,
    },
  );
};

export const createUrlService = async (originalUrl) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/urls`,
    {
      originalUrl,
    },
    {
      withCredentials: true,
    },
  );
};

export const deleteUrlService = async (urlId) => {
    return await axios.delete(`${import.meta.env.VITE_API_URL}/api/urls/${urlId}`, {
        withCredentials: true,
      });
}