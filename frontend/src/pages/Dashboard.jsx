import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  copyShortUrl,
  fetchUser,
  getUrls,
  logoutUser,
} from "../services/service.js";
import { totalUrlsClicks } from "../utils/utils.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };

    const getUrlsData = async () => {
      const urlsData = await getUrls();
      setUrls(urlsData.urls);
    };
    const handleFocus = () => {
         getUrlsData();
    };
    window.addEventListener("focus", handleFocus);
    getUserData();
    getUrlsData();
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleLogout = async () => {
    const resData = await logoutUser();
    alert(resData.message);
    navigate("/login");
  };

  const totalClicks = totalUrlsClicks(urls);

  const handleCopy = async (shortUrl) => {
    await copyShortUrl(shortUrl);
  };

  const handleSubmit = async () => {
    if (!originalUrl.trim()) {
      alert("Please enter long url");
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/urls`,
        {
          originalUrl,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      console.log(res.data.url);
      setCreatedUrl(res.data.url);
      setUrls((prev)=>[res.data.url,...prev]);
      await getUrls();
      setOriginalUrl("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);
  const handleDelete=async(urlId)=>{
    try {
      await axios.delete(`http://localhost:3000/api/urls/${urlId}`,{
        withCredentials:true
      })
      setUrls((prev)=>
        prev.filter((url)=>url._id!==urlId)
      )
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">URL Shortener</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-semibold text-gray-800">{user?.username}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.username?.[0]?.toUpperCase() || "?"}
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl p-8 text-black">
        {/* Create URL Card */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-bold">Create Short URL</h2>

          <div className="space-y-4">
            <input
              placeholder="Enter your long url here"
              name="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full rounded-lg border p-3"
            />

            <input
              placeholder="Custom alias (optional)"
              className="w-full rounded-lg border p-3"
            />

            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              Create URL
            </button>
          </div>
        </div>

        {createdUrl && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-green-700">
              ✅ Short URL Created
            </h3>

            <div className="flex items-center justify-between rounded-lg bg-white p-3">
              <a
                href={`http://localhost:3000/${createdUrl.shortUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                http://localhost:3000/{createdUrl.shortUrl}
              </a>

              <button
                onClick={() =>
                  handleCopy(`http://localhost:3000/${createdUrl.shortUrl}`)
                }
                className="rounded bg-blue-600 px-3 py-1 text-white cursor-pointer"
              >
                Copy
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Original URL: {createdUrl.originalUrl}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Total URLs</p>
            <h3 className="text-4xl font-bold">{urls.length}</h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Clicks</p>
            <h3 className="text-4xl font-bold">{totalClicks}</h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Active Links</p>
            <h3 className="text-4xl font-bold">15</h3>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8">
          <input
            placeholder="Search URLs..."
            className="w-full rounded-lg border bg-white p-3"
          />
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-4 text-left">Original URL</th>
                <th className="p-4 text-left">Short URL</th>
                <th className="p-4 text-left">Clicks</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {urls.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No URLs found
                  </td>
                </tr>
              ) : (
                urls.map((url) => (
                  <tr key={url._id} className="border-t">
                    <td className="p-4">{url.originalUrl}</td>
                    <td className="p-4 text-blue-600">
                      <a
                        href={`http://localhost:3000/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`http://localhost:3000/${url.shortUrl}`}
                      </a>
                    </td>
                    <td className="p-4">{url.clicks}</td>
                    <td className="p-4">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>
                    <td className="space-x-2 p-4">
                      <button
                        onClick={() =>
                          handleCopy(`http://localhost:3000/${url.shortUrl}`)
                        }
                        className="rounded bg-blue-500 px-3 py-1 text-white cursor-pointer"
                      >
                        Copy
                      </button>

                      <button className="rounded bg-green-500 px-3 py-1 text-white cursor-pointer">
                        Edit
                      </button>

                      <button 
                        onClick={()=>handleDelete(url._id)}
                        className="rounded bg-red-500 px-3 py-1 text-white cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
