import { useState } from "react";
import Navbarre from "../components/Navbar";
import "../styles/home.scss";

function Home() {
  const [date] = useState(new Date());

  return (
    <div className="app">
      <Navbarre />
      <h1 className="text-center">React Calendar  </h1>
      <h4> {date.toLocaleDateString()}</h4>
    </div>
  );
}
export default Home;
