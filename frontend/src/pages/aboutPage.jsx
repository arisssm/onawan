import { Container, Row, Col, Button } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const aboutPage = () => {
    const [aboutBanner, setAboutBanner] =useState([]);
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
                <Container>
                {/* <div className="sejarah"> */}
                    {/* <Container> */}
                        <Row className="sejarah">
                            <Col lg={6}>
                                <h5>Sejarah Singkat</h5>
                                <h6>2020 - Awal Perjalanan:</h6>
                                <p>Onawan lahir dari gagasan untuk memberikan solusi inovatif dalam pemesanan tiket pesawat. Pada tahun 2020, pendiri kami, Jhon, memiliki visi untuk menciptakan platform yang tidak hanya memudahkan proses pemesanan tiket pesawat tetapi juga memberikan pengalaman perjalanan yang tak terlupakan.</p>
                            </Col>
                            <Col lg={6}>
                                <img src="../src/assets/img-about-sejarah.png" alt="" />
                            </Col>
                        </Row>
                    {/* </Container> */}
                {/* </div> */}

                {/* <div className="visimisi"> */}
                    {/* <Container> */}
                        <Row className="visimisi">
                            <Col lg={6}>
                                <div className="visi">
                                    <img src="../src/assets/ic-visi.png" alt="" className="ic-visi" />
                                    <h2>Visi Kami</h2>
                                    <p>Menjadi platform pemesanan tiket pesawat terkemuka yang memberikan pengalaman perjalanan yang tak terlupakan dan memberikan nilai tambah bagi setiap pelanggan kami.</p>
                                </div>
                                <div className="misi mt-5">
                                    <img src="../src/assets/ic-misi.png" alt="" className="ic-misi" />
                                    <h2>Misi Kami</h2>
                                    <h5>1. Kepuasan Pelanggan:</h5>
                                    <p>Menempatkan kepuasan pelanggan sebagai prioritas utama dengan menyediakan layanan pelanggan yang responsif, ramah, dan berkomitmen.</p>
                                    <h5>2. Memberikan Kemudahan dan Keamanan:</h5>
                                    <p>Menghadirkan layanan pemesanan tiket pesawat yang mudah, cepat, dan aman.</p>
                                    <h5>3. Harga Terjangkau:</h5>
                                    <p>Menawarkan harga tiket pesawat yang kompetitif dan transparan, serta memberikan promo dan diskon.</p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <img src="../src/assets/img-about-visimisi.png" alt="" className="img-visimisi" />
                            </Col>
                        </Row>
                    {/* </Container> */}
                {/* </div> */}

                {/* <div className="bantuan"> */}
                    {/* <Container> */}
                        <Row className="bantuan">
                            <Col>
                                <img src="../src/assets/img-about-cta.png" alt="" />
                            </Col>
                        </Row>
                    {/* </Container> */}
                {/* </div> */}
                </Container>
                <FooterComponent/>
            </div>
        </>
    );
}

export default aboutPage;