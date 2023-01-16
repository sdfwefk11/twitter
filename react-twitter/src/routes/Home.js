import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "twutterbase";
const Home = () => {
  const [twitt, setTwitt] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitt(value);
  };
  const docRef = async () => {
    const aa = await addDoc(collection(dbService, "users"), {
      first: "Kim",
      middle: "jung",
      last: "soo",
      born: 1996,
    });
    console.log(aa.id);
  };
  docRef();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="Twitt"></input>
      </form>
    </div>
  );
};

export default Home;
