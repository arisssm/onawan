import {Navbar, Container, Nav, NavLink, Button} from 'react-bootstrap';
import logo from "../assets/img-logo.png"

const NavComponent = () => {
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
                        <NavLink href="/order">Pesan Tiket</NavLink>
                        <NavLink href="/about">Tentang Kami</NavLink>
                        <div className="vr"></div>
                        <NavLink href="/profil">Profil</NavLink>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavComponent;