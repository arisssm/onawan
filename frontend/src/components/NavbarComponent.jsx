import {Navbar, Container, Nav, NavLink, Button} from 'react-bootstrap';
import logo from "../assets/img-logo.png"
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const [user, setUser] = useState('');
    const [login, setLogin] = useState(false);
    const [idUser, setIdUser] = useState('');
    const navigate = useNavigate();

    const getUser = () => {
        try {
        const token = localStorage.getItem('token');
            if(token){
            const userDecode = jwtDecode(token);
            setUser(userDecode);
            setIdUser(userDecode.id)
            const time = Date.now() / 1000;
                if (userDecode.exp < time ) {
                    localStorage.removeItem('token');
                    setLogin(false)
                } else {
                    setLogin(true)
                }
            } else {
                setLogin(false);
            }        
        } catch (error) {
            console.error('Invalid Token', error);
            // setLogin(true);
        }
    }

    useEffect(()=>{
        getUser();
    }, [])

    
    return (
        <>
            {login ? (
                <Navbar expand="lg">
                <Container>
                <Navbar.Brand href="/beranda"><img src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink href="/beranda">Beranda</NavLink>
                        <NavLink href="/destinasi">Destinasi</NavLink>
                        <NavLink href="/pesan">Pesan Tiket</NavLink>
                        <NavLink href="/tentang-kami">Tentang Kami</NavLink>
                        <div className="vr"></div>
                        <NavLink href={`/profil/${idUser}`}>Profil</NavLink>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
            ) : (
                <Navbar expand="lg">
                    <Container>
                    <Navbar.Brand href="/beranda"><img src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink href="/beranda">Beranda</NavLink>
                            <NavLink href="/destinasi">Destinasi</NavLink>
                            <NavLink href="/tentang-kami">Tentang Kami</NavLink>
                            <Button href="/masuk" variant="outline-dark">Masuk</Button>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </>
    )
}

export default NavbarComponent;