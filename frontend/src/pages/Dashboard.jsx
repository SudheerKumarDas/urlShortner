import CardList from "../components/CardList.jsx"
import InputCard from "../components/InputCard.jsx"
import Navbar from "../components/Navbar.jsx"
const Dashboard = () => {
  return (
    <div className="p-5">
        <Navbar/>
        <InputCard/>
        <CardList/>
    </div>
  )
}

export default Dashboard