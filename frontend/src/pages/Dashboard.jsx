import useAuth from "../hooks/useAuth.js";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div>Dashboard</div>
      <h2>Welcome {user?.username}</h2>
    </div>
  )
}

export default Dashboard