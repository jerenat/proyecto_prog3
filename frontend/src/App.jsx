// -- LIBRERIAS GLOBALES
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// -- LIBRERIAS LOCALES

// -- CONTEXT
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./context/RouterGuard";

// -- SCREENS
import Index from "./screens/Index";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import NewPortfolio from "./screens/New";
import Portfolio from "./screens/Portfolio";
import NotFound from "./screens/NotFound";

// -- COMPONENTS
import Navbar from "./components/Navbar";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          {/* -- rutas publicas -- */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth />} />
          </Route>

          {/* -- rutas protegidas -- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<NewPortfolio />} />
            <Route path="/edit/:id" element={<NewPortfolio />} />
            <Route path="/portfolio/:id" element={<Portfolio />} />
          </Route>

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
