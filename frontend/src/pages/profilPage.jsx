import { useState } from "react";
import { Container, Modal, Card, Row, Col, Button, Form, Nav } from "react-bootstrap";
import FooterComponent from "../components/FooterComponent";
import NavComponent from "../components/NavComponent";
import maskapai from "../assets/ic-lionair.png";
import { Link } from "react-router-dom";

const ProfilPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        // untuk menyimpan data jika setelah edit
        setFormData({
            nama: document.getElementsByName("nama")[0].value,
            telpon: document.getElementsByName("telpon")[0].value,
            email: document.getElementsByName("email")[0].value
        });

        // Tutup modal
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleCloseLogoutModal = () => setShowLogoutModal(false);
    const handleShowLogoutModal = () => setShowLogoutModal(true);

    // data bawaan
    const [formData, setFormData] = useState({
        nama: "Jhon Doe",
        telpon: "08123239819328",
        email: "jhon@gmail.com"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [activeKey, setActiveKey] = useState('pending');
    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };

    const renderContent = () => {
        return (
            <Card className="riwayat">
                <Row>
                    <Col lg={4}>
                        <p>Dari</p>
                        <h5>PALEMBANG</h5>
                    </Col>
                    <Col lg={4}>
                        <p>Ke</p>
                        <h5>JAKARTA</h5>
                    </Col>
                    <Col lg={4}>
                        <p>Maskapai</p>
                        <img src={maskapai} alt="" />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg={6}>
                        <p>Keberangkatan</p>
                        <h5>Senin, 15 Januari 2024</h5>
                    </Col>
                    <Col lg={6}>
                        <p>Total Pembayaran</p>
                        <h5>IDR 500.000</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <p>Waktu Keberangkatan</p>
                        <h5>07.00 WIB</h5>
                    </Col>
                    <Col lg={6}>
                        <p>Status</p>
                        {activeKey === 'pending' &&
                            <div className="set d-flex">
                                <h6 className="pending">Belum Bayar</h6>
                                <Link to="/konfirmasi" className="ms-3 mb-3">Lanjut Bayar →</Link>
                            </div>}
                        {activeKey === 'lunas' &&
                            <div className="set d-flex">
                                <h6 className="lunas">Lunas</h6>
                                <Link to="/cetak" className="ms-3 mb-3">Lihat E-Tiket →</Link>
                            </div>}
                        {activeKey === 'selesai' && <h6 className="selesai">Selesai</h6>}
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <div className="profil">
            <NavComponent />
            <Container>
                <h5 className="mt-5 mb-3">Informasi Profil</h5>
                <Card>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <p>Nama Lengkap</p>
                            <h5>{formData.nama}</h5>
                            <p>Nomor Telepon</p>
                            <h5>{formData.telpon}</h5>
                            <p>Email</p>
                            <h5>{formData.email}</h5>
                        </Col>
                        <Col lg={6} className="opsi text-end">
                            <Button variant="btn btn-utama text-light mb-3" onClick={handleShow}> Edit Info</Button>
                            <br />
                            <Button variant="danger" onClick={handleShowLogoutModal}>Keluar Akun</Button>
                        </Col>
                    </Row>
                </Card>

                <Row className="transaksi mt-5">
                    <Col>
                        <h5>Riwayat Transaksi</h5>
                        <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                            <Nav.Item>
                                <Nav.Link eventKey="pending">Belum Bayar</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="lunas">Tiket Tersedia</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="selesai">Selesai</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
            <FooterComponent />

            {/* Modal edit */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label className="mt-2">Nama Lengkap</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="Masukkan Nama Lengkap" name="nama" />
                        <Form.Label className="mt-2">Nomor Telepon</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="Masukkan Nomor Telepon" name="telpon" />
                        <Form.Label className="mt-2">Email</Form.Label>
                        <Form.Control className="mb-2" type="email" placeholder="Masukkan Nama Lengkap" name="email" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Tutup
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal keluar akun */}
            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Keluar Akun</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Anda yakin ingin keluar dari akun?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogoutModal}>
                        Batal
                    </Button>
                    <Button variant="danger" href="/" onClick={handleCloseLogoutModal}>
                        Ya, Keluar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfilPage;
