export default function ControlesGerais({
    onZerarPlacar,
    onDesfazerJogada
}) {
    return (
        <div>
            <button onClick={onZerarPlacar}>
                Zerar Placar
            </button>

            <button onClick={onDesfazerJogada}>
                Desfazer Última Jogada
            </button>
        </div>
    );
}