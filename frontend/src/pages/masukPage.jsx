import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const masukPage = () => {
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

                            <Form action="/home">
                                <Row>
                                    <Col>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Masukkan Email" required></Form.Control>
                                        <Form.Label>Buat Password</Form.Label>
                                        <Form.Control type="password" placeholder="Masukkan Password" required></Form.Control>
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