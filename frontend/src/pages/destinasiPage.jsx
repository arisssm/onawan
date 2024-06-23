import { Container, Row, Col, Button, Card } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import PromoComponent from "../components/PromoComponent";
import FooterComponent from "../components/FooterComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const destinasiPage = () => {
    const [destinationBanner, setDestinationBanner] = useState([]);
    const [dataRecommended, setRecommended] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const getRecommended = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/destination');
            setRecommended(response.data.destination);
            // console.log(response.data.destination);
        } catch (error) {
            console.error('Cek lagi kode disini', error);
        }
    }

    const getDestinationBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/destination-banner');
            setDestinationBanner(await response.data.destinationBanner);
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

    useEffect(()=> {
        getRecommended();
        getDestinationBanner();
        getUser();
    }, [])
    return (
        <>
            <div className="destinasi">
                <NavbarComponent />
                {destinationBanner.map((data, index)=>(
                    <div className="hero-destinasi" key={index}
                        style={{
                            background: `url(http://127.0.0.1:3000/images/${data.image})`,
                            backgroundSize:' cover',
                            height: '580px'
                        }}
                    >
                        <Container>
                            <Row>
                                <Col lg={5}>
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

                <div className="tempat-indo">
                    <Container>
                        <h5>Tempat rekomendasi di Indonesia</h5>
                        <Row className="mt-3">
                            <Col>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    breakpoints={{
                                        992: {
                                            slidesPerView: 4
                                        }
                                    }}
                                >
                                {dataRecommended.filter(data => data.idnRecommendation).map((data, index) =>(
                                    <SwiperSlide key={index}>
                                        <Card>
                                            <Card.Img variant="top" src={`http://127.0.0.1:3000/images/${data.image}`}/>
                                            <Card.Body>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Link to="/pesan">{data.name}</Link>
                                                        <Card.Text>{data.location}</Card.Text>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Card.Text>Mulai dari</Card.Text>
                                                        <Card.Title className="cost">IDR {data.price}</Card.Title>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </SwiperSlide>
                                    ))
                                }
                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="tempat-luarnegri">
                    <Container>
                        <h5>Tempat rekomendasi di luar negri</h5>
                        <Row className="mt-3">
                            <Col>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    breakpoints={{
                                        992: {
                                            slidesPerView: 4
                                        }
                                    }}
                                >
                                    {dataRecommended.filter(data => data.interRecommendation).map((data, index) =>(
                                        <SwiperSlide key={index}>
                                            <Card>
                                                <Card.Img variant="top" src={`http://127.0.0.1:3000/images/${data.image}`}/>
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Link to="/pesan">{data.name}</Link>
                                                            <Card.Text>{data.location}</Card.Text>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Card.Text>Mulai dari</Card.Text>
                                                            <Card.Title className="cost">IDR {data.price}</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <PromoComponent />
                <FooterComponent />
            </div>
        </>
    );
}

export default destinasiPage;