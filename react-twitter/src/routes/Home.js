import React, { useEffect, useState } from "react";

import Twitte from "components/Twitte";
import Factory from "components/Factory";
import { collection, onSnapshot } from "firebase/firestore";
import { dbService } from "twutterbase";
const Home = ({ userObj }) => {
  const [fieldData, setFieldData] = useState([]);
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
  return (
    <div>
      <Factory userObj={userObj} />
      <div>
        {fieldData.map((item, index) => (
          <Twitte key={index} twittObj={item} uid={userObj.uid === item.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
