import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import { ListarGeneros } from './Genero/ListarGeneros';
import { ActualizarGenero } from './Genero/ActualizarGenero';
import { CrearGenero } from './Genero/CrearGenero';

export function CrudGenero() {
    return (
        <div>
            <h1>CRUD Generos</h1>
            <nav>
                <ul>
                    <li><Link to='list-generos'>Listar Generos</Link></li>
                    <li><Link to='create-genero'>Crear Genero</Link></li>
                </ul>
            </nav>
            <Routes >
                <Route path='list-generos' element={<ListarGeneros />}></Route>
                <Route path='create-genero' element={<CrearGenero />}></Route>
                <Route path='update-genero/:id' element={<ActualizarGenero />}></Route>
            </Routes>
        </div>
    )
}