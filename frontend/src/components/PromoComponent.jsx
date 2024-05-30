import {Container, Row, Col, Button} from "react-bootstrap";

const PromoComponent = () => {
    return (
        <div className="promo">
            <Container>
                <Row>
                    <Col lg={4}>
                        <img src="../src/assets/ic-promo.png" alt="" className="ic-promo"/>
                        <h1>Promo terbaik <br /> untuk bepergian</h1>
                        <Button className="btn-biru" href="/order">Pesan Sekarang</Button>
                    </Col>
                    <Col lg={4}>
                        <img src="../src/assets/img-promo1.png" alt="" />
                    </Col>
                    <Col lg={4}>
                        <img src="../src/assets/img-promo2.png" alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PromoComponent;