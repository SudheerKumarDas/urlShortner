import axios from "axios";
export const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/me`, {
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
        const res = await axios.get(`http://localhost:3000/api/urls/`, {
          withCredentials: true,
        });
        console.log(res.data);
        return res.data;
        // setUrls(resData.urls);
      } catch (error) {
        console.error(error);
    }
};

export const logoutUser = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/logout`,
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
      alert("Copied to clipboard!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy.");
    }
}