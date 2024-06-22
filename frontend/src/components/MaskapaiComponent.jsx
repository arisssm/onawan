import {Container, Row, Col} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';

const MaskapaiComponent = () => {
    const [airlineBanner, setAirlineBanner] = useState([]);
    const getAirlineBanner = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/airline-banner');
            setAirlineBanner( await response.data.airlineBanner);
            // console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }
    //**================================================ */
    const [dataAirline, setDataAirline] = useState([]);
    const getAirline = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/airline');
            setDataAirline( await response.data.airline);
            // console.log(response.data);
        } catch (error) {
            console.error('Cek lagi kode bagian ini!', error);
        }
    }

    //**================================================ */
    useEffect(()=>{
        getAirlineBanner();
        getAirline();
    }, []);
    return(
        <div className="maskapai">
            { airlineBanner.map((data, index)=>(
                <Container key={index}>
                    <Row>
                        <Col>
                            <h5>{data.headline}</h5>
                            <p>{data.subHeadline}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img src={`http://127.0.0.1:3000/images/${data.image}`} alt="airline-banner" />
                        </Col>
                    </Row>
                </Container>
                ))
            }
            {/* <Container>
                <Row>
                    <Col>
                        <h5>Maskapai penerbangan terpercaya</h5>
                        <p>Terbang dengan nyaman dengan kualitas dan fasilitas dari maskapai terpercaya.</p>
                    </Col>
                </Row>
                <Row>
                { dataAirline.map((data, index)=>(
                    <Col key={index}>
                        <img src={`http://127.0.0.1:3000/images/${data.image}`} alt="airlinebanner" />
                    </Col>
                ))}
                </Row>
            </Container> */}
        </div>
    );
}

export default MaskapaiComponent;