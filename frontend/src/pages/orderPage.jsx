import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import PromoComponent from "../components/PromoComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const orderPage = () => {
    const navigate = useNavigate();
    const [orderBanner, setOrderBanner] =useState([]);
    const [access, setAccess] = useState(true);
    const MySwal = withReactContent(Swal);
    const showAlert = ( title, text, icon) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }

    const [searchData, setFormData] = useState({
        departureCity: '',
        arrivalCity: '',
        totalPassangers: '',
        flightClass: '',
        departureDate: ''
    });

    const handleInputChange = (event) => {
        const {id, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id] : value
            })
        )
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const params = {
                departureCity: searchData.departureCity,
                arrivalCity: searchData.arrivalCity,
                totalPassangers: searchData.totalPassangers,
                flightClass: searchData.flightClass,
                departureDate: searchData.departureDate,
            }
            console.log(params);
            const response = await axios.get('http://127.0.0.1:3000/api/search-flight', {params});
            console.log(response);
            showAlert('Berhasil', 'Berikut data penerbangan yang anda cari', 'success');
            // navigate('/cari-jadwal', 
                // {state: {flights: response.data.flights, searchDetails: response.data.searchDetails}})
        }catch(error){
            console.error('Cek lagi disini error', error);
            showAlert('Gagal', 'Data penerbangan tidak ditemukan', 'error');
            navigate('/pesan');
        }
    }
    const getOrderBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/order-banner');
            setOrderBanner(await response.data.orderBanner);
            // console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }

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

    useEffect(()=>{
        getUser();
        getOrderBanner();
    }, [])

    return (
        <>
            <div className="order">
                <NavbarComponent />
                {orderBanner.map((data, index)=> (
                    <div 
                        className="hero-order"
                        key={index}
                        style={{
                            background: `url(http://127.0.0.1:3000/images/${data.image})`,
                            backgroundSize:' cover',
                            height: '580px'
                        }}
                    >
                        <Container>
                            <Row>
                                <Col lg={4}>
                                    <div className="deskripsi-hero">
                                        <h1>{data.headline}</h1>
                                        <p>{data.subHeadline}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ))}

                <div className="pesan-tiket">
                    <Container>
                        <Row>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col lg={10}>
                                            <Row>
                                                <Col>
                                                    <Form.Label htmlFor="departureCity">Dari</Form.Label>
                                                    <Form.Control 
                                                        id="departureCity" 
                                                        type="text" 
                                                        placeholder="Masukkan Kota Asal" 
                                                        value={searchData.departureCity}
                                                        onChange={handleInputChange}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label htmlFor="arrivalCity">Ke</Form.Label>
                                                    <Form.Control 
                                                        id="arrivalCity" 
                                                        type="text" 
                                                        placeholder="Masukkan Kota Tujuan" 
                                                        value={searchData.arrivalCity}
                                                        onChange={handleInputChange}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label htmlFor="totalPassangers">Jumlah Penumpang</Form.Label>
                                                    <Form.Control 
                                                        id="totalPassangers" 
                                                        type="number" 
                                                        placeholder="Jumlah Penumpang" 
                                                        min="1" 
                                                        value={searchData.totalPassangers}
                                                        onChange={handleInputChange}
                                                        />
                                                </Col>
                                                <Col>
                                                    <Form.Label htmlFor="flightClass">Pilih Kelas</Form.Label>
                                                    <Form.Control 
                                                        id="flightClass" 
                                                        as="select"
                                                        value={searchData.flightClass}
                                                        onChange={handleInputChange}
                                                    
                                                    >
                                                        <option value="Ekonomi">Ekonomi</option>
                                                        <option value="Bisnis">Bisnis</option>
                                                        <option value="Premium">Premium</option>
                                                    </Form.Control>
                                                </Col>
                                                <Col>
                                                    <Form.Label htmlFor="departureDate">Tanggal Berangkat</Form.Label>
                                                    <Form.Control 
                                                        id="departureDate" 
                                                        type="date"
                                                        value={searchData.departureDate}
                                                        onChange={handleInputChange}
                                                    />
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