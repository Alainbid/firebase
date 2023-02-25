import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.scss";

const SignIn = () => {
  // const [refPassword, setrefPassword] = useState("");
  const [voirPwd, setvoirPwd] = useState(false);

  const verifEmail = (value) => {
    const element = document.getElementById("signinEmail");
    if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      errorDisplay("email", "email non-conforme", false);
      element.style.border = "solid 2px red";
    } else {
      errorDisplay("email", "", true);
      element.style.border = "solid 2px green";
    }
  };

  const verifPassword = (value) => {
    const element = document.getElementById("signinPwd");
    if (
      !value.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/
      )
    ) {
      errorDisplay(
        "Password",
        "Password non valide minimum 8 caractères,majuscules, minuscules, chiffres, caractères spéciaux",
        false
      );
      element.style.color = "red";
      element.style.border = "solid 2px black";
    } else {
      errorDisplay("Password", " ", true);
      element.style.color = "green";
      element.style.border = "solid 2px green";
    }
    console.log("refPassword ", value);
  };

  const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    if (!valid) {
      container.textContent = message;
      container.classList.add("error");
      console.log("container = ", container);
    } else {
      container.textContent = "";
    }
  };

  const togglevoirPwd = () => {
    setvoirPwd(!voirPwd);
    // console.log("après toggle " + voirPwd);
  };

  // const hidePwd = () => {
  //   setvoirPwd(false);
  // };

  useEffect(() => {
    const inputs = document.querySelectorAll(
      'input[type="email"], input[type="Password" '
    );
    // console.log(inputs);
    inputs.forEach((saisie) => {
      saisie.addEventListener("input", (e) => {
        // console.log("champ : ", e.target.id);
        switch (e.target.id) {
          case "signinEmail":
            verifEmail(e.target.value);
            break;
          case "signinPwd":
            verifPassword(e.target.value);
            break;
          default:
            break;
        }
      });
    });
  });

  return (
    <div>
      <Navbar></Navbar>
      <div className="home-container">
        <h3 className="display-2">Sign-In</h3>

        <div className="form-container">
          <form className="signin-form">
            <div className="mb-3">
              <label htmlFor="signinEmail" className="form-label">
                Email adress
              </label>
              <input
                name="email"
                required
                type="email"
                className="form-control"
                id="signinEmail"
                autoComplete="off"></input>
              <span className="email-container">
                <i className="errorDisplay"></i>
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="signinPwd" className="form-label">
                Password
              </label>
              <input
                name="pwd"
                required
                type={voirPwd ? "text" : "Password"}
                className="form-control"
                id="signinPwd"
              />
              <span
                onClick={togglevoirPwd}
                toggle="#confirm-container"
                className="fa fa-fw fa-eye field-icon"
                type="toggle-Password"></span>
              <span className="Password-container">
                <i className="errorDisplay"></i>
              </span>
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
