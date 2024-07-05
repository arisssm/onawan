import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from 'jwt-decode';

const infoPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { flights, searchDetails} = state;
    // console.log(flights);
    const [jumlahPenumpang, setJumlahPenumpang] = useState(1);
    const [ access, setAccess] = useState(true);
    const [ userInfo, setUserInfo] = useState({ fullname: '', phone: '', email: ''});
    const [ userTitle, setUserTitle] = useState('');
    const [passangersDetails, setPassangerDetails] = useState(Array(searchDetails.totalPassangers).fill({ title: '', fullname: '', passengerType: ''}));
    const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const tanggalBerangkat = new Date(flights.departureTime).toLocaleDateString('id-ID', tanggal);
    const totalPayment = flights.price * searchDetails.totalPassangers;
    const MySwal = withReactContent(Swal);
    const showAlert = ( title, text, icon) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }

    const tambahPenumpang = () => {
        if (jumlahPenumpang < searchDetails.totalPassangers) {
            setJumlahPenumpang(jumlahPenumpang + 1);
        }
    };

    const getUser = () => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                setAccess(false);
                showAlert('Gagal', 'Maaf tidak boleh akses halaman ini!', 'error');
                navigate('/masuk');
            } else {
                setAccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const infoUser = () => {
        const userDecode = jwtDecode(localStorage.getItem('token'))
        setUserInfo(userDecode);
    }

    const handlePassangersDetailsChange = (index, field, value ) => {
        const newPassangersDetails = [...passangersDetails];
        if(!newPassangersDetails[index]) {
            newPassangersDetails[index] =  {title: '', fullname: '', passengerType: ''}

        }
        newPassangersDetails[index][field] = value;
        setPassangerDetails(newPassangersDetails);
    }

    const postReservation = async (event) => {
        event.preventDefault();
        try {
            const body = {
                userTitle: userTitle,
                userId: userInfo.id,
                passengers: passangersDetails,
                flightId: flights._id,
                reservationDate: new Date(),
                totalPayment: totalPayment
            }
            console.log(body);

            const authConfig = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const response = await axios.post('http://127.0.0.1:3000/api/post-reservation', body, authConfig);
            console.log(response.data.reservation);
            // showAlert('Sukses', 'reservasi kamu telah dibuat, silahkan lanjut untuk pembayaran', 'error');
            // const reservationId = response.data.reservation._id;

            // if(response.statusText == 'OK'){
            //     navigate('/bayar/' + reservationId, { state: { reservation: response.data.reservation}})
            // } else {
            //     navigate('/info');
            //     showAlert('Error', 'data reservasi tidak benar', 'error');
            // }
        } catch (error) {
            console.error('Cek lagi kode disini', error);
        }
    }



    useEffect(()=>{
        getUser();
        infoUser();
    }, [])

    return (
        <>
            <div className="info">
                <NavbarComponent />
                <div className="detail-info">
                    <Container>
                        <div className="title">
                            <h5>Detail Pemesan</h5>
                            <p>Detail ini akan digunakan untuk pengiriman e-tiket.</p>
                        </div>
                        <Row>
                            <Col lg={8}>
                                <Card className='detail-pemesan'>
                                    <Form>
                                        <div className="mb-3 radios">
                                            {['Tuan', 'Nyonya', 'Nona'].map((type, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="radio"
                                                    id={`radio-${type}`}
                                                    name="userTitle"
                                                    label={type}
                                                    value={type}
                                                    inline
                                                    onChange={(e) => setUserTitle(e.target.value)}
                                                />
                                            ))}
                                        </div>

                                        <Form.Label htmlFor="fullname">Nama Lengkap</Form.Label>
                                        <Form.Control
                                            id= "fullname" 
                                            type="text" 
                                            value={userInfo.fullname}
                                            style={{backgroundColor: 'whitesmoke'}}
                                            readOnly
                                        ></Form.Control>

                                        <Form.Label htmlFor="phone">Nomor Telepon</Form.Label>
                                        <Form.Control 
                                            id= "phone"
                                            type="text" 
                                            value={userInfo.phone}
                                            style={{backgroundColor: 'whitesmoke'}}
                                            readOnly
                                        ></Form.Control>

                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control 
                                            id="email"
                                            type="email"
                                            value={userInfo.email} 
                                            style={{backgroundColor: 'whitesmoke'}}
                                            readOnly
                                        >
                                        </Form.Control>
                                    </Form>
                                </Card>

                                <div className="detail-penumpang mt-4">
                                    <h5 className="mb-3">Detail Penumpang</h5>
                                    <Card>
                                        <Form>
                                            {[...Array(jumlahPenumpang)].map((_, index) => (
                                                <Card key={index} className="mb-3">
                                                    <Card.Title>Penumpang {index + 1}</Card.Title>
                                                    <hr />
                                                    <h6>Informasi Penumpang</h6>
                                                        <div className="mb-3 radios">
                                                            {['Tuan', 'Nyonya', 'Nona'].map((type) => (
                                                                <Form.Check
                                                                    key={type}
                                                                    type="radio"
                                                                    id={`radio${index}-${type}`}
                                                                    name= {`title${index}`}
                                                                    label={type}
                                                                    value={type}
                                                                    inline
                                                                    onChange={(e) => handlePassangersDetailsChange(index, 'title', e.target.value)}
                                                                />
                                                            ))}
                                                        </div>

                                                    <Form.Label htmlFor="ticket">Jenis Tiket</Form.Label>
                                                    <Form.Control
                                                        id="ticket" 
                                                        as="select"
                                                        onChange= {(e) => handlePassangersDetailsChange(index, 'passengerType', e.target.value)}
                                                    >
                                                        <option value="pilih">-- Jenis Tiket --</option>
                                                        <option value="Dewasa">Dewasa</option>
                                                        <option value="Anak-anak">Anak-anak</option>
                                                    </Form.Control>

                                                    <Form.Label htmlFor="fullnamePassangers">Nama Lengkap</Form.Label>
                                                    <Form.Control
                                                        id="fullnamePassangers" 
                                                        type="text" 
                                                        placeholder="Masukkan Nama Lengkap" 
                                                        onChange= {(e) => handlePassangersDetailsChange(index, 'fullname', e.target.value)} 
                                                    />
                                                </Card>
                                            ))}
                                            <Button 
                                                variant="btn btn-success mt-3" 
                                                onClick={tambahPenumpang}
                                                disabled={jumlahPenumpang >= searchDetails.totalPassangers}
                                            >
                                                Tambah Penumpang
                                            </Button>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <Card className="rincian">
                                    <Row>
                                        <Col lg={6}>
                                            <p>Dari</p>
                                            <h5>{flights.departureAirportId.city}</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <p>Ke</p>
                                            <h5>{flights.arrivalAirportId.city}</h5>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <p>Pilihan Maskapai</p>
                                    <img src={`http://127.0.0.1:3000/images/${flights.icon}`} alt="" />
                                    <p>Keberangkatan</p>
                                    <h5>{tanggalBerangkat}</h5>
                                    <p>Waktu Keberangkatan</p>
                                    <h5>
                                        {new Date(flights.departureTime).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})}
                                    </h5>
                                    <hr />
                                    <Row className="mt-3">
                                        <Col lg={6}>
                                            <h5 className="text-secondary">Total Pembayaran</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <h5>IDR {totalPayment}</h5>
                                        </Col>
                                    </Row>
                                </Card>
                                <Button 
                                    onClick={postReservation}
                                    type="button"
                                    variant="btn btn-utama mt-3 w-100"
                                >
                                    Selanjutnya
                                </Button>
                                <p className='text-secondary mt-3'>*Pastikan data sudah terisi dengan benar sebelum melanjutkan.</p>
                            </Col>
                        </Row>
                    </Container>
                    <FooterComponent />
                </div>
            </div>
        </>
    );
}

export default infoPage;