import api from "../../services/api";
import { useRef } from "react";

export function CrearGenero() {
    const nombreRef=useRef();

    async function handleCrear() {
        const nombre = nombreRef.current.value;
        const genero = {
            nombre: nombre
        }

        try {
            await api.post('/generos/', genero)
            alert('Se agrego el genero')
            nombreRef.current.value='';
            window.location.href='/crud-genero/list-generos'
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <div>
            <h2>Crear Genero</h2>
            <input ref={nombreRef} type="text" placeholder="Ingrese nombre" />
            <button onClick={handleCrear}>Crear</button>
        </div>
    )
}