import { useState } from "react";
import Navbarre from "../components/Navbar";
import "../styles/home.scss";

function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <Navbarre />
      <h1 className="text-center">React Calendar</h1>
    </div>
  );
}
export default Home;
