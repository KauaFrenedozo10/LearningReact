import { useState } from "react";

function Botao({titulo, onRegistrar}) {
    const [count, setCount] = useState(0);

    function ClickNoBotao() {
        setCount(count + 1);
        onRegistrar();
    }
   

    return (
        <div style={{
            width: "80px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "5px"
        }}>
            <span style={{ fontSize: "14px", fontWeight: "500"}}>
                {titulo} - <strong>{count}</strong>
            </span>
            
            <button 
            
                onClick={ClickNoBotao}
                
                style={{
                    backgroundColor: "#087ff5",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "3px",
                    cursor: "pointer"
                }}
            >
                Registrar
            </button>
        </div>
    );
}

export default Botao;