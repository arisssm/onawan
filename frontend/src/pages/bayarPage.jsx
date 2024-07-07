import { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
import FooterComponent from "../components/FooterComponent";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from 'jwt-decode';

const bayarPage = () => {
    const {state} = useLocation();
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

    const { reservation } = state || {};
    console.log(reservation);
    const { id } = useParams();

    const [ login, setLogin] = useState(true);
    const [ paymentMethods, setPaymentMethods] = useState([]);
    const [activeKey, setActiveKey] = useState('');

    const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const tanggalBerangkat = new Date(reservation.flightId.departureTime).toLocaleDateString('id-ID', tanggal);
    
    const getUser = () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userDecode = jwtDecode(token);
                console.log(userDecode);
                const time = Date.now() / 1000;
                if (userDecode.exp < time) {
                    localStorage.removeItem('token');
                    setLogin(false);
                } else {
                    setLogin(true);
                }
            } else {
                setLogin(false);
                showAlert('Gagal', 'Silahkan login kembali', 'error');
                navigate('/masuk');
            }
        } catch (error) {
            console.error('Invalid Token', error);
        }
    };

    const checkState = () => {
        if (reservation == undefined ) {
            showAlert('Gagal', 'Silahkan kembali cari penerbangan!', 'error');
            navigate('/pesan');
        }
    };

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };

    const getSelectedPaymentMethod = () => {
        return paymentMethods.find(method => method.name.toLowerCase() === activeKey.toLowerCase());
    }

    const getPaymentMethod = async() => {
        try{
            const response = await axios.get('http://127.0.0.1:3000/api/payment-method');
            // console.logo(response.data);
            setPaymentMethods(response.data.paymentmethod)
        } catch(error){
            console.error('Cek kode ini, ada kesalahan', error)
        }
    }

    const postPayment = async (event) => {
        event.preventDefault();
        try{
            const selectedPayment = getSelectedPaymentMethod();
            if(!selectedPayment){
                showAlert('Gagal', 'Silahkan pilih metode pembayaran!', 'error');
                return;
            }
    
            const deadline = new Date();
            deadline.setHours(deadline.getHours() + 24);
    
            const body = {
                reservationId: reservation._id,
                paymentMethodId: selectedPayment._id,
                deadline: deadline.toISOString(),
                status: 'belum bayar'
            };
    
            const authConfig = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
    
            const response = await axios.post('http://127.0.0.1:3000/api/post-payment', body, authConfig);
            console.log(response.data.payment);
            showAlert('Sukses', 'Pembayaran kamu telah dibuat, silahkan lanjut untuk konfirmasi', 'success');
            const paymentId = response.data.payment._id;
            if(response.statusText == 'OK'){
                navigate('/konfirmasi/' + paymentId, { state: { payment: response.data.payment}})
            } else {
                navigate('/bayar');
                showAlert('Error', 'data pembayaran tidak benar', 'error');
            }
        } catch(error){
            console.error('Cek lagi kode disini', error);
        }
    }   

    useEffect(()=>{
        getPaymentMethod();
        getUser();
        if (!login) {
            checkState();
        }
    }, [login])

    const renderContent = () => {
        const pilihMetode = getSelectedPaymentMethod();
        console.log(pilihMetode);
        if (!pilihMetode) return null;
            return (
                <Card className="metode">
                    <img src={`http://127.0.0.1:3000/images/${pilihMetode.logo}`} alt="Method Payment" />
                    <h6>{pilihMetode.name}</h6>
                    <h5>{pilihMetode.accountNumber}</h5>
                    <p>a.n {pilihMetode.accountHolder}</p>
                </Card>
            );
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
                                    <Nav.Link eventKey="bank mandiri">Transfer Bank</Nav.Link>
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
                            {activeKey === "bank mandiri" && renderContent()}
                            {activeKey === "ovo" && renderContent()}
                            {activeKey === "indomaret" && renderContent()}
                        </Col>
                        <Col lg={4}>
                            <Card className="rincian">
                                <Row>
                                    <Col lg={6}>
                                        <p>Dari</p>
                                        <h5>{reservation.flightId.departureAirportId.city}</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Ke</p>
                                        <h5>{reservation.flightId.arrivalAirportId.city}</h5>
                                    </Col>
                                </Row>
                                <hr />
                                <p>Pilihan Maskapai</p>
                                <img src={`http://127.0.0.1:3000/images/${reservation.flightId.icon}`} width="80vh" alt="" />
                                <p>Keberangkatan</p>
                                <h5>{tanggalBerangkat}</h5>
                                <p>Waktu Keberangkatan</p>
                                <h5>{new Date(reservation.flightId.departureTime).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})}</h5>
                                <hr />
                                <Row className="mt-3">
                                    <Col lg={6}>
                                        <h5 className="text-secondary">Total Pembayaran</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <h5>IDR {reservation.totalPayment}</h5>
                                    </Col>
                                </Row>
                            </Card>
                            <Button onClick={postPayment} type="button" variant="btn btn-utama mt-3 w-100">Selanjutnya</Button>
                        </Col>
                    </Row>
                </Container>
                <FooterComponent/>
            </div>
        </>
    );
}

export default bayarPage;