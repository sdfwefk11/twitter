import React from "react";
import { authService } from "twutterbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    const logOut = authService.signOut();
    if (logOut) {
      navigate("/");
    }
  };
  return (
    <>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
