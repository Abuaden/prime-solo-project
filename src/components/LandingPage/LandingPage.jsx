import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };
  const [showLogin, setShowLogin] = useState(true);
    return (
      <div className="container">
        <div className="penguin">
          <img src="/penguinTeacher.png" alt="" />
        </div>

        <div className="welcomeText">
        <h1>Welcome To TurboArabic</h1>
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <p className="question">
          {showLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;

