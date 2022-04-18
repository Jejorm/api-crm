export const Alert = ({ children }) => {

    return (

        <div
            className='bg-red-600 font-bold p-2 my-4 text-center text-white uppercase'
        >
            { children }
        </div>
    )
}