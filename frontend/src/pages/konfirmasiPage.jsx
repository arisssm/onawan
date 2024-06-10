import NavbarComponent from "../components/NavbarComponent";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import maskapai from "../assets/ic-lionair.png";
import FooterComponent from "../components/FooterComponent";

const konfirmasiPage = () => {
    return (
        <>
            <div className="konfirmasi">
                <NavbarComponent/>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h6 className="mt-5 mb-3">Silahkan melakukan pembayaran sebelum tanggal 14/01/2021, pukul 23.00 WIB</h6>
                            <Card>
                                <Row>
                                    <Col lg={6}>
                                        <p>Dari</p>
                                        <h5>PALEMBANG</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Ke</p>
                                        <h5>JAKARTA</h5>
                                    </Col>
                                </Row>

                                <p>Pilihan Maskapai</p>
                                <img src={maskapai} alt="" />

                                <Row>
                                    <Col lg={6}>
                                        <p>Keberangkatan</p>
                                        <h5>Senin, 15 Januari 2024</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Waktu Keberangkatan</p>
                                        <h5>07.00</h5>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="mt-3">
                                    <Col lg={6}>
                                        <h6>Transfer Bank : Bank Mandiri <b>9021927178272</b></h6>
                                    </Col>
                                    <Col lg={6}>
                                        <h6 className="text-secondary">Total Pembayaran : <b className="text-dark">IDR 500.000</b></h6>
                                    </Col>
                                </Row>
                            </Card>

                            <div className="opsi mt-3">
                                <Button href="/cetak" variant="btn btn-utama">Sudah Bayar</Button>
                                <Link to="/home" className="ms-3">Ke Beranda</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <FooterComponent/>
            </div>
        </>
    );

}

export default konfirmasiPage;