import { Container, Row, Col, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom";
import rajaAmpatImg from '../assets/img-rajaAmpat.png';
import kyotoImg from '../assets/img-kyoto.png';
import dubaiImg from '../assets/img-dubai.png';
import parisImg from '../assets/img-paris.png';

const TempatRekomendasi = () => {
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
                            <SwiperSlide>
                                <Card>
                                    <Card.Img variant="top" src={rajaAmpatImg} />
                                    <Card.Body>
                                        <Row>
                                            <Col lg={6}>
                                                <Link to="/order">Raja Ampat</Link>
                                                <Card.Text>Indonesia</Card.Text>
                                            </Col>
                                            <Col lg={6}>
                                                <Card.Text>Mulai dari</Card.Text>
                                                <Card.Title className="cost">IDR 200K</Card.Title>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card>
                                    <Card.Img variant="top" src={kyotoImg} />
                                    <Card.Body>
                                        <Row>
                                            <Col lg={6}>
                                                <Link to="/order">Kyoto</Link>
                                                <Card.Text>Jepang</Card.Text>
                                            </Col>
                                            <Col lg={6}>
                                                <Card.Text>Mulai dari</Card.Text>
                                                <Card.Title className="cost">IDR 500K</Card.Title>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card>
                                    <Card.Img variant="top" src={dubaiImg} />
                                    <Card.Body>
                                        <Row>
                                            <Col lg={6}>
                                                <Link to="/order">Dubai</Link>
                                                <Card.Text>Uni Emirat Arab</Card.Text>
                                            </Col>
                                            <Col lg={6}>
                                                <Card.Text>Mulai dari</Card.Text>
                                                <Card.Title className="cost">IDR 900K</Card.Title>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card>
                                    <Card.Img variant="top" src={parisImg} />
                                    <Card.Body>
                                        <Row>
                                            <Col lg={6}>
                                                <Link to="/order">Paris</Link>
                                                <Card.Text>Perancis</Card.Text>
                                            </Col>
                                            <Col lg={6}>
                                                <Card.Text>Mulai dari</Card.Text>
                                                <Card.Title className="cost">IDR 1500K</Card.Title>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TempatRekomendasi;