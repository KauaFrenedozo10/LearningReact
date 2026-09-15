function NavBar({ aba, setAba }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">

        <span className="navbar-brand">
          Biblioteca
        </span>

        <div className="navbar-nav">

          <button
            className={`nav-link ${aba === "cadastro" ? "active" : ""}`}
            onClick={() => setAba("cadastro")}
          >
            Cadastro
          </button>

          <button
            className={`nav-link ${aba === "acervo" ? "active" : ""}`}
            onClick={() => setAba("acervo")}
          >
            Acervo
          </button>

        </div>

      </div>
    </nav>
  );
}

export default NavBar;
