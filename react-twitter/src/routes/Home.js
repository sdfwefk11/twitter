import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { dbService } from "twutterbase";
const Home = () => {
  const [twitt, setTwitt] = useState("");
  const [fieldData, setFieldData] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    addingDoc();
    setTwitt("");
    querySnapshot();
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
    });
  };

  useEffect(() => {
    querySnapshot();
  }, []);
  const querySnapshot = async () => {
    const snapshot = await getDocs(collection(dbService, "users"));
    const twittingArr = [];
    snapshot.forEach((doc) => {
      const twitting = doc.data();
      twittingArr.push(twitting);
      setFieldData(twittingArr);
    });
  };
  // console.log(fieldData);
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
      <>
        <form>
          <ul>
            {fieldData.map((item, index) => (
              <li key={index}>
                {item.twitting} {item.date}
              </li>
            ))}
          </ul>
        </form>
      </>
    </div>
  );
};

export default Home;
