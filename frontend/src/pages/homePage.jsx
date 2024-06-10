import { Container, Row, Col, Button } from "react-bootstrap";

// import component
import NavbarComponent from "../components/NavbarComponent";
import TempatRekomendasi from "../components/TempatRekomendasi";
import PromoComponent from "../components/PromoComponent";
import TestimoniComponent from "../components/TestimoniComponent";
import MaskapaiComponent from "../components/MaskapaiComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const homePage = () => {
    const [homeBanner, setHomeBanner] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const getHomeBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/home-banner');
            setHomeBanner(await response.data.homeBanner);
            // console.log(response.data.homeBanner);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }
    const getUser = () => {
        try {
        const token = localStorage.getItem('token');
        if(token){
            const userDecode = jwtDecode(token);
            setUser(userDecode);
            setLogin(true)
            } else {
                setLogin(false);
            }        
        } catch (error) {
            console.error('Invalid Token', error);
            setLogin(true);
        }
    }

    useEffect(()=> {
        getHomeBanner();
        getUser();
    }, [])
    return (
        <>
            <div className="beranda">
                <NavbarComponent />
                {homeBanner.map((data, index)=>(
                <div className="hero" key={index}
                    style={{
                        background: `url(http://127.0.0.1:3000/images/${data.image})`,
                        backgroundSize:' cover',
                        height: '580px'
                    }}
                >
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className="deskripsi-hero">
                                    <h1>{data.headline}</h1>
                                    <p>{data.subHeadline}</p>
                                    { 
                                        login ? 
                                        (
                                            <Link to="/pesan">
                                                <Button variant="outline-dark">Pesan Sekarang</Button>
                                            </Link>
                                        ) :
                                        
                                        (
                                            <Link to="/masuk">
                                                <Button variant="outline-dark">Pesan Sekarang</Button>
                                            </Link>
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                ))}
                <TempatRekomendasi />
                <PromoComponent />
                <TestimoniComponent />
                <MaskapaiComponent />
                <FooterComponent />
            </div>
        </>
    );
}

export default homePage;