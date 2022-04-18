import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'

export const VerCliente = () => {

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

        cargando

            ? <Spinner />

            : Object.keys(cliente).length === 0

                ? <p>No hay Resultados</p>

                : (

                    <div>

                        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.name}</h1>

                        <p className='mt-4 text-2xl'>Información del Cliente</p>

                        <p className='mt-12 text-3xl text-gray-600'>
                            <span className='font-bold uppercase text-gray-800'>Cliente: </span>
                            {cliente.name}
                        </p>

                        <p className='mt-8 text-3xl text-gray-600'>
                            <span className='font-bold uppercase text-gray-800'>Correo: </span>
                            {cliente.email}
                        </p>

                        {
                            cliente.phone && (

                                <p className='mt-8 text-3xl text-gray-600'>
                                    <span className='font-bold uppercase text-gray-800'>Teléfono: </span>
                                    {cliente.phone}
                                </p>
                            )
                        }

                        <p className='mt-8 text-3xl text-gray-600'>
                            <span className='font-bold uppercase text-gray-800'>Empresa: </span>
                            {cliente.company}
                        </p>

                        {
                            cliente.notes && (

                                <p className='mt-8 text-3xl text-gray-600'>
                                    <span className='font-bold uppercase text-gray-800'>Notas: </span>
                                    {cliente.notes}
                                </p>
                            )
                        }

                    </div>
                )
    )
}