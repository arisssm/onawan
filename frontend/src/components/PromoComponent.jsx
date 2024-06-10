import {Container, Row, Col, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PromoComponent = () => {
    const [dataPromo, setPromo] = useState([]);
    // compare
    const [dataPromotion, setPromotion] = useState([]);
    const [airlineBanner, setAirlineBanner] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
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
    const getPromo = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/promo');
            setPromo( await response.data.promo);
            console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }
    //** ====================================================== */
    const getPromotion = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/promotion');
            setPromotion( await response.data.promotion);
            console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }
    const getUser = () => {
        try {
        const token = localStorage.getItem('token');
        if(token){
            const userDecode = jwtDecode(token);
            setUser(userDecode);
            setLogin(true)
            } else {
                setLogin(false);
            }        
        } catch (error) {
            console.error('Invalid Token', error);
            setLogin(true);
        }
    }

    const handlePesanSekarang = () => {
        if(!login){
            showAlert('Gagal', 'Silahkan login dahuliu!', 'error');
        }
    }

    useEffect(()=> {
        getPromo();
        getPromotion();
        getUser();
    }, []);
    return (
        <div className="promo">
            <Container>
                <Row>
                    <Col lg={4}>
                        <img src="../src/assets/ic-promo.png" alt="" className="ic-promo"/>
                        <h1>Promo terbaik <br /> untuk bepergian</h1>
                        { 
                                login ? 
                                (
                                    <Link to="/pesan">
                                        <Button variant="outline-dark">Pesan Sekarang</Button>
                                    </Link>
                                ) :
                                
                                (
                                    <Button variant="outline-dark" onClick={handlePesanSekarang}>Pesan Sekarang</Button>
                                )
                            }
                    </Col>
                    { dataPromotion.map((data, index)=>(
                        <Col lg={4} key={index}>
                            <img src={`http://127.0.0.1:3000/images/${data.image}`} alt="" />
                        </Col>
                    ))}
                </Row>
                {/* ========================================== */}
                { dataPromo.map((data, index)=>(
                    <Row key={index}>
                        <Col lg={4}>
                            <img src="../src/assets/ic-promo.png" alt="" className="ic-promo"/>
                            <h1>{data.headline}</h1>
                            { 
                                login ? 
                                (
                                    <Link to="/pesan">
                                        <Button variant="outline-dark">Pesan Sekarang</Button>
                                    </Link>
                                ) :
                                
                                (
                                    <Link to="/masuk">
                                        <Button variant="outline-dark">Pesan Sekarang</Button>
                                    </Link>
                                )
                            }
                        </Col>
                        <Col lg={4}>
                            <img src={`http://127.0.0.1:3000/images/${data.image[0]}`} alt="" />
                        </Col>
                        <Col lg={4}>
                            <img src={`http://127.0.0.1:3000/images/${data.image[1]}`} alt="" />
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default PromoComponent;