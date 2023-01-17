import Routing from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../twutterbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  // console.log(userObj);
  return (
    <div>
      {init ? (
        <Routing isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
