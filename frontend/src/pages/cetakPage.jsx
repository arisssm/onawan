import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js'; // Import html2pdf

import FooterComponent from "../components/FooterComponent";
import NavComponent from "../components/NavComponent";
import logo from "../assets/img-logo.png";
import maskapai from "../assets/ic-lionair.png";

const CetakPage = () => {
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
            <NavComponent />
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
                                        <img src={maskapai} alt="" />
                                    </Col>
                                    <Col lg={3}>
                                        <p>Nama Pemesan:</p>
                                        <h6>Jhon Doe</h6>
                                    </Col>
                                    <Col lg={3}>
                                        <p>Tanggal Pemesanan:</p>
                                        <h6>Minggu, 14 Januari 2024</h6>
                                    </Col>
                                    <Col lg={3}>
                                        <p>Kode Booking:</p>
                                        <h6 className="text-info">JKPL14</h6>
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
                                                <td>B 737 Ekonomi C</td>
                                                <td>Senin, 15 Januari 2024 | 07.00 <br /> Palembang - Sultan Mahmud Badaruddin II Airport </td>
                                                <td>Senin, 15 Januari 2024 | 09.00 <br /> Jakarta - Soekarno Hatta Airport </td>
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
                                            <tr>
                                                <td>1</td>
                                                <td>Tuan</td>
                                                <td>Jhon Doe</td>
                                                <td>Dewasa</td>
                                                <td>1234567890</td>
                                            </tr>
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
