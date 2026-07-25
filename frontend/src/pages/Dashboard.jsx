import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/me`, {
          withCredentials: true,
        });
        const userData = res.data.user;
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    const getUrls = async () => {
    try {
        const res = await axios.get(`http://localhost:3000/api/urls/`,{
            withCredentials:true,
        })
        const resData = res.data;
        console.log(resData);
    } catch (error) {
        console.error(error);
    }
  }
    fetchUser();
    getUrls();
  }, []);
  const handleLogout = async () =>{
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/logout`,{},{
        withCredentials:true,
      })
      const resData = res.data;
      alert(resData.message);
      navigate("/login");
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
            <p className="font-semibold text-gray-800">{user.username}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.username?.[0]?.toUpperCase() || "?"}
          </div>

          <button onClick={handleLogout} className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 cursor-pointer">
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
              placeholder="https://example.com"
              className="w-full rounded-lg border p-3"
            />

            <input
              placeholder="Custom alias (optional)"
              className="w-full rounded-lg border p-3"
            />

            <input type="date" className="w-full rounded-lg border p-3" />

            <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer">
              Create URL
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Total URLs</p>
            <h3 className="text-4xl font-bold">18</h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Clicks</p>
            <h3 className="text-4xl font-bold">2,310</h3>
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
              <tr className="border-t">
                <td className="p-4">https://google.com</td>
                <td className="p-4 text-blue-600">short.ly/abc123</td>
                <td className="p-4">210</td>
                <td className="p-4">Today</td>
                <td className="space-x-2 p-4">
                  <button className="rounded bg-blue-500 px-3 py-1 text-white cursor-pointer">
                    Copy
                  </button>

                  <button className="rounded bg-green-500 px-3 py-1 text-white cursor-pointer">
                    Edit
                  </button>

                  <button className="rounded bg-red-500 px-3 py-1 text-white cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">https://github.com</td>
                <td className="p-4 text-blue-600">short.ly/git55</td>
                <td className="p-4">542</td>
                <td className="p-4">3 days ago</td>
                <td className="space-x-2 p-4">
                  <button className="rounded bg-blue-500 px-3 py-1 text-white">
                    Copy
                  </button>

                  <button className="rounded bg-green-500 px-3 py-1 text-white">
                    Edit
                  </button>

                  <button className="rounded bg-red-500 px-3 py-1 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
