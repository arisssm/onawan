import { Navigate, Route, Routes,} from "react-router-dom";

// import halaman
import DestinasiPage from "./pages/destinasiPage";
import AboutPage from "./pages/aboutPage";
import DaftarPage from "./pages/daftarPage";
import MasukPage from "./pages/masukPage";
import HomePage from "./pages/homePage";
import OrderPage from "./pages/orderPage";
import SearchPage from "./pages/searchPage";
import InfoPage from "./pages/infoPage";
import ProfilPage from "./pages/profilPage";
import BayarPage from "./pages/bayarPage";
import KonfirmasiPage from "./pages/konfirmasiPage";
import CetakPage from "./pages/cetakPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/beranda" replace/> }/>
        <Route path="/beranda" Component={HomePage} />
        <Route path="/destinasi" Component={DestinasiPage} />
        <Route path="/tentang-kami" Component={AboutPage} />
        <Route path="/daftar" Component={DaftarPage} />
        <Route path="/masuk" Component={MasukPage} />
        <Route path="/pesan" Component={OrderPage} />
        <Route path="/cari-jadwal/*" Component={SearchPage} />
        <Route path="/info" Component={InfoPage} />
        <Route path="/profil/:id" Component={ProfilPage} />
        <Route path="/bayar/:id" Component={BayarPage} />
        <Route path="/konfirmasi/:id" Component={KonfirmasiPage} />
        <Route path="/cetak" Component={CetakPage} />
      </Routes>
    </>
  )
}

export default App
