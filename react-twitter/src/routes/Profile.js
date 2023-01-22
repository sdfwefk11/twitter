import React, { useState } from "react";
import { authService } from "twutterbase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
const Profile = ({ userObj, refreshUser }) => {
  const [newUserName, setNewUserName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogoutClick = () => {
    const logOut = authService.signOut();
    if (logOut) {
      navigate("/");
    }
  };

  const changeProfileName = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newUserName) {
      await updateProfile(authService.currentUser, {
        displayName: newUserName,
      });
      refreshUser();
    }
    setNewUserName("");
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileFrom">
        <input
          onChange={changeProfileName}
          value={newUserName}
          type="text"
          placeholder="Edit profile name"
          autoFocus
          className="formInput"
        ></input>
        <input
          type="submit"
          value="update profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        ></input>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
