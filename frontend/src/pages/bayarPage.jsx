import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
import FooterComponent from "../components/FooterComponent";

const bayarPage = () => {
    const [activeKey, setActiveKey] = useState('transfer');
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };

    const renderContent = () => {
        if (activeKey === "transfer") {
            return (
                <Card className="metode">
                    <img src="../src/assets/ic-mandiri.png" alt="" />
                    <h6>Bank Mandiri</h6>
                    <h5>9021927178272</h5>
                    <p>a.n Onawan Indonesia</p>
                </Card>
            );
        } else if (activeKey === "ovo") {
            return (
                <Card className="metode">
                    <img src="../src/assets/ic-ovo.png" alt="" />
                    <h6>OVO</h6>
                    <h5>9021927178272</h5>
                    <p>a.n Onawan Indonesia</p>
                </Card>
            );
        } else if (activeKey === "indomaret") {
            return (
                <Card className="metode">
                    <img src="../src/assets/ic-indomaret.png" alt="" />
                    <h6>Indomaret</h6>
                    <h5>9021927178272</h5>
                    <p>a.n Onawan Indonesia</p>
                </Card>
            );
        }
    }

    return (
        <>
            <div className="bayar">
                <NavbarComponent />
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h5 className="mt-5">Pilih Metode Pembayaran</h5>
                            <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="transfer">Transfer Bank</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="ovo">OVO</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="indomaret">Indomaret</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={8}>
                            {activeKey === "transfer" && renderContent()}
                            {activeKey === "ovo" && renderContent()}
                            {activeKey === "indomaret" && renderContent()}
                        </Col>
                        <Col lg={4}>
                            <Card className="rincian">
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
                                <hr />
                                <p>Pilihan Maskapai</p>
                                <img src="../src/assets/ic-lionair.png" alt="" />
                                <p>Keberangkatan</p>
                                <h5>Senin, 15 Januari 2024</h5>
                                <p>Waktu Keberangkatan</p>
                                <h5>07.00</h5>
                                <hr />
                                <Row className="mt-3">
                                    <Col lg={6}>
                                        <h5 className="text-secondary">Total Pembayaran</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <h5>IDR 500.000</h5>
                                    </Col>
                                </Row>
                            </Card>
                            <Button href="/konfirmasi" variant="btn btn-utama mt-3 w-100">Selanjutnya</Button>
                        </Col>
                    </Row>
                </Container>
                <FooterComponent/>
            </div>
        </>
    );
}

export default bayarPage;