import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../services/api";

export function ActualizarAlbum() {
    const { id } = useParams();

    const tituloRef=useRef();
    const artistaRef=useRef();

    const [artistaList, SetArtistaList] = useState([]);
    const [generosList, SetGenerosList] = useState([]);
    const [generosSeleccionados, SetGenerosSeleccionados] = useState([]);
    const [fechaPublicacion, SetFechaPublicacion] = useState("");
    const [duracionMinutos, SetDuracionMinutos] = useState("");

    // Fetch de datos iniciales
    const fetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/');
            SetArtistaList(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchGeneros = async () => {
        try {
            const response = await api.get('/generos/');
            SetGenerosList(
                response.data.map((genero) => ({
                    value: genero.id,
                    label: genero.nombre,
                }))
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchAlbum = async () => {
        try {
            const response = await api.get(`/albums/${id}/`);
            const album = (await response).data;
            console.log(album);
            tituloRef.current.value = album.titulo;
            artistaRef.current.value = album.artista.id;
            console.log(artistaRef);
            
            SetGenerosSeleccionados(
                album.generos.map((genero) => ({
                    value: genero.id, // En este caso, el string 'Rock' o 'Pop'
                    label: genero, // El mismo string para mostrar en la UI
                }))
            );
            console.log(album.generos);
            console.log(generosSeleccionados);
            
            SetFechaPublicacion(album.fecha_publicacion);
            SetDuracionMinutos(album.duracion_minutos);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Cargar datos al renderizar el componente
    useEffect(() => {
        fetchArtistas();
        fetchGeneros();
        fetchAlbum();
    }, [id]);

    async function handleActualizar() {
        
        const album = {
            titulo: tituloRef.current.value,
            artista: parseInt(artistaRef.current.value),
            generos: generosSeleccionados.map((genero) => genero.id),
            fecha_publicacion: fechaPublicacion,
            duracion_minutos: parseInt(duracionMinutos),
        };

        try {
            await api.put(`/albums/${id}/`, album);
            alert("Álbum actualizado correctamente");
            window.location.href = "/crud-album/list-album";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Actualizar Album</h2>
            <input className="form-control my-3" ref={tituloRef} type="text" placeholder="Ingrese el titulo del album" />
            <select className="form-control my-3" ref={artistaRef}>
                {artistaList.map(artista =>(
                    <option key={artista.id} value={artista.id}>
                        {artista.nombre}
                    </option>
                ))}
            </select>
            <Select
                className="form-control my-3"
                options={generosList}
                value={generosSeleccionados}
                onChange={(selectedOptions) =>
                    SetGenerosSeleccionados(selectedOptions)
                }
                isMulti
                placeholder="Seleccione los géneros"
            />
            <input
                className="form-control my-3"
                type="date"
                value={fechaPublicacion}
                onChange={(fecha) => SetFechaPublicacion(fecha.target.value)}
            />
            <input
                className="form-control my-3"
                type="number"
                placeholder="Ingrese la duracion (en minutos)"
                value={duracionMinutos}
                onChange={(duracion) => SetDuracionMinutos(duracion.target.value)}
            />
            <button className="btn btn-primary" onClick={handleActualizar}>
                Actualizar
            </button>
        </div>
    )
}