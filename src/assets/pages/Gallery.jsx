import React from 'react'

const Gallery = () => {
    const array = [1,2,3,4,5,6,7,8,9,0]
    return (
        <div className="p-8 py-0 modaldiv">
            <div className="p-4 rounded-4xl w-[80dvw] shadow-md pb-1">
                <span className='text-xl font-semibold'>
                    Andaikan ini galeri
                </span>
                <div className="gallery grid gap-4 my-4 modaldiv-content rounded-2xl">
                    {array.map((a)=>{
                        return(
                            <img src="https://placehold.co/600x400?text=?" alt={a} className='rounded-xl'/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Gallery