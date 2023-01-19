import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "twutterbase";
import DeleteTwitte from "components/DeleteTwitte";
const Home = ({ userObj }) => {
  const [twitt, setTwitt] = useState("");
  const [fieldData, setFieldData] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    addingDoc();
    setTwitt("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitt(value);
  };

  const addingDoc = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const date = now.getDate().toString();
    const day = (now.getDay() - 1).toString();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();
    const twitteTime = `${year}/${day.padStart(2, "0")}/${date.padStart(
      2,
      "0"
    )} ${hours.padStart(2, "0")} : ${minutes.padStart(2, "0")}`;

    await addDoc(collection(dbService, "users"), {
      twitting: twitt,
      date: twitteTime,
      uid: userObj.uid,
    });
  };

  useEffect(() => {
    onSnapshot(collection(dbService, "users"), (snapshot) => {
      const twittingArr = snapshot.docs.map((doc) => ({
        uid: doc.uid,
        date: doc.date,
        twitting: doc.twitting,
        id: doc.id,
        ...doc.data(),
      }));
      setFieldData(twittingArr);
    });
  }, []);
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const imgFile = files[0];
    console.log(imgFile);
  };
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
        <input type="file" accept="image/*" onChange={onFileChange}></input>
        <input type="submit" value="Twitt"></input>
      </form>
      <div>
        {fieldData.map((item, index) => (
          <DeleteTwitte
            key={index}
            twittObj={item}
            uid={userObj.uid === item.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
