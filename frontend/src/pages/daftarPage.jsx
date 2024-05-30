import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const daftarPage = () => {
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

                            <Form action="/masuk">
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Nama Lengkap" required></Form.Control>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Nomor Telepon" required></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Masukkan Email" required></Form.Control>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label>Buat Password</Form.Label>
                                        <Form.Control type="password" placeholder="Masukkan Password" required></Form.Control>
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