import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import { ListarArtista } from "./Artista/ListarArtista";
import { CrearArtista } from "./Artista/CrearArtista";
import { ActualizarArtista } from "./Artista/ActualizarArtista";

export function CrudArtista() {
    return (
        <div className="container">
            <h2>CRUD Artista</h2>
            <nav>
                <li>
                    <Link to="list-artistas">Listar Artistas</Link>
                </li>
                <li>
                    <Link to="create-artistas">Crear Artista</Link>
                </li>
            </nav>
            <Routes>
                <Route path="list-artistas" element={<ListarArtista />} />
                <Route path="create-artistas" element={<CrearArtista />} />
                <Route path="update-artistas/:id" element={<ActualizarArtista />} />
            </Routes>
        </div>
    )
}