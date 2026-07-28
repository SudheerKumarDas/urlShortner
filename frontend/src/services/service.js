import axios from "axios";

export const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        });
        return res.data.user;
        // setUser(userData);
      } catch (error) {
        console.error(error);
    }
};

export const getUrls = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/urls/`, {
          withCredentials: true,
        });
        console.log(res.data);
        console.log(res.data.urls);
        return res.data;
        // setUrls(resData.urls);
      } catch (error) {
        console.error(error);
    }
};

export const logoutUser = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
}

export const copyShortUrl = async (shortUrl) => {
     try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short Url copied!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy.");
    }
}