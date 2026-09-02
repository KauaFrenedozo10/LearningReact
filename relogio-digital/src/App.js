import { useState, useEffect } from "react";
import "./App.css";

function App() {
 
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setHora(new Date());
    }, );
  },);

  return (

    <h1>
      {hora.toLocaleTimeString()}
    </h1>

      
  );
}

export default App;