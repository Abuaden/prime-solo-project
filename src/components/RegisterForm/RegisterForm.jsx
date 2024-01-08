import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="input">
        <label htmlFor="firstName">First Name: </label>

        <input type="text" name="firstName" required />
      </div>
      <div className="input">
        <label htmlFor="lastName">Last Name: </label>

        <input type="text" name="lastName" required />
      </div>
      <div className="input">
        <label htmlFor="username">Username: </label>

        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="email"> Email: </label>

        <input type="email" name="email" required />
      </div>

      <div className="input">
        <label htmlFor="password">Password: </label>

        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
