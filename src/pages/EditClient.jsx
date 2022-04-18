import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ClientForm } from '../components/ClientForm'

export const EditClient = () => {

    const [cliente, setClient] = useState({})

    const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    useEffect(() => {

        const obtainClientAPI = async () => {

            try {

                const url = `http://localhost:4000/clients/${id}`

                const response = await fetch(url)

                const result = await response.json()

                setClient(result)

            } catch (error) {
                console.error(error)
            }

            setCargando(!cargando)
        }

        obtainClientAPI()

    }, [])

    return (

        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>

            <p className='mt-4'>Utiliza este formulario para editar datos de un cliente</p>

            { cliente?.name
                ? (
                    <ClientForm
                        cliente={cliente}
                        cargando={cargando}
                    />
                    )
                : <p>Cliente ID no válido</p>
            }

        </>
    )
}