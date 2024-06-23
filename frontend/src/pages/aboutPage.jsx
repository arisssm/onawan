import { Container, Row, Col, Button } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const aboutPage = () => {
    const [aboutBanner, setAboutBanner] =useState([]);
    const [supportBanner, setSupportBanner] =useState([]);
    const [dataAbout, setDataAbout] = useState([]);

    const [user, setUser] = useState('');
    const [login, setLogin] = useState(false);

    const getAboutBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/about-banner');
            setAboutBanner(await response.data.aboutBanner);
            // console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }

    const getDataAbout = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/about');
            setDataAbout(await response.data.about);
            // console.log(response.data.about);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }


    const getSupportBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/support-banner');
            setSupportBanner(await response.data.supportBanner);
            // console.log(response.data.supportBanner);
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

    useEffect(()=>{
        getSupportBanner();
        getDataAbout();
        getAboutBanner();
        getUser();
    }, [])
    return (
        <>
            <div className="about">
                <NavbarComponent />
                {aboutBanner.map((data, index)=> (
                    <div 
                        className="hero-about"
                        key={index}
                        style={{
                            background: `url(http://127.0.0.1:3000/images/${data.image})`,
                            backgroundSize:' cover',
                            height: '580px'
                        }}
                    
                    >
                        <Container>
                            <Row>
                                <Col lg={6}>
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
                {dataAbout.map((data, index)=> (
                    <Container key={index}>
                        <Row className="sejarah">
                            <Col lg={6}>
                                <h5>Sejarah Singkat</h5>
                                <h6>2020 - Awal Perjalanan:</h6>
                                <div>{data.history}</div>
                            </Col>
                            <Col lg={6}>
                                <img src={`http://127.0.0.1:3000/images/${data.imageHistory}`} alt="sejarah" />
                            </Col>
                        </Row>
                        <Row className="visimisi">
                            <Col lg={6}>
                                <div className="visi">
                                    <img src="../src/assets/ic-visi.png" alt="" className="ic-visi" />
                                    <h2>Visi Kami</h2>
                                    <div>{data.vision}</div>
                                </div>
                                <div className="misi mt-5">
                                    <img src="../src/assets/ic-misi.png" alt="" className="ic-misi" />
                                    <h2>Misi Kami</h2>
                                    <div>
                                        {data.mission.split('\n').map((step,index )=> (
                                            <div key={index}>{step}</div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <img src={`http://127.0.0.1:3000/images/${data.image}`} alt="image" className="img-visimisi" />
                            </Col>
                        </Row>
                    </Container>
                    ))
                }
                <Container>
                    <Row className="bantuan">
                        {supportBanner.map((data, index) => (
                            <Col key={index}>
                                <img src={`http://127.0.0.1:3000/images/${data.image}`} alt="support-banner" />
                            </Col>
                            ))
                        }
                    </Row>
                </Container>
                <FooterComponent/>
            </div>
        </>
    );
}

export default aboutPage;