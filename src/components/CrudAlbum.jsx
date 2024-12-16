import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import { ListarAlbum } from './Album/ListarAlbum';
import { CrearAlbum } from './Album/CrearAlbum';
import { ActualizarAlbum } from './Album/ActualizarAlbum';

export function CrudAlbum() {
    return (
        <div className="container">
            <h2>CRUD Artista</h2>
            <nav>
                <li>
                    <Link to="list-album">Listar Albums</Link>
                </li>
                <li>
                    <Link to="create-album">Crear Album</Link>
                </li>
            </nav>
            <Routes>
                <Route path="list-album" element={<ListarAlbum />} />
                <Route path="create-album" element={<CrearAlbum />} />
                <Route path="update-album/:id" element={<ActualizarAlbum />} />
            </Routes>
        </div>
    )
}