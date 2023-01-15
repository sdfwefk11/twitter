import Routing from "./Router";
import { useState } from "react";
import { authService } from "../twutterbase";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <Routing isLoggedIn={isLoggedIn} />
      <footer>&copy; Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
