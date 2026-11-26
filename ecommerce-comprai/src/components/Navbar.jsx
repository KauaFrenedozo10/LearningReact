import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Catálogo", end: true },
  { to: "/pedidos", label: "Pedidos" },
  { to: "/clientes", label: "Clientes" },
  { to: "/admin/produtos", label: "Administrar produtos" },
];

const navLinkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

/** Menu responsivo: no celular fica recolhido atrás do botão; a partir de "lg" aparece completo. */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Principal">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            Comprai
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            aria-controls="main-menu"
            aria-expanded={isOpen}
            aria-label="Abrir ou fechar o menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="main-menu" className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto">
              {NAV_LINKS.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink to={link.to} end={link.end} className={navLinkClass} onClick={closeMenu}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink to="/carrinho" className="btn btn-light" onClick={closeMenu}>
              Carrinho <span className="badge text-bg-primary">{itemCount}</span>
              <span className="visually-hidden"> itens no carrinho</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
