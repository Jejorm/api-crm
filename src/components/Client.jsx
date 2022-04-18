import { useNavigate } from 'react-router-dom'

export const Client = ({ client, handleDelete }) => {

    const navigate = useNavigate()

    const { name, company, email, phone, notes, id } = client

    return (

        <tr className='border-b hover:bg-gray-50'>

            <td className='p-3'>{name}</td>

            <td className='p-3'>

                <p>
                    <span className='font-bold text-gray-800 uppercase'>Email: </span>
                    {email}
                </p>

                <p>
                    <span className='font-bold text-gray-800 uppercase'>Tel: </span>
                    {phone}
                </p>

            </td>

            <td className='p-3'>{company}</td>

            <td className='p-3'>

                <button
                    className='bg-yellow-500 block font-bold mb-3 p-2 text-white text-xs uppercase w-full hover:bg-yellow-600'
                    type='button'
                    onClick={() => navigate(`/clients/${id}`)}
                >
                    Ver
                </button>

                <button
                    className='bg-blue-600 block font-bold p-2 text-white text-xs uppercase w-full hover:bg-blue-700'
                    type='button'
                    onClick={() => navigate(`/clients/edit/${id}`)}
                >
                    Editar
                </button>

                <button
                    className='bg-red-600 block font-bold mt-3 p-2 text-white text-xs uppercase w-full hover:bg-red-700'
                    type='button'
                    onClick={() => handleDelete(id)}
                >
                    Eliminar
                </button>

            </td>

        </tr>
    )
}