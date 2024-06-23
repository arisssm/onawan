import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimoniComponent = () => {
    const [dataTestimoni, setTestimoni] = useState([]);
    const navigate = useNavigate();
    const getTestimonial = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/testimonial');
            setTestimoni(response.data.testimonial);
            // console.log(response.data.testimonial);
        } catch(error){
            console.error('Cek lagi kode disini', error);
        }

    };
    useEffect(()=> {
        getTestimonial();
    }, []);
    return (
        <div className="testimoni">
            <Container>
                <Row>
                    <Col>
                        <h5>Apa kata mereka tentang kami?</h5>
                        <p>Lihat cerita mereka setelah traveling.</p>
                    </Col>
                </Row>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        992: {
                            slidesPerView: 3
                        }
                    }}
                >   
                    {dataTestimoni.map((data, index)=> (
                        <SwiperSlide key={index}>
                            <Card>
                                <Row>
                                    <Col md={6}>
                                        <img src={`http://127.0.0.1:3000/images/${data.image}`} className="img-fluid rounded-start" alt="..." />
                                    </Col>
                                    <Col md={6}>
                                        <CardBody>
                                            <p className="card-text">{data.content}</p>
                                            <h6 className="card-title">{data.fullname}</h6>
                                            <p className="card-text"><small className="text-body-secondary">{data.status}</small></p>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
    );
}

export default TestimoniComponent;
