import { useState } from "react";

function Botao() {
    const [count, setCount] = useState(0)

    function ClickNoBotao() {
        setCount(count + 1);
    }

    return (
        <button onClick={ClickNoBotao}>
            {count} Cliques foi registrado
        </button>
    );
}
export default Botao;