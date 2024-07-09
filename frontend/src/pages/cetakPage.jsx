import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link,  useLocation, useParams } from "react-router-dom";
import html2pdf from 'html2pdf.js'; // Import html2pdf

import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import logo from "../assets/img-logo.png";

const CetakPage = () => {
    const { state } = useLocation();
    const { payment } = state || {};
    console.log(payment);
    const { id } = useParams();

    const user = payment.reservationId.userId;
    const flight = payment.reservationId.flightId;
    const passanger = payment.reservationId.passengers;
    const tanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const tanggalBerangkat = new Date(payment.reservationId.flightId.departureTime).toLocaleDateString('id-ID', tanggal);
    const tanggalKedatangan = new Date(payment.reservationId.flightId.departureTime).toLocaleDateString('id-ID', tanggal);
    const tanggalPemesanan = new Date(payment.reservationId.reservationDate).toLocaleDateString('id-ID', tanggal);

    console.log(passanger);
    // Fungsi untuk menangani klik tombol unduh
    const handleDownload = () => {
        // Pilih elemen yang akan diubah menjadi PDF
        const element = document.getElementById('cetak-content');

        // Konfigurasi PDF
        const options = {
            margin: 10,
            filename: 'e-tiket.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // ngeconvert HTML ke PDF
        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="cetak">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col lg={8}>
                        <h6 className="mt-5 mb-3">Berikut E-Tiket pesawat yang bisa digunakan</h6>

                        <div id="cetak-content">
                            <Card>
                                <Row className="align-items-center">
                                    <Col lg={6}>
                                        <img src={logo} alt="" />
                                    </Col>
                                    <Col lg={6} className="text-end">
                                        <h5>E-Tiket</h5>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="mb-3">
                                    <Col lg={3}>
                                        <img src={`http://127.0.0.1:3000/images/${ payment.reservationId.flightId.icon}`} width="80vh" alt="" />
                                    </Col>
                                    <Col lg={3}>
                                        <p>Nama Pemesan:</p>
                                        <h6>{user.fullname}</h6>
                                    </Col>
                                    <Col lg={3}>
                                        <p>Tanggal Pemesanan:</p>
                                        <h6>{tanggalPemesanan}</h6>
                                    </Col>
                                    <Col lg={3}>
                                        <p>Kode Booking:</p>
                                        <h6 className="text-info">{payment.reservationId._id}</h6>
                                    </Col>
                                </Row>

                                <div className="detail-penerbangan mb-4">
                                    <h6><b>Detail Penerbangan</b></h6>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Penerbangan</th>
                                                <th>Keberangkatan</th>
                                                <th>Kedatangan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{flight.flightNumber} {flight.flightClass}</td>
                                                <td>{tanggalBerangkat} | 07.00 <br /> Palembang - Sultan Mahmud Badaruddin II Airport </td>
                                                <td>{tanggalKedatangan} | 09.00 <br /> Jakarta - Soekarno Hatta Airport </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="detail-penumpang">
                                    <h6><b>Detail Penumpang</b></h6>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Nomor</th>
                                                <th>Titel</th>
                                                <th>Nama Penumpang</th>
                                                <th>Jenis Tiket</th>
                                                <th>Nomor Tiket</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {passanger.map((user, index) => (
                                                <tr key={index}>
                                                    <td>1</td>
                                                    <td>{user.title}</td>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.passengerType}</td>
                                                    <td>{user._id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        <div className="opsi mb-3 mt-3">
                            <Button variant="btn btn-utama" onClick={handleDownload}>Download E-Tiket</Button>
                            <Link to="/home" className="ms-3">Ke Beranda</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <FooterComponent />
        </div>
    );
}

export default CetakPage;
