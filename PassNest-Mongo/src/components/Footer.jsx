const Footer = () => {
    return (
    <>
        <div className='bg-gray-900 text-white flex flex-col justify-center items-center w-full size-22'>
            <div className="logo font-bold text-white text-2xl py-1.5">
                <span className='text-green-500'> &lt;</span>

                <span>PassNest</span><span className='text-green-500'>/&gt;</span>
            </div>
            <div className='flex justify-center items-center'> Created with  <lord-icon
    src="https://cdn.lordicon.com/ajzwsrcs.json"
    trigger="hover"
    colors="primary:#e83a30,secondary:#ebe6ef,tertiary:#e8e230,quaternary:#f9c9c0,quinary:#f24c00"
    style={{"width":"25px","height":"25px"}}>
</lord-icon> by Smriti </div>
        </div></>
    )
}

export default Footer