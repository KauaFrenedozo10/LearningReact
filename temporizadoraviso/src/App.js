
import { useEffect, useState } from "react";

function AvisoTemporizado() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div>
      {visivel && <p>Bem-vindo!</p>}
    </div>
  );
}

export default AvisoTemporizado;

