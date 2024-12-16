import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";


export function ActualizarArtista() {
    const { id } = useParams();

    const nombreRef = useRef();

    useEffect(()=> {
        const getArtista = async() => {
            try {
                const response = await api.get(`/artistas/${id}/`)
                nombreRef.current.value = (await response).data.nombre;
            } catch(error) {
                console.log(error.message);
            }
        }
        getArtista();
    }, [id])

    async function handleClick(id) {
        // Obtener el valor de nombreRef
        const nombre = nombreRef.current.value;
        // Armar artista
        const artista = {
            id: id,
            nombre: nombre
        }

        try {
            await api.put(`/artistas/${id}/`, artista)
            alert('Artista actualizado');
            window.location.href='/crud-artista/list-artistas';
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Actualizar Artista</h2>
            <input className="form-control my-3" ref={nombreRef} type="text" placeholder="Ingrese el nuevo nombre" />
            <button className="btn btn-primary" onClick={() => handleClick(id)}>Actualizar</button>
        </div>
    )
}