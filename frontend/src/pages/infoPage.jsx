import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const infoPage = () => {
    const [jumlahPenumpang, setJumlahPenumpang] = useState(1); // State untuk melacak jumlah penumpang

    // Fungsi untuk menambah jumlah penumpang
    const tambahPenumpang = () => {
        setJumlahPenumpang(jumlahPenumpang + 1);
    };

    return (
        <>
            <div className="info">
                <NavbarComponent />
                <div className="detail-info">
                    <Container>
                        <div className="title">
                            <h5>Detail Pemesan</h5>
                            <p>Detail ini akan digunakan untuk pengiriman e-tiket.</p>
                        </div>
                        <Row>
                            <Col lg={8}>
                                <Card className='detail-pemesan'>
                                    <Form>
                                        {['radio'].map((type) => (
                                            <div className="mb-3 radios">
                                                <Form.Check
                                                    type="radio"
                                                    id="radio1"
                                                    name="pilihan"
                                                    label="Tuan"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="radio1"
                                                    name="pilihan"
                                                    label="Nyonya"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="radio1"
                                                    name="pilihan"
                                                    label="Nona"
                                                />
                                            </div>
                                        ))}

                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Nama Lengkap" name="nama" required></Form.Control>

                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Nomor Telepon" name="telp" required></Form.Control>

                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Masukkan Email" name="email" required></Form.Control>
                                    </Form>
                                </Card>

                                <div className="detail-penumpang mt-4">
                                    <h5 className="mb-3">Detail Penumpang</h5>
                                    <Card>
                                        <Form action="/bayar">
                                            {[...Array(jumlahPenumpang)].map((_, index) => (
                                                <Card key={index} className="mb-3">
                                                    <Card.Title>Penumpang {index + 1}</Card.Title>
                                                    <hr />
                                                    <h6>Informasi Penumpang</h6>
                                                    {['radio'].map((type) => (
                                                        <div className="mb-3 radios" key={type}>
                                                            <Form.Check
                                                                type="radio"
                                                                id={`radio${index}-${type}`}
                                                                name={`pilihan${index}`}
                                                                label="Tuan"
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                id={`radio${index}-${type}`}
                                                                name={`pilihan${index}`}
                                                                label="Nyonya"
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                id={`radio${index}-${type}`}
                                                                name={`pilihan${index}`}
                                                                label="Nona"
                                                            />
                                                        </div>
                                                    ))}

                                                    <Form.Label>Jenis Tiket</Form.Label>
                                                    <Form.Control id={`jenisTiket${index}`} as="select">
                                                        <option value="pilih">-- Jenis Tiket --</option>
                                                        <option value="dewasa">Dewasa</option>
                                                        <option value="remaja">Remaja</option>
                                                        <option value="anak">Anak-anak</option>
                                                    </Form.Control>

                                                    <Form.Label>Nama Lengkap</Form.Label>
                                                    <Form.Control type="text" placeholder="Masukkan Nama Lengkap" name={`nama${index}`} />
                                                </Card>
                                            ))}
                                            <Button variant="btn btn-success mt-3" onClick={tambahPenumpang}>Tambah Penumpang</Button>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <Card className="rincian">
                                    <Row>
                                        <Col lg={6}>
                                            <p>Dari</p>
                                            <h5>PALEMBANG</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <p>Ke</p>
                                            <h5>JAKARTA</h5>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <p>Pilihan Maskapai</p>
                                    <img src="../src/assets/ic-lionair.png" alt="" />
                                    <p>Keberangkatan</p>
                                    <h5>Senin, 15 Januari 2024</h5>
                                    <p>Waktu Keberangkatan</p>
                                    <h5>07.00</h5>
                                    <hr />
                                    <Row className="mt-3">
                                        <Col lg={6}>
                                            <h5 className="text-secondary">Total Pembayaran</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <h5>IDR 500.000</h5>
                                        </Col>
                                    </Row>
                                </Card>
                                <Button href="/bayar" variant="btn btn-utama mt-3 w-100">Selanjutnya</Button>
                                <p className='text-secondary mt-3'>*Pastikan data sudah terisi dengan benar sebelum melanjutkan.</p>
                            </Col>
                        </Row>
                    </Container>
                    <FooterComponent />
                </div>
            </div>
        </>
    );
}

export default infoPage;