import { ClientForm } from '../components/ClientForm'

export const NewClient = () => {

    return (

        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>

            <p className='mt-4'>Llena los siguientes campos para registrar un cliente</p>

            <ClientForm
            />
        </>
    )
}