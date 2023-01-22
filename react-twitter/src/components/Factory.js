import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { dbService, storageServie } from "twutterbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const Factory = ({ userObj }) => {
  const [twitt, setTwitt] = useState("");
  const [imgSource, setImgSource] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    addingDoc();
    setTwitt("");
    if (twitt === "") {
      return;
    }
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
    const day = (now.getDay() + 1).toString();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();
    const twitteTime = `${year}/${day.padStart(2, "0")}/${date.padStart(
      2,
      "0"
    )} ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    let downloadFile = "";
    if (imgSource !== "") {
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input
          type="submit"
          value="Twitt"
          className="factoryInput__arrow"
        ></input>
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      ></input>
      {imgSource && (
        <div className="factoryForm__attachment">
          <img
            alt={imgSource}
            src={imgSource}
            style={{
              backgroundImage: imgSource,
            }}
          ></img>
          <div className="factoryForm__clear" onClick={onCancelBtn}>
            <span>Clear</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default Factory;
