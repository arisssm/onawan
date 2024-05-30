import { Container, Row, Col, Button, Card } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import PromoComponent from "../components/PromoComponent";
import FooterComponent from "../components/FooterComponent";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";

const destinasiPage = () => {
    return (
        <>
            <div className="destinasi">
                <div className="hero-destinasi">
                    <NavbarComponent />
                    <Container>
                        <Row>
                            <Col lg={5}>
                                <div className="deskripsi-hero">
                                    <h1>Kami rekomendasikan destinasi wisata terbaik.</h1>
                                    <p>Destinasi wisata dengan fasilitas dan pemandangan yang indah untuk menyegarkan pikiran.</p>
                                    <Button href="/masuk" variant="outline-dark">Pesan Sekarang</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

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
                                    <SwiperSlide>
                                        <Card>
                                            <Card.Img variant="top" src="../src/assets/img-rajaAmpat.png" />
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
                                            <Card.Img variant="top" src="../src/assets/img-palembang.png" />
                                            <Card.Body>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Link to="/order">Palembang</Link>
                                                        <Card.Text>Indonesia</Card.Text>
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
                                            <Card.Img variant="top" src="../src/assets/img-batam.png" />
                                            <Card.Body>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Link to="/order">Batam</Link>
                                                        <Card.Text>Indonesia</Card.Text>
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
                                            <Card.Img variant="top" src="../src/assets/img-yogyakarta.png" />
                                            <Card.Body>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Link to="/order">Yogyakarta</Link>
                                                        <Card.Text>Indonesia</Card.Text>
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
                                    <SwiperSlide>
                                        <Card>
                                            <Card.Img variant="top" src="../src/assets/img-london.png" />
                                            <Card.Body>
                                                <Row>
                                                    <Col lg={6}>
                                                        <Link to="/order">London</Link>
                                                        <Card.Text>Inggris</Card.Text>
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
                                            <Card.Img variant="top" src="../src/assets/img-kyoto.png" />
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
                                            <Card.Img variant="top" src="../src/assets/img-dubai.png" />
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
                                            <Card.Img variant="top" src="../src/assets/img-paris.png" />
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

                <PromoComponent />
                <FooterComponent />
            </div>
        </>
    );
}

export default destinasiPage;