import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";

export function App(){
    return(
        <Router>
            <div>
                {/* Lo primero que se mostrara */}
                <nav>
                    <li>
                        <Link to="/ruta">Click para mostrar Si</Link>
                    </li>
                </nav>
                {/* Conetenedor de routes */}
                <Routes>
                    {/* Crear ruta y proprocionar elemento a renderizar */}
                    <Route path="/ruta" element={<h1>Si</h1>} />
                </Routes>
            </div>
        </Router>
    )
}