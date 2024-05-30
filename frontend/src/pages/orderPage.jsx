import { Container, Row, Col, Form, Button } from "react-bootstrap";

import NavComponent from "../components/NavComponent";
import PromoComponent from "../components/PromoComponent";
import FooterComponent from "../components/FooterComponent";


const orderPage = () => {

    return (
        <>
            <div className="order">
                <div className="hero-order">
                    <NavComponent />
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className="deskripsi-hero">
                                    <h1>Cek harga tiket pesawat terbaik!</h1>
                                    <p>Cek harga tiket pesawat ke tujuan yang kamu ingin!</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="pesan-tiket">
                    <Container>
                        <Row>
                            <Col>
                                <Form action="/search">
                                    <Row>
                                        <Col lg={10}>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Dari</Form.Label>
                                                    <Form.Control id="inputDari" type="text" placeholder="Masukkan Kota Asal" />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Ke</Form.Label>
                                                    <Form.Control id="inputKe" type="text" placeholder="Masukkan Kota Tujuan" />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Jumlah Penumpang</Form.Label>
                                                    <Form.Control id="inputJumlahPenumpang" type="number" placeholder="Jumlah Penumpang" min="1" />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Pilih Kelas</Form.Label>
                                                    <Form.Control id="inputKelas" as="select">
                                                        <option value="ekonomi">Ekonomi</option>
                                                        <option value="bisnis">Bisnis</option>
                                                        <option value="first">First</option>
                                                    </Form.Control>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Tanggal Berangkat</Form.Label>
                                                    <Form.Control id="inputTanggalBerangkat" type="date"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={2} className="d-flex align-items-end">
                                            <Button variant="btn btn-utama w-100" type="submit">Cari Tiket</Button>
                                        </Col>
                                    </Row>
                                </Form>
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

export default orderPage;