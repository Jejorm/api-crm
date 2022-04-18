import { Link, Outlet, useLocation } from 'react-router-dom'

export const Layout = () => {

    const location  = useLocation()

    const urlActual = location.pathname

    return (

        <div className='md:flex md:min-h-screen'>

            <div className='bg-blue-900 px-4 py-12 md:w-1/4'>

                <h2 className='text-4xl font-black text-center text-white'>
                    CRM - Clientes
                </h2>

                <nav className='mt-10'>
                    <Link
                        className=
                        {
                            `${urlActual === '/clients' ? 'text-blue-300' : 'text-white' }
                            block text-2xl mt-4 hover:text-blue-300`
                        }
                        to='/clients'
                    >
                        Clientes
                    </Link>
                    <Link
                        className=
                        {
                            `${urlActual === '/clients/new' ? 'text-blue-300' : 'text-white' }
                            block text-2xl mt-4 hover:text-blue-300`
                        }
                        to='/clients/new'
                    >
                        Nuevo cliente
                    </Link>
                </nav>

            </div>

            <div className='bg-slate-100 overflow-scroll p-12 md:h-screen md:w-3/4'>
                <Outlet />
            </div>

        </div>
    )
}