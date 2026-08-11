const OrdemEquipamento = ({ equipamento }) => {
    const corStatus = {
        Funcionando: "green",
        Parada: "yellow",
        Quebrada: "red"
    };

    return (
        <div
            style={{
                width: "20%",
                padding: "25px",
                border: "2px solid blue",
                backgroundColor: "lightgray",
                borderRadius: "50px"
            }}
        >
            <img
                src={equipamento.image}
                style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
            />

            <h3>
                Nome: {equipamento.nomeequipamento}
            </h3>

            <p>
                Status:
                <strong
                    style={{
                        color: corStatus[equipamento.status]
                    }}
                >
                    {" "}{equipamento.status}
                </strong>
            </p>

            <p>
                Função: <strong>{equipamento.funcao}</strong>
            </p>
        </div>
    );
};

export default OrdemEquipamento;