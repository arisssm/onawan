import {Container, Row, Col} from "react-bootstrap";

const MaskapaiComponent = () => {
    return(
        <div className="maskapai">
            <Container>
                <Row>
                    <Col>
                        <h5>Maskapai penerbangan terpercaya</h5>
                        <p>Terbang dengan nyaman dengan kualitas dan fasilitas dari maskapai terpercaya.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src="../src/assets/img-maskapai.png" alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MaskapaiComponent;