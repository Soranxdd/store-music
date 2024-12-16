import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

export function ListarAlbum() {

    const [albumList, SetAlbumList] = useState([])

    // Obtenemos los artistas con un get
    const FetchAlbums = async () => {
        try {
            const response = await api.get('/albums/')
            SetAlbumList(response.data)
        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        FetchAlbums();
    }, [])

    async function handleEliminar(id) {
        try {
            await api.delete(`/albums/${id}/`)
            alert('Album eliminado correctamente')
            FetchAlbums();
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleActualizar(id) {
        window.location.href = `update-album/${id}`
    }

    return (
        <div>
            <h2>Listado Albums</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Artista</th>
                        <th>Generos</th>
                        <th>Fecha de publicacion</th>
                        <th>Duracion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {albumList.map(album =>(
                        <tr key={album.id}>
                            <th>{album.id}</th>
                            <th>{album.titulo}</th>
                            <th>{album.artista}</th>
                            <th>{album.generos}</th>
                            <th>{album.fecha_publicacion}</th>
                            <th>{album.duracion_minutos}</th>
                            <th>
                                <button onClick={() => handleActualizar(album.id)}>Actualizar</button>
                                <button onClick={() => handleEliminar(album.id)}>Eliminar</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}