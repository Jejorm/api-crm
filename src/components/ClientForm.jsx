import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { Alert } from './Alert'
import { Spinner } from './Spinner'

export const ClientForm = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const NewClientSchema = Yup.object().shape({

        name: Yup.string()
                .min(3, 'El Nombre es muy Corto')
                .max(20, 'El Nombre es muy Largo')
                .required('El Nombre del Cliente es Obligatorio'),

        company: Yup.string()
                    .required('El Nombre de la Empresa es Obligatorio'),

        email: Yup.string()
                    .email('Correo No Válido')
                    .required('El Correo del Cliente es Obligatorio'),

        phone: Yup.number()
                    .integer('El Número No es Válido')
                    .positive('El Número No es Válido')
                    .typeError('El Número No es Válido'),
    })

    const handleSubmit = async values => {

        try {

            let resp

            if (cliente.id) {

                const url = `http://localhost:4000/clients/${cliente.id}`

                resp = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                })

            } else {

                const url = 'http://localhost:4000/clients'

                resp = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                })
            }

            await resp.json()

            navigate('/clients')

        } catch (e) {
            console.log(e)
        }
    }

    return (

        cargando
            ? <Spinner />
            :

        <div className='bg-white mt-12 mx-auto px-4 py-8 rounded-md shadow-md md:w-3/4'>

            <h1
                className='font-bold text-center text-gray-600 text-xl uppercase'
            >
                { cliente?.name ? 'Editar Cliente' : 'Agregar Cliente' }
            </h1>

            <Formik
                initialValues={{
                    name: cliente?.name ?? '',
                    company: cliente?.company ?? '',
                    email: cliente?.email ?? '',
                    phone: cliente?.phone ?? '',
                    notes: cliente?.notes ?? '',
                }}
                enableReinitialize={true}
                onSubmit={ async (values, { resetForm }) => {
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={NewClientSchema}
            >

                {
                    ({ errors, touched }) => {

                        return (

                            <Form className='mt-12'>

                                <div className='mb-4'>

                                    <label
                                        className='text-gray-800'
                                        htmlFor='name'
                                    >
                                        Nombre:
                                    </label>

                                    <Field
                                        className='block bg-gray-50 mt-2 p-4 w-full'
                                        type='text'
                                        id='name'
                                        name='name'
                                        placeholder='Nombre del Cliente'
                                    />

                                    {
                                        errors.name && touched.name ? <Alert>{errors.name}</Alert> : null
                                    }

                                </div>

                                <div className='mb-4'>

                                    <label
                                        className='text-gray-800'
                                        htmlFor='company'
                                    >
                                        Empresa:
                                    </label>

                                    <Field
                                        className='block bg-gray-50 mt-2 p-4 w-full'
                                        type='text'
                                        id='company'
                                        name='company'
                                        placeholder='Empresa del Cliente'
                                    />

                                    {
                                        errors.company && touched.company ? <Alert>{errors.company}</Alert> : null
                                    }

                                </div>

                                <div className='mb-4'>

                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >
                                        E-mail:
                                    </label>

                                    <Field
                                        className='block bg-gray-50 mt-2 p-4 w-full'
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Email del Cliente'
                                    />

                                    {
                                        errors.email && touched.email ? <Alert>{errors.email}</Alert> : null
                                    }

                                </div>

                                <div className='mb-4'>

                                    <label
                                        className='text-gray-800'
                                        htmlFor='phone'
                                    >
                                        Teléfono:
                                    </label>

                                    <Field
                                        className='block bg-gray-50 mt-2 p-4 w-full'
                                        type='tel'
                                        id='phone'
                                        name='phone'
                                        placeholder='Teléfono del Cliente'
                                    />

                                    {
                                        errors.phone && touched.phone ? <Alert>{errors.phone}</Alert> : null
                                    }

                                </div>

                                <div className='mb-4'>

                                    <label
                                        className='text-gray-800'
                                        htmlFor='notes'
                                    >
                                        Notas:
                                    </label>
                                    <Field
                                        className='block bg-gray-50 h-40 mt-2 p-4 w-full'
                                        as='textarea'
                                        type='text'
                                        id='notes'
                                        name='notes'
                                        placeholder='Notas del Cliente'
                                    />

                                </div>

                                <input
                                    className='bg-blue-800 cursor-pointer font-bold mt-5 p-4 text-lg text-white uppercase w-full'
                                    type='submit'
                                    value={ cliente?.name ? 'Editar Cliente' : 'Agregar Cliente' }
                                />

                            </Form>
                        )
                    }
                }

            </Formik>

        </div>
    )
}

ClientForm.defaultProps = {
    cliente: {},
    cargando: false
}