import { Container, Row, Col } from "react-bootstrap"
import { Link,useNavigate,useLocation } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from 'jwt-decode';

const searchPage = () => {
    const location = useLocation();
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

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const [id, SetId] = useState('');
    const {flights, searchDetails} = location.state || { flights: [], searchDetails: {} };
    console.log(flights);
    console.log(searchDetails);
    const [payments, setPayments] = useState([]);
    const [statusPayment, setStatusPayment] = useState(false);

    const getUser = () => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                setLogin(false);
                showAlert('Gagal', 'Maaf tidak boleh akses halaman ini!', 'error');
                navigate('/masuk');
            } else {
                setLogin(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPayment = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/payment');
            const payments = response.data.payment;
            setPayments(payments);
            const statusUnpaid = payments.some(payment => payment.reservationId.userId._id === id && payment.status === 'unpaid');
            setStatusPayment(statusUnpaid);
            if (statusUnpaid) {
                showAlert('Peringatan', 'Anda memiliki pembayaran yang belum diselesaikan.', 'warning');
            }
        } catch (error) {
            console.error('Cek lagi kode ini, ada kesalahan', error);
        }
    };

    useEffect(()=>{
        getUser();
        getPayment();
    }, [])

    const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const tanggalBerangkat = new Date(searchDetails.departureDate).toLocaleDateString('id-Id', tanggal);
    return (
        <>
            <div className="search">
                <NavbarComponent />
                <Container>
                    {/*Hasil pencarian */}
                    <div className="cari">
                        <Row>
                            <Col lg={3}>
                                <p>Dari</p>
                                <h5 id="dariValue">{searchDetails.departureCity}</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Ke</p>
                                <h5 id="keValue">{searchDetails.arrivalCity}</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Jumlah Penumpang | Kelas</p>
                                <h5 id="jumlahPenumpangValue">{searchDetails.totalPassangers} Penumpang, {searchDetails.flightClass}</h5>
                            </Col>
                            <Col lg={3}>
                                <p>Tanggal Berangkat</p>
                                <h5 id="tanggalBerangkatValue">{tanggalBerangkat}</h5>
                            </Col>
                        </Row>
                    </div>

                    <div className="hasil">
                        <h5 className="mb-3">Pilihan Maskapai Tersedia</h5>

                        <Row className="mb-5">
                            {flights.map((flight)=>(
                                <Col lg={4} key={flight._id}>
                                    <div className="card-pilihan">
                                        <Link to="/info"><img src={`http://127.0.0.1:3000/images/${flight.icon}`} alt="icon-flight" /></Link>
                                        <Row className="pilihan-maskapai">
                                            <Link to="/info">{flight.airlineId.name}</Link>
                                            <Col lg={2}>
                                                <h5>{new Date(flight.departureTime).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})}</h5>
                                                <p><small>{flight.departureAirportId.code}</small></p>
                                            </Col>
                                            <Col lg={2} className="text-center">
                                                <p><small>{flight.duration}</small></p>

                                                <hr />
                                                <p><small>{flight.flightType}</small></p>
                                            </Col>
                                            <Col lg={2}>
                                                <h5>{new Date(flight.arrivalTime).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})}</h5>
                                                <p><small>{flight.arrivalAirportId.code}</small></p>
                                            </Col>
                                            <Col lg={6} className="biaya">
                                                <h6>Biaya</h6>
                                                <h4>IDR {flight.price}</h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>


                </Container>
                <FooterComponent />
            </div>
        </>
    );
}

export default searchPage;