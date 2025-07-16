// -- LIBRERIAS GLOBALES
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// -- LIBRERIAS LOCALES

// -- CONTEXT
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./context/RouterGuard";

// -- SCREENS

// -- Sitios de Log In / Not Found
import Index from "./screens/Index";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

// -- Portafolio
import NewPortfolio from "./screens/New";

// -- COMPONENTS
import Navbar from "./components/Navbar"; // Barra de Navegacion
import Footer from "./components/Footer"; // Pié de Pagina

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* -- rutas publicas -- */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Index />} />
                <Route
                  path="/login"
                  element={
                    <>
                      <Auth />
                      <Footer />
                    </>
                  }
                />
              </Route>

              {/* -- rutas protegidas -- */}
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/new" element={<NewPortfolio />} />
                <Route path="/edit/:id" element={<NewPortfolio />} />
              </Route>

              {/* -- rutas no encontradas -- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
