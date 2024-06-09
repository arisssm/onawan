import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const daftarPage = () => {
    const MySwal = withReactContent(Swal);
    const showAlert = ( title, text, icon) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const validateForm = () => {
        if(!fullname){
            showAlert('Gagal', 'Nama Lengkap harus di isi!', 'error');
            return false;
        }
        if(!email){
            showAlert('Gagal', 'Email harus di isi!', 'error');
            return false;
        }
        if(!phone){
            showAlert('Gagal', 'Nomor telepon harus di isi!', 'error');
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

    const register = async(event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const userRegister = {
                fullname : fullname,
                email : email,
                phone : phone,
                password : password
            }

            await axios.post('http://127.0.0.1:3000/api/register', userRegister);
            console.log(userRegister);
            showAlert('Berhasil', 'Selamat, akun kamu berhasil di buat!', 'success');
            navigate('/masuk');

        }catch(error){
            console.error(error);
            showAlert('Gagal', 'Ada kesalahan dalam proses registrasi!', 'error');
            navigate('/daftar');
        }
    }

    const [access, setAccess] = useState(true);

    const getUser = () => {
        try {
            const token = localStorage.getItem('token');
            if(token){
                setAccess(false);
                showAlert('Gagal', 'Maaf tidak boleh akses halaman ini!', 'error');
                navigate('/beranda');
            } else {
                setAccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    if(!access){
        return null;
    }

    return (
        <>
            <div className="daftar">
                <NavbarComponent />

                <Container>
                    <Row>
                        <Col>
                            <div className="title">
                                <h2>Buat akun untuk mulai <br /> pengalaman travellingmu!</h2>
                                <p>Buat akun untuk mulai memesan tiket</p>
                            </div>

                            <Form onSubmit={register}>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="fullname">Nama Lengkap</Form.Label>
                                        <Form.Control
                                            id="fullname"
                                            type="text" 
                                            placeholder="Masukkan Nama Lengkap" 
                                            value={fullname}
                                            onChange={(event) => setFullname(event.target.value)} 
                                            required
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="phone">Nomor Telepon</Form.Label>
                                        <Form.Control 
                                            id="phone"
                                            type="text" 
                                            placeholder="Masukkan Nomor Telepon"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}  
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control
                                            id="email"
                                            type="email" 
                                            placeholder="Masukkan Email" 
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)} 
                                            required
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="password">Buat Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            type="password" 
                                            placeholder="Masukkan Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}  
                                            required 
                                        />
                                    </Col>
                                </Row>
                                {['checkbox'].map((type) => (
                                    <div key={`default-${type}`} className="mb-5 mt-3">
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Saya sudah mengisi data dengan benar`}
                                        />
                                    </div>
                                ))}
                                <Button className="btn-utama w-100" type="submit">Buat Akun</Button>
                            </Form>

                            <p className="punya-akun">Sudah punya akun? <Link to="/masuk">Masuk</Link></p>
                        </Col>
                    </Row>
                </Container>

            </div>
            <FooterComponent/>
        </>
    );
}

export default daftarPage;