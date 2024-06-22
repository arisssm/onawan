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
            console.log(response.data.testimonial);
        } catch(error){
            console.error('Cek lagi kode disini', error);
        }

    };
    useEffect(()=> {
        getTestimonial();
    });
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
                    <SwiperSlide>
                        <Card>
                            <Row>
                                <Col md={6}>
                                    <img src="../src/assets/testi1.png" className="img-fluid rounded-start" alt="..." />
                                </Col>
                                <Col md={6}>
                                    <CardBody>
                                        <p className="card-text">“Jaman sekarang udah ga perlu repot lagi, gue pesen tiket serasa masak mi instan, prosesnya cepet”</p>
                                        <h6 className="card-title">Aldoe Rahardian</h6>
                                        <p className="card-text"><small className="text-body-secondary">Karyawan</small></p>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </Container>
        </div>
    );
}

export default TestimoniComponent;
