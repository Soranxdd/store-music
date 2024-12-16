import api from "../../services/api";
import Select from "react-select";
import { useRef, useState, useEffect } from "react";

export function CrearAlbum() {
    const tituloRef=useRef();
    const artistaRef=useRef();
    const [artistaList, SetArtistaList] = useState([]);
    const [generosList, SetGenerosList] = useState([]);
    const [generosSeleccionados, SetGenerosSeleccionados] = useState([]); // Estado para los generos seleccionados, lista vacia
    const [fechaPublicacion, SetFechaPublicacion] = useState(""); // Estado para la fecha de publicacion
    const [duracionMinutos, SetDuracionMinutos] = useState(""); // Para la duracion

    const FetchArtistas = async () => {
        try {
            const response = await api.get('/artistas/')
            SetArtistaList(response.data)
        } catch(error) {
            console.log(error.message);
        }
    }

    const FetchGeneros = async() => {
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

    useEffect(()=>{
        FetchArtistas();
        FetchGeneros();
    }, [])

    async function handleCrear() {
        // Armar album
        const album = {
            titulo: tituloRef.current.value,
            artista: parseInt(artistaRef.current.value),
            generos: generosSeleccionados.map((genero) => genero.value), // IDs de los generos
            fecha_publicacion: fechaPublicacion,
            duracion_minutos: parseInt(duracionMinutos),
        }
        // Hacer la peticion
        try {
            await api.post('/albums/', album)
            alert('Se creo correctamente el album');
            tituloRef.current.value='';
            window.location.href='/crud-album/list-album'
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Crear Album</h2>
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
            <button className="btn btn-primary" onClick={handleCrear}>Crear</button>
        </div>
    )
}