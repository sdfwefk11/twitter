import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageServie } from "twutterbase";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              placeholder="Edit here!"
              type="text"
              value={newTwitt}
              required
              autoFocus
              className="formInput"
            ></input>
            <input type="submit" value="Save" className="formBtn"></input>
          </form>
          <span className="formBtn cancelBtn" onClick={toggleEditing}>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h3 className="줄바꿈">
            {twittObj.twitting}
            <p>
              <span>{twittObj.date}</span>
            </p>
          </h3>
          {twittObj.downloadFile && (
            <img alt={twittObj.downloadFile} src={twittObj.downloadFile}></img>
          )}
          {uid && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                Delete
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                Edit
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Twitte;
