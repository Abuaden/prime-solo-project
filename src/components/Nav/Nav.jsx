import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <img
          src="/Logo.png"
          height={70}
          width={70}
          style={{
            borderRadius: "50%",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          alt=""
        />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
       

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/dashboard">
              Dashboard
            </Link>

            

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
