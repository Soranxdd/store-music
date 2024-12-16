import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

export function ListarGeneros() {
    const [generosList, SetGenerosList] = useState([]);

    const FetchGeneros = async() => {
        try {
            const response = await api.get('/generos/');
            SetGenerosList(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=> {
        FetchGeneros()
    }, []);

    async function handleEliminar(id) {
        await api.delete(`generos/${id}`)
    }

    function handleActualizar(id) {
        window.location.href=`update-genero/${id}`
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {generosList.map(genero =>
                        <tr key={genero.id}>
                            <th>{genero.id}</th>
                            <th>{genero.nombre}</th>
                            <th>
                                <button onClick={()=>handleActualizar(genero.id)}>Actualizar</button>
                                <button onClick={()=>handleEliminar(genero.id)}>Eliminar</button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}