import { Container, Row, Col, Button } from "react-bootstrap";
// import {Link} from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const aboutPage = () => {
    return (
        <>
            <div className="about">
                <div className="hero-about">
                    <NavbarComponent />
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <div className="deskripsi-hero">
                                    <h1>Kami membantu semua orang agar bisa travelling dengan nyaman.</h1>
                                    <p>Kami memiliki visi dan misi yang bertujuan untuk memberikan kenyamanan dalam pemesanan tiket pesawat.</p>
                                    <Button href="/masuk" variant="outline-dark">Pesan Sekarang</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
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