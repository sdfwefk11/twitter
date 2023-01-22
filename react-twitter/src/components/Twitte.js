import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageServie } from "twutterbase";
import { deleteObject, ref } from "firebase/storage";

const Twitte = ({ twittObj, uid }) => {
  const [editing, setEditing] = useState(false);
  const [newTwitt, setNewTwitt] = useState(twittObj.twitting);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this twitt?");
    const del = doc(dbService, "users", `${twittObj.id}`);
    const delPhoto = ref(storageServie, twittObj.downloadFile);
    if (ok) {
      await deleteDoc(del);
      if (twittObj.downloadFile) {
        await deleteObject(delPhoto);
      }
    } else {
      alert("canceled");
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const update = doc(dbService, "users", `${twittObj.id}`);
    await updateDoc(update, {
      twitting: newTwitt,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwitt(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              placeholder="Edit here!"
              type="text"
              value={newTwitt}
              required
            ></input>
            <input type="submit" value="Save"></input>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>
            {twittObj.twitting} {twittObj.date}
          </h4>
          {twittObj.downloadFile && (
            <img
              alt={twittObj.downloadFile}
              src={twittObj.downloadFile}
              width="200px"
            ></img>
          )}
          {uid && (
            <>
              <button onClick={onDeleteClick}>Delete Twitte</button>
              <button onClick={toggleEditing}>Edit Twitte</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Twitte;
