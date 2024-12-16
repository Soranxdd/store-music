import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import { CrudArtista } from "./components/CrudArtista";
import { CrudGenero } from "./components/CrudGenero";
import { CrudAlbum } from "./components/CrudAlbum";

export function App(){
    return(
        <Router>
            <div>
                {/* Lo primero que se mostrara */}
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"><i class="fas fa-ticket-alt"></i> Musica</a>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active"><i class="fas fa-home"></i> Inicio</a>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to="/crud-artista">CRUD Artista</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to="/crud-genero">CRUD Genero</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to="/crud-album">CRUD Album</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Conetenedor de routes */}
                <Routes>
                    <Route path="/crud-artista/*" element={<CrudArtista />} />
                    <Route path="/crud-genero/*" element={<CrudGenero />} />
                    <Route path="/crud-album/*" element={<CrudAlbum />} />
                </Routes>
            </div>
        </Router>
    )
}