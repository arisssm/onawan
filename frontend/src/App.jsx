import { Route, Routes } from "react-router-dom";

// import halaman
import landingPage from "./pages/landingPage";
import destinasiPage from "./pages/destinasiPage";
import aboutPage from "./pages/aboutPage";
import daftarPage from "./pages/daftarPage";
import masukPage from "./pages/masukPage";
import homePage from "./pages/homePage";
import orderPage from "./pages/orderPage";
import searchPage from "./pages/searchPage";
import infoPage from "./pages/infoPage";
import profilPage from "./pages/profilPage";
import bayarPage from "./pages/bayarPage";
import konfirmasiPage from "./pages/konfirmasiPage";
import cetakPage from "./pages/cetakPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={landingPage} />
        <Route path="/home" Component={homePage} />
        <Route path="/destinasi" Component={destinasiPage} />
        <Route path="/about" Component={aboutPage} />
        <Route path="/daftar" Component={daftarPage} />
        <Route path="/masuk" Component={masukPage} />
        <Route path="/order" Component={orderPage} />
        <Route path="/search" Component={searchPage} />
        <Route path="/info" Component={infoPage} />
        <Route path="/profil" Component={profilPage} />
        <Route path="/bayar" Component={bayarPage} />
        <Route path="/konfirmasi" Component={konfirmasiPage} />
        <Route path="/cetak" Component={cetakPage} />
      </Routes>
    </>
  )
}

export default App
