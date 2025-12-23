import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Biodata from '../components/Biodata'
import Aos from 'aos'
import axios from 'axios'

const Profil = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    const [siswa, setSiswa] = useState()
    useEffect(() => {
        Aos.init({
            duration: 1000
        })
        setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/api/user/${id}`)
                .then(data => {
                    const fetched = data.data
                    setUser(fetched)
                    console.log(fetched)
                    if (fetched.role == 'SISWA') {
                        axios.get(`http://127.0.0.1:8000/api/student/detail/${fetched.id}/all`)
                        .then(data=>{
                            const fetched0 = data.data
                            console.log(fetched0)
                            setSiswa(fetched0)
                        })
                    }
                })
        }, 1000);
    }, [])
    let name = user?.name[0] + user?.name[1]
    if (user?.role == 'USER' || user?.role == 'ADMIN') {
        return (
            <main className='bg-neutral-50 w-dvw p-8 font-["Raleway"] ' data-aos="fade-up">
                <div className="border bg-neutral-100 border-neutral-400 p-4 rounded-4xl flex gap-4 items-center mb-4">
                    <div className="profile-image w-[6dvw] flex justify-center items-center rounded-full bg-blue-200 text-4xl">
                        {name.toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className='text-2xl font-semibold capitalize'>
                            {user?.name}
                        </span>
                        <span className='text-md font-light mb-4'>
                            Role : {user?.role}
                        </span>
                    </div>
                </div>
            </main>
        )
    } else {
        return (
            <>
                <main className='bg-neutral-50 w-dvw p-8 font-["Raleway"] ' data-aos="fade-up">
                    <div className="border bg-neutral-100 border-neutral-400 p-4 rounded-4xl flex gap-4 items-center mb-4">
                        <div className="profile-image w-[6dvw] flex justify-center items-center rounded-full bg-blue-200 text-4xl">
                            {name}
                        </div>
                        <div className="flex flex-col">
                            <span className='text-2xl font-semibold'>
                                {siswa?.name}
                            </span>
                            <span className='text-md font-light mb-4'>
                                {siswa?.nis}
                            </span>
                            <span className='text-xl'>
                                X-RPL | {siswa?.id}
                            </span>
                        </div>
                    </div>
                    <div
                        data-aos='fade-up'
                        className
                        ="border bg-neutral-100 border-neutral-400 p-4 rounded-3xl flex flex-col gap-4 items-start">
                        <span className='text-2xl '>Biodata</span>
                        <div className="flex justify-between gap-4">
                            <div className="rounded-xl border border-neutral-400 flex flex-col overflow-hidden"
                                data-aos='fade-up'>
                                <Biodata param='Tempat Lahir' value={siswa?.tempat_lahir} />
                                <Biodata param='Tanggal Lahir' value={siswa?.tanggal_lahir} />
                                <Biodata param='Alamat' value={siswa?.alamat} last={true} />
                            </div>
                            <div className="rounded-xl border border-neutral-400 flex flex-col overflow-hidden"
                                data-aos='fade-up'>
                                <Biodata param='Gender' value={siswa?.gender} />
                                <Biodata param='Asal Sekolah' value={siswa?.asal_sekolah} />
                                <Biodata param='NISN' value={siswa?.nisn} last={true} />
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

}
export default Profil