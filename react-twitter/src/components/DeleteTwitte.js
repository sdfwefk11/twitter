import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "twutterbase";

const DeleteTwitte = ({ twittObj, uid }) => {
  const del = doc(dbService, "users", `${twittObj.id}`);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this twitt?");
    if (ok) {
      deleteDoc(del);
    } else {
      alert("canceled");
    }
  };

  return (
    <div>
      <h4>
        {twittObj.twitting} {twittObj.date}
      </h4>
      {uid && (
        <>
          <button onClick={onDeleteClick}>Delete Twitte</button>
          <button>Edit Twitte</button>
        </>
      )}
    </div>
  );
};

export default DeleteTwitte;
