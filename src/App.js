import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import NotFound from "./pages/NotFoundPage";
import Depenses from "./pages/benefDepenses";
import Benefs from "./pages/Beneficiaires"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SignInPage" element={<SignIn />}></Route>
        <Route path="/SignUpPage" element={<SignUp />}></Route>
        <Route path="/Depenses" element={<Depenses />}></Route>
        <Route path="/Beneficiaires" element={<Benefs />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
