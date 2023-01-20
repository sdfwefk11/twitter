import React, { useEffect, useState } from "react";
import { authService, dbService } from "twutterbase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
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
  const getUserTwitts = async () => {
    const twitts = query(
      collection(dbService, "users"),
      where("uid", "==", userObj.uid),
      orderBy("sortNum")
    );
    const snapshot = await getDocs(twitts);
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getUserTwitts();
  }, []);
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
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={changeProfileName}
          value={newUserName}
          type="text"
          placeholder="Display name"
        ></input>
        <input type="submit" value="update profile"></input>
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
