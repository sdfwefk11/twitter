import Routing from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../twutterbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? <Routing isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
