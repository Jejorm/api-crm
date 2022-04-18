import { useEffect, useState } from 'react'

import { Client } from '../components/Client'

export const Home = () => {

    const [clients, setClients] = useState([])

    useEffect(() => {

        const obtainClientsAPI = async () => {

            try {
                
                const url = 'http://localhost:4000/clients'

                const response = await fetch(url)

                const result = await response.json()

                setClients(result)

            } catch (e) {
                console.log(e)
            }

        }

        obtainClientsAPI()

    }, [])

    const handleDelete = async id => {
        const confirmDelete = confirm('¿Deseas eliminar este cliente?')

        if (confirmDelete) {

            try {

                const url = `http://localhost:4000/clients/${id}`

                const resp = await fetch(url, {
                    method: 'DELETE'
                })

                await resp.json()

                const arrayClients = clients.filter(client => client.id !== id) 

                setClients(arrayClients)

            } catch (error) {
                console.error(error)
            }
        }
    }

    return (

        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>

            <p className='mt-4'>Administra tus clientes</p>

            <table className='bg-white mt-4 table-auto shadow w-full'>

                <thead className='bg-blue-800 text-white'>

                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        clients.map(client => (
                            <Client
                                key={client.id}
                                client={client}
                                handleDelete={handleDelete}
                            />
                        ))
                    }
                </tbody>

            </table>
        </>
    )
}