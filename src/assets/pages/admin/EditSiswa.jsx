import React, { useEffect, useState } from 'react'
import Dashboard0 from '../Dashboard0'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditSiswa = () => {
    const { siswa } = useParams()
    const [student, setStudent] = useState()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/student/${siswa}`)
            .then(data => {
                const fetched = data.data
                setStudent(fetched)
            })
    }, [])
    return (
        <div className='flex'>
            <Dashboard0 />
            <div className="p-4">
                <div className="modalDiv w-[80dvw] rounded-3xl p-2 border border-(--color-royal-blue)">
                    <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                        Edit siswa {student?.name}
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {/* <div className=""> */}
                        <label htmlFor="username" className='block'>
                            <span className='text-sm font-light'>Nama</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <input
                                    type="text"
                                    id='username'
                                    placeholder={student?.user?.name}
                                    className='p-2 border border-(--color-royal-blue) rounded-lg flex-1'
                                />
                            </div>
                        </label>
                        <label htmlFor="username" className='block'>
                            <span className='text-sm font-light'>Username</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <input
                                    type="text"
                                    id='username'
                                    placeholder={student?.user?.username}
                                    className='p-2 border border-(--color-royal-blue) rounded-lg flex-1'
                                />
                            </div>
                        </label>
                        {/* </div> */}
                        <label htmlFor="nis" className='block'>
                            <span className='text-sm font-light'>NIS</span>
                            <input
                                type="text"
                                id='nis'
                                placeholder={student?.nis}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="nisn" className='block'>
                            <span className='text-sm font-light'>NISN</span>
                            <input
                                type="text"
                                id='nisn'
                                placeholder={student?.nisn}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="asal_sekolah" className='block'>
                            <span className='text-sm font-light'>Asal Sekolah</span>
                            <input
                                type="text"
                                id='asal_sekolah'
                                placeholder={student?.asal_sekolah}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="email" className='block'>
                            <span className='text-sm font-light'>Email</span>
                            <input
                                type="email"
                                id='email'
                                placeholder={student?.user?.email}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="tempat_lahir" className='block'>
                            <span className='text-sm font-light'>Tempat Lahir</span>
                            <input
                                type="text"
                                id='tempat_lahir'
                                placeholder={student?.tempat_lahir}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="tanggal_lahir" className='block'>
                            <span className='text-sm font-light'>Tanggal Lahir</span>
                            <input
                                type="text"
                                id='tanggal_lahir'
                                placeholder={student?.tanggal_lahir}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        {/* <label htmlFor="slug" className='block'>
                            <span className='text-sm font-light'>Siswa Slug</span>
                            <input
                                type="text"
                                id='slug'
                                placeholder={student?.slug}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label>
                        <label htmlFor="user_slug" className='block'>
                            <span className='text-sm font-light'>User Slug</span>
                            <input
                                type="text"
                                id='user_slug'
                                placeholder={student?.user?.slug}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1'
                            />
                        </label> */}
                        <label htmlFor="alamat" className='block md:col-span-2'>
                            <span className='text-sm font-light'>Alamat</span>
                            <textarea
                                id='alamat'
                                placeholder={student?.alamat || "Klik disini"}
                                className='p-2 border border-(--color-royal-blue) rounded-lg w-full mt-1 min-h-20'
                                rows="3"
                            />
                        </label>
                        <button type="button" className='p-2 md:col-span-2 rounded-2xl bg-(--color-royal-blue) text-white'>Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSiswa