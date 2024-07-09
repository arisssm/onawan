import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const konfirmasiPage = () => {
    const { state } = useLocation();
    const { payment } = state || {};
    console.log(payment);
    const { id } = useParams();
    const navigate = useNavigate();

    const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const tanggalBerangkat = new Date(payment.reservationId.flightId.departureTime).toLocaleDateString('id-ID', tanggal);
    
    const handleSubmit = () =>  {
        if(!payment){
            showAlert('Error', 'data pembayaran tidak benar, ada kesalahan!', 'error')
        } else {
            navigate('/cetak/' + id, { state: {payment}})
        }
    }
    return (
        <>
            <div className="konfirmasi">
                <NavbarComponent/>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h6 className="mt-5 mb-3">Silahkan melakukan pembayaran sebelum tanggal 
                                { new Date(payment.deadline).toLocaleDateString('id-ID', tanggal)}, 
                                pukul {new Date(payment.deadline).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})} WIB</h6>
                            <Card>
                                <Row>
                                    <Col lg={6}>
                                        <p>Dari</p>
                                        <h5>{payment.reservationId.flightId.departureAirportId.city}</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Ke</p>
                                        <h5>{payment.reservationId.flightId.arrivalAirportId.city}</h5>
                                    </Col>
                                </Row>

                                <p>Pilihan Maskapai</p>
                                <img src={`http://127.0.0.1:3000/images/${ payment.reservationId.flightId.icon}`} width="80vh" alt="" />

                                <Row>
                                    <Col lg={6}>
                                        <p>Keberangkatan</p>
                                        <h5>{tanggalBerangkat}</h5>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Waktu Keberangkatan</p>
                                        <h5>{new Date(payment.reservationId.flightId.departureTime).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})}</h5>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="mt-3">
                                    <Col lg={6}>
                                        <h6>Transfer : {payment.paymentMethodId.name} <b>9021927178272</b></h6>
                                    </Col>
                                    <Col lg={6}>
                                        <h6 className="text-secondary">Total Pembayaran : <b className="text-dark">IDR {payment.reservationId.totalPayment}</b></h6>
                                    </Col>
                                </Row>
                            </Card>

                            <div className="opsi mt-3">
                                <Button onClick={handleSubmit} variant="btn btn-utama">Sudah Bayar</Button>
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