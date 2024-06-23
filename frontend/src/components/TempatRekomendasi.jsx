import { Container, Row, Col, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const TempatRekomendasi = () => {
    const [dataRecommended, setRecommended] = useState([]);
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

    useEffect(()=>{
        getRecommended();
    }, []);
    return (
        <div className="tempat-rekomendasi">
            <Container>
                <h5>Tempat rekomendasi yang kamu suka</h5>
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
                        {dataRecommended.filter(data => data.isRecommendation).map((data, index) =>(
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
    )
}

export default TempatRekomendasi;