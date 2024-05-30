import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

const TestimoniComponent = () => {
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
                    <SwiperSlide>
                        <Card>
                            <Row>
                                <Col md={6}>
                                    <img src="../src/assets/testi2.png" className="img-fluid rounded-start" alt="..." />
                                </Col>
                                <Col md={6}>
                                    <CardBody>
                                        <p className="card-text">“Websitenya mudah diakses, proses pemesanan tiketnya juga mudah banget”</p>
                                        <h6 className="card-title">Rie Alhikma</h6>
                                        <p className="card-text"><small className="text-body-secondary">Mahasiswa</small></p>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card>
                            <Row>
                                <Col md={6}>
                                    <img src="../src/assets/testi3.png" className="img-fluid rounded-start" alt="..." />
                                </Col>
                                <Col md={6}>
                                    <CardBody>
                                        <p className="card-text">“Metode bayarnya banyak, jadi ngemudahin banget buat beli tiket liburan, apalagi biayanya murah.”</p>
                                        <h6 className="card-title">Kevin</h6>
                                        <p className="card-text"><small className="text-body-secondary">Mahasiswa</small></p>
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
