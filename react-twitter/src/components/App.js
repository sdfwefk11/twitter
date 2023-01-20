import Routing from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../twutterbase";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <div>
      {init ? (
        <Routing
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        //userObj = 현재 로그인한 유저의 정보를 Home에 넘겨서 사용자로부터 input에 값을 입력받을때 uid도 DB에 같이 넘기기위해 따로 state를 지정
        "Initializing..."
      )}
      <footer>&copy; Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
