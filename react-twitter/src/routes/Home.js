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
    await addDoc(collection(dbService, "users"), {
      twitting: twitt,
    });
  };
  useEffect(() => {
    querySnapshot();
  }, []);
  const querySnapshot = async () => {
    const snapshot = await getDocs(collection(dbService, "users"));
    const arr = [];
    snapshot.forEach((doc) => {
      const twitting = doc.get("twitting");
      arr.push(twitting);
    });
    setFieldData(arr);
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
        <input type="submit" value="Twitt"></input>
      </form>
      <>
        <form>
          <ul>
            {fieldData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </form>
      </>
    </div>
  );
};

export default Home;
