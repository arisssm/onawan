import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

import NavComponent from "../components/NavComponent";
import FooterComponent from "../components/FooterComponent";


const searchPage = () => {
    return (
        <>
            <div className="search">
                <NavComponent />
                <Container>
                    {/*Hasil pencarian */}
                    <div className="cari">
                        <Row>
                            <Col lg={3}>
                                <p>Dari</p>
                                <h5 id="dariValue">PALEMBANG</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Ke</p>
                                <h5 id="keValue">JAKARTA</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Jumlah Penumpang | Kelas</p>
                                <h5 id="jumlahPenumpangValue">1 Penumpang, Ekonomi</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Tanggal Berangkat</p>
                                <h5 id="tanggalBerangkatValue">Senin, 15 Januari 2024</h5>
                            </Col>
                        </Row>
                    </div>

                    <div className="hasil">
                        <h5 className="mb-3">Pilihan Maskapai Tersedia</h5>

                        <Row className="mb-5">
                            <Col lg={4}>
                                <div className="card-pilihan">
                                    <Link to="/info"><img src="../src/assets/ic-lionair.png" alt="" /></Link>
                                    <Row className="pilihan-maskapai">
                                        <Link to="/info">Lion Air</Link>
                                        <Col lg={2}>
                                            <h5>07.00</h5>
                                            <p><small>PLM</small></p>
                                        </Col>
                                        <Col lg={2} className="text-center">
                                            <p><small>2 Jam</small></p>
                                            <hr />
                                            <p><small>Langsung</small></p>
                                        </Col>
                                        <Col lg={2}>
                                            <h5>09.00</h5>
                                            <p><small>JKT</small></p>
                                        </Col>
                                        <Col lg={6} className="biaya">
                                            <h6>Biaya</h6>
                                            <h4>IDR 200.000</h4>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div className="card-pilihan">
                                    <Link to="/info"><img src="../src/assets/ic-citilink.png" alt="" /></Link>
                                    <Row className="pilihan-maskapai">
                                        <Link to="/info">Citilink</Link>
                                        <Col lg={2}>
                                            <h5>08.00</h5>
                                            <p><small>PLM</small></p>
                                        </Col>
                                        <Col lg={2} className="text-center">
                                            <p><small>2 Jam</small></p>
                                            <hr />
                                            <p><small>Langsung</small></p>
                                        </Col>
                                        <Col lg={2}>
                                            <h5>10.00</h5>
                                            <p><small>JKT</small></p>
                                        </Col>
                                        <Col lg={6} className="biaya">
                                            <h6>Biaya</h6>
                                            <h4>IDR 250.000</h4>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div className="card-pilihan">
                                    <Link to="/info"><img src="../src/assets/ic-batikair.png" alt="" /></Link>
                                    <Row className="pilihan-maskapai">
                                        <Link to="/info">Batik Air</Link>
                                        <Col lg={2}>
                                            <h5>09.00</h5>
                                            <p><small>PLM</small></p>
                                        </Col>
                                        <Col lg={2} className="text-center">
                                            <p><small>2 Jam</small></p>
                                            <hr />
                                            <p><small>Langsung</small></p>
                                        </Col>
                                        <Col lg={2}>
                                            <h5>11.00</h5>
                                            <p><small>JKT</small></p>
                                        </Col>
                                        <Col lg={6} className="biaya">
                                            <h6>Biaya</h6>
                                            <h4>IDR 300.000</h4>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>


                </Container>
                <FooterComponent />
            </div>
        </>
    );
}

export default searchPage;