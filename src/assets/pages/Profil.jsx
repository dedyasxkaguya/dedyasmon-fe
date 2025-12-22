import React from 'react'
import { useParams } from 'react-router-dom'
import Biodata from '../components/Biodata'

const Profil = () => {
    const { id } = useParams()
    return (
        <>
            <main className='bg-neutral-50 w-dvw p-8 font-["Raleway"] '>
                <div className="border bg-neutral-100 border-neutral-400 p-4 rounded-4xl flex gap-4 items-center mb-4">
                    <div className="profile-image w-[6dvw] flex justify-center items-center rounded-full bg-blue-200 text-4xl">
                        {/* {id} */}
                        DE
                    </div>
                    <div className="flex flex-col">
                        <span className='text-2xl font-semibold'>
                            Dedy Anang Setiawan
                        </span>
                        <span className='text-md font-light mb-4'>
                            202523192
                        </span>
                        <span className='text-xl'>
                            X-RPL | 13
                        </span>
                    </div>
                </div>
                <div className="border bg-neutral-100 border-neutral-400 p-4 rounded-3xl flex flex-col gap-4 items-start w-[36dvw]">
                    <span className='text-2xl '>Biodata</span>
                    <div className="flex justify-between gap-4">
                        <div className="rounded-xl border border-neutral-400 flex flex-col overflow-hidden">
                            <Biodata param='Tempat Lahir' value='Ponorogo' />
                            <Biodata param='Tanggal Lahir' value='2009-12-03' />
                            <Biodata param='Alamat' value='Jl. Blyat' last={true} />
                        </div>
                        <div className="rounded-xl border border-neutral-400 flex flex-col overflow-hidden">
                            <Biodata param='Tempat Lahir' value='Ponorogo' />
                            <Biodata param='Tempat Lahir' value='Ponorogo' />
                            <Biodata param='Tempat Lahir' value='Ponorogo' last={true} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profil