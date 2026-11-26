import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function NavBar({ paginaAtiva, onMudarPagina }) {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>Helpdesk de TI</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href="#"
            active={paginaAtiva === 'form'}
            onClick={(e) => {
              e.preventDefault();
              onMudarPagina('form');
            }}
          >
            Abrir Chamado
          </Nav.Link>
          <Nav.Link
            href="#"
            active={paginaAtiva === 'lista'}
            onClick={(e) => {
              e.preventDefault();
              onMudarPagina('lista');
            }}
          >
            Chamados Abertos
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
