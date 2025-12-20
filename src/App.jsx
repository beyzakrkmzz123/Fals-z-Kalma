import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Yorumlar from "./components/Yorumlar";
import Features from "./components/Features";
import Download from "./components/Download";
import Footer from "./components/Footer";
import Iletisim from "./pages/Iletisim";
import Hakkimizda from "./pages/Hakkimizda";
import Falcilar from "./pages/Falcilar";
import FalTurleri from "./pages/FalTurleri";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import FalciDetay from "./pages/FalciDetay";
import YapayZeka from "./pages/YapayZeka";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Premium from "./pages/Premium";
import "./i18n";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col">
              <Hero />
              <Yorumlar />
              <Features />
              <Download />
            </div>
          }
        />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/falcilar" element={<Falcilar />} />
        <Route path="/falturleri" element={<FalTurleri />} />
        <Route path="/login" element={<Login />} />
        <Route path="/falci/:id" element={<FalciDetay />} />
        <Route path="/yapayzeka" element={<YapayZeka />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
