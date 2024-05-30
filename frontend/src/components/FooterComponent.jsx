import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"

const FooterComponent = () => {
    return (
        <>
            <footer>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <h5>link cepat</h5>
                            <Link to="/">Beranda</Link>
                            <Link to="/about">Tentang Kami</Link>
                            <Link to="/destinasi">Destinasi</Link>
                        </Col>
                        <Col lg={6}>
                            <h6>&copy; Copyright Reserved, Onawan 2024</h6>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}

export default FooterComponent;