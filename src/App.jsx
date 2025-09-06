import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Returns from "./pages/Returns.jsx";
import Success from "./pages/Success.jsx";   
import Cancel from "./pages/Cancel.jsx";     
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/success" element={<Success />} />  
          <Route path="/cancel" element={<Cancel />} />    
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
