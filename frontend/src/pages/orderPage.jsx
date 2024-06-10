import { Container, Row, Col, Form, Button } from "react-bootstrap";

import NavbarComponent from "../components/NavbarComponent";
import PromoComponent from "../components/PromoComponent";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";
import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const orderPage = () => {
    const [orderBanner, setOrderBanner] =useState([]);
    // const [user, setUser] = useState('');
    // const [login, setLogin] = useState(false);

    const getOrderBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/order-banner');
            setOrderBanner(await response.data.orderBanner);
            // console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }

    // const getUser = () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if(token){
    //             const userDecode = jwtDecode(token);
    //             setUser(userDecode);
    //             setLogin(true)
    //             } else {
    //                 setLogin(false);
    //             }        
    //         } catch (error) {
    //             console.error('Invalid Token', error);
    //             setLogin(true);
    //     }
    // }

    useEffect(()=>{
        getOrderBanner();
        // getUser();
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