import React, { useEffect, useState } from 'react'
import Dashboard0 from '../Dashboard0'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

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
    const handleUpdate = () => {
        Swal.fire({
            title: 'Wait a second...',
            text: 'Fetching our API',
            showConfirmButton: false,
        })
        const nama = document.getElementById('nama').value ? document.getElementById('nama').value : student?.name
        const username = document.getElementById('username').value ? document.getElementById('username').value : student?.user?.username
        const nis = document.getElementById('nis').value ? document.getElementById('nis').value : student?.nis
        const nisn = document.getElementById('nisn').value ? document.getElementById('nisn').value : student?.nisn
        const asal_sekolah = document.getElementById('asal_sekolah').value ? document.getElementById('asal_sekolah').value : student?.asal_sekolah
        const email = document.getElementById('email').value ? document.getElementById('email').value : student?.user?.email
        const tempat_lahir = document.getElementById('tempat_lahir').value ? document.getElementById('tempat_lahir').value : student?.tempat_lahir
        const tanggal_lahir = document.getElementById('tanggal_lahir').value ? document.getElementById('tanggal_lahir').value : student?.tanggal_lahir
        const alamat = document.getElementById('alamat').value ? document.getElementById('alamat').value : student?.alamat

        const formData = new FormData()
        console.log({
            'nama': nama,
            'username': username,
            'nis': nis,
            'nisn': nisn,
            'asal_sekolah': asal_sekolah,
            'email': email,
            'tempat_lahir': tempat_lahir,
            'tanggal_lahir': tanggal_lahir,
            'alamat': alamat,
            'id':student.id
        })
        formData.append('name', nama);
        formData.append('username', username);
        formData.append('nis', nis);
        formData.append('nisn', nisn);
        formData.append('asal_sekolah', asal_sekolah);
        formData.append('email', email);
        formData.append('tempat_lahir', tempat_lahir);
        formData.append('tanggal_lahir', tanggal_lahir);
        formData.append('alamat', alamat);
        formData.append('id', student.id);
        axios.post(`http://127.0.0.1:8000/api/siswa/edit`,formData)
        .then(data=>{
            const fetched = data.data
            console.log(fetched)
            Swal.fire({
                icon:'success',
                title:'Berhasil',
                text : 'Berhasil update data untuk siswa ' + nama,
                footer:'Memuat halaman dalam 2 detik',
                showConfirmButton:false
            })
            setTimeout(() => {
                navigation.reload()
            }, 2048);
        })
    }
    return (
        <div className='flex'>
            <Dashboard0 />
            <div className="p-4">
                <div className="modalDiv w-[80dvw] rounded-3xl p-2 border border-(--color-royal-blue)">
                    <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                        Edit siswa {student?.name} <span className='text-xs font-extralight'>{student?.slug}</span>
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {/* <div className=""> */}
                        <label htmlFor="username" className='block'>
                            <span className='text-sm font-light'>Nama</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <input
                                    type="text"
                                    id='nama'
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
                                type="date"
                                id='tanggal_lahir'
                                defaultValue={student?.tanggal_lahir}
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
                        <button type="button" className='p-2 md:col-span-2 rounded-2xl bg-(--color-royal-blue) text-white' onClick={() => handleUpdate()}>
                            Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSiswa