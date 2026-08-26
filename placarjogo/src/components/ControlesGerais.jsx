export default function ControlesGerais({ onZerarPlacar }) {
    return (
        <div>
            <button onClick={onZerarPlacar}>
                Zerar Placar
            </button>
        </div>
    );
}