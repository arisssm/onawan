import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const masukPage = () => {
    const MySwal = withReactContent(Swal);
    const showAlert = ( title, text, icon) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }
    const validateForm = () => {
        if(!email){
            showAlert('Gagal', 'Email harus di isi!', 'error');
            return false;
        }
        if(!password){
            showAlert('Gagal', 'Password harus di isi!', 'error');
            return false;
        }
        if(password.length < 5 ){
            showAlert('Gagal', 'Password harus minial 5 karakter!', 'error');
            return false;
        }

        return true;
    }

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async(event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const user = {
                email : email,
                password : password
            }

            const response = await axios.post('http://127.0.0.1:3000/api/login', user);
            console.log(user);
            console.log(response);
            const authDecode = jwtDecode(response.data.token);
            localStorage.setItem('token', response.data.token);
            console.log(authDecode);
            const fullname = response.data.fullname;
            showAlert('Berhasil', `Selamat datang ${fullname}`, 'success');
            navigate('/beranda');

        }catch(error){
            console.error(error);
            showAlert('Gagal', 'Ada kesalahan dalam proses login!', 'error');
            navigate('/masuk');
        }
    }

    // const [access, setAccess] = useState(true);

    // const getUser = () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if(token){
    //             setAccess(false);
    //             showAlert('Gagal', 'Maaf tidak boleh akses halaman ini!', 'error');
    //             navigate('/beranda');
    //         } else {
    //             setAccess(true);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // }, []);

    // if(!access){
    //     return null;
    // }
    return (
        <>
            <div className="masuk">
                <NavbarComponent />

                <Container>
                    <Row>
                        <Col>
                            <div className="title">
                                <h2>Masuk untuk pesan <br /> tiket travelling!</h2>
                                <p>Masukkan akun yang telah terdaftar.</p>
                            </div>

                            <Form onSubmit={login}>
                                <Row>
                                    <Col>
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control
                                            id="email"
                                            type="email" 
                                            placeholder="Masukkan Email" 
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)} 
                                            required
                                        />
                                        <Form.Label htmlFor="password">Buat Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            type="password" 
                                            placeholder="Masukkan Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}  
                                            required 
                                        />
                                        <Link to="#" className="d-flex justify-content-end mt-3">Lupa Password</Link>
                                    </Col>
                                </Row>
                                
                                <Button className="btn-utama mt-5 w-100" type="submit">Masuk</Button>
                            </Form>

                            <p className="punya-akun">Belum punya akun? <Link to="/daftar">Daftar</Link></p>
                        </Col>
                    </Row>
                </Container>

            </div>
            <FooterComponent/>
        </>
    );
}

export default masukPage;