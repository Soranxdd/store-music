import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

export function ListarArtista() {
    const [artistaList, SetArtistaList] = useState([])

    const FetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/')
            SetArtistaList(response.data)
        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        FetchArtistas();
    }, [])

    async function handleEliminar(id) {
        try {
            await api.delete(`/artistas/${id}/`)
            alert('Artista eliminado correctamente')
            FetchArtistas();
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleActualizar(id) {
        window.location.href = `update-artistas/${id}`
    }

    return (
        <div>
            <h2>Listado Artistas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {artistaList.map(artista =>(
                        <tr key={artista.id}>
                            <th>{artista.id}</th>
                            <th>{artista.nombre}</th>
                            <th>
                                <button onClick={() => handleActualizar(artista.id)}>Actualizar</button>
                                <button onClick={() => handleEliminar(artista.id)}>Eliminar</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}