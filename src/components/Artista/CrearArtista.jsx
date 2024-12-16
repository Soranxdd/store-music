import api from "../../services/api";
import { useRef } from "react";

export function CrearArtista() {
    const nombreRef=useRef();

    async function handleCrear() {
        // Obtener el valor de nombreRef
        const nombre = nombreRef.current.value;
        // Armar artista
        const artista = {
            nombre: nombre
        }
        // Hacer la peticion
        try {
            await api.post('/artistas/', artista)
            alert('Se agrego correctamente el artista');
            nombreRef.current.value='';
            window.location.href='/crud-artista/list-artistas'
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Crear Artista</h2>
            <input className="form-control my-3" ref={nombreRef} type="text" placeholder="Ingrese el nombre del artista" />
            <button className="btn btn-primary" onClick={handleCrear}>Crear</button>
        </div>
    )
}