import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService, storageServie } from "twutterbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import DeleteTwitte from "components/DeleteTwitte";
const Home = ({ userObj }) => {
  const [twitt, setTwitt] = useState("");
  const [fieldData, setFieldData] = useState([]);
  const [imgSource, setImgSource] = useState(null);

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
    )} ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    let downloadFile = "";
    if (imgSource !== null) {
      const fileRef = ref(storageServie, `${userObj.uid}/${uuidv4()}`);
      await uploadString(fileRef, imgSource, "data_url");
      downloadFile = await getDownloadURL(fileRef);
    }
    setImgSource("");
    await addDoc(collection(dbService, "users"), {
      twitting: twitt,
      date: twitteTime,
      uid: userObj.uid,
      downloadFile,
      sortNum: Date.now(),
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
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImgSource(result);
    };
    reader.readAsDataURL(imgFile);
  };
  const onCancelBtn = () => {
    setImgSource(null);
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
        <input type="file" accept="image/*" onChange={onFileChange}></input>
        {imgSource && (
          <div>
            <img alt={imgSource} src={imgSource} width="300px"></img>
            <button onClick={onCancelBtn}>Cancel</button>
          </div>
        )}
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
