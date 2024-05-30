import {Navbar, Container, Nav, NavLink, Button} from 'react-bootstrap';
import logo from "../assets/img-logo.png"

const NavbarComponent = () => {
    return (
        <>
            <Navbar expand="lg">
                <Container>
                <Navbar.Brand href="/"><img src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink href="/">Beranda</NavLink>
                        <NavLink href="/destinasi">Destinasi</NavLink>
                        <NavLink href="/about">Tentang Kami</NavLink>
                        <Button href="/masuk" variant="outline-dark">Masuk</Button>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent;