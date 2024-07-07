import { useState, useEffect } from "react";
import { Container, Modal, Card, Row, Col, Button, Form, Nav } from "react-bootstrap";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import maskapai from "../assets/ic-lionair.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from 'jwt-decode';

const ProfilPage = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const showAlert = ( title, text, icon) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleCloseLogoutModal = () => setShowLogoutModal(false);
    const handleShowLogoutModal = () => setShowLogoutModal(true);

    const [ payments, setPayments] = useState([]);
    const [ user, setUser] = useState({});
    const [ id, setId] = useState('');

    const [ login, setLogin] = useState(true);

    // data bawaan
    const [formData, setFormData] = useState({
        id: '',
        fullname: '',
        phone: '',
        email: '',
    });

    const getUser = async() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userDecode = jwtDecode(token);
                console.log(userDecode);
                setId(userDecode.id);
                
                const time = Date.now() / 1000;
                if (userDecode.exp < time) {
                    localStorage.removeItem('token');
                    setLogin(false);
                } else {
                    setLogin(true);
                }

                const authConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const response = await axios.post('http://127.0.0.1:3000/api/update-user', authConfig);
                console.log(response.data.user);
                const userData = response.data.user;
                setUser(userData);
                setFormData({
                    id: userData._id || '',
                    fullname: userData.fullname || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                })
            } else {
                setLogin(false);
                showAlert('Gagal', 'Silahkan login kembali', 'error');
                navigate('/masuk');
            }
        } catch (error) {
            console.error('Invalid Token', error);
        }
    }

    const getPayment = async() => {
        try{
            const response = await axios.get('http://127.0.0.1:3000/api/payment');
            console.log(response.data.payment);
            setPayments(response.data.payment)
        } catch(error){
            console.error('Cek kode ini, ada kesalahan', error)
        }
    }

    const getSelectedPayment = () => {
        return payments.filter(payment => 
            payment.reservationId.userId._id === id && 
            payment.status.toLowerCase() === activeKey.toLowerCase()
        );
    }

    useEffect(()=>{
        getPayment();
        getUser();
    }, [])
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    const handleClose = () => {
        setShow(false);
    };

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
        const userPayment = getSelectedPayment();
        console.log(userPayment);
        if (!userPayment || userPayment.length === 0) return null;
        return userPayment.map((payment) => {
            const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const tanggalKeberangkatan = new Date(payment.reservationId.flightId.departureTime).toLocaleDateString('id-ID', tanggal);
            const waktuKeberangkatan = new Date(payment.reservationId.flightId.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            return (
                <Col key={payment._id}>
                    <Card className="riwayat my-3">
                    <Row>
                        <Col lg={4}>
                            <p>Dari</p>
                            <h5>{payment.reservationId.flightId.departureAirportId.city}</h5>
                        </Col>
                        <Col lg={4}>
                            <p>Ke</p>
                            <h5>{payment.reservationId.flightId.arrivalAirportId.city}</h5>
                        </Col>
                        <Col lg={4}>
                            <p>Maskapai</p>
                            <img src={`http://127.0.0.1:3000/images/${payment.reservationId.flightId.icon}`} alt="" />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6}>
                            <p>Keberangkatan</p>
                            <h5>{tanggalKeberangkatan}</h5>
                        </Col>
                        <Col lg={6}>
                            <p>Total Pembayaran</p>
                            <h5>IDR {payment.reservationId.totalPayment.toLocaleString('id-ID')}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <p>Waktu Keberangkatan</p>
                            <h5>{waktuKeberangkatan}</h5>
                        </Col>
                        <Col lg={6}>
                            <p>Status</p>
                            {activeKey === 'belum bayar' &&
                                <div className="set d-flex">
                                    <h6 className="pending">Belum Bayar</h6>
                                    <Link to="/tentang-kami" className="ms-3 mb-3">Lanjut Bayar Hub.Admin →</Link>
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
                </Col>
            );
        });
    }

    return (
        <div className="profil">
            <NavbarComponent />
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
                                <Nav.Link eventKey="belum bayar">Belum Bayar</Nav.Link>
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
                    <Button variant="danger" onClick={handleLogout}>
                        Ya, Keluar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfilPage;
