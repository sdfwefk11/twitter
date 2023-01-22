import React, { useEffect, useState } from "react";
import Twitte from "components/Twitte";
import Factory from "components/Factory";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "twutterbase";
const Home = ({ userObj }) => {
  const [fieldData, setFieldData] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(dbService, "users"), orderBy("sortNum", "desc")),
      (snapshot) => {
        const twittingArr = snapshot.docs.map((doc) => ({
          uid: doc.uid,
          date: doc.date,
          twitting: doc.twitting,
          id: doc.id,
          sortNum: doc.sortNum,
          ...doc.data(),
        }));
        setFieldData(twittingArr);
      }
    );
  }, []);
  return (
    <div className="container">
      <Factory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {fieldData.map((item, index) => (
          <Twitte key={index} twittObj={item} uid={userObj.uid === item.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
