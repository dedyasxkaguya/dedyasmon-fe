import React, { useEffect, useState } from 'react'
import Dashboard0 from '../Dashboard0'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Siswa = () => {
    const { id } = useParams()
    const [siswa, setSiswa] = useState([])
    const [data, setData] = useState(false)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/students')
            .then(data => {
                const fetched = data.data
                setSiswa(fetched)
                setData(false)
            })
    }, [])
    const handleDetail = (slug) => {
        Swal.fire({
            title: 'Wait a second...',
            text: 'Fetching our API',
            showConfirmButton: false
        })
        setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/api/student/${slug}`)
                .then(data => {
                    const fetched = data.data
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Menampilkan data untuk ' + fetched.name,
                        showConfirmButton: false,
                        timer: 512,
                        timerProgressBar: true
                    })
                    setTimeout(() => {
                        setData(fetched)
                    }, 512);
                })
        }, 1000);
    }
    const handleClose = () => {
        setData(false)
    }
    const handleCopy = () => {
        const element = document.getElementById('detailDiv').textContent
        navigator.clipboard.writeText(element)
        Swal.fire({
            icon: 'success',
            text: 'Berhasil menyalin data ke clipboard',
            showConfirmButton: false,
            timer: 1440,
            timerProgressBar: true,
            toast: true
        })
    }
    const handleCopyAlldata = () => {
        navigator.clipboard.writeText(JSON.stringify(data))
        Swal.fire({
            icon: 'success',
            text: 'Berhasil menyalin data ke clipboard',
            showConfirmButton: false,
            timer: 1440,
            timerProgressBar: true,
            toast: true
        })
    }
    return (
        <div className='flex'>
            <Dashboard0 />
            <div className="p-4">
                <div className="modalDiv w-[72dvw] rounded-3xl p-2 border border-(--color-royal-blue)">
                    <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                        List siswa
                    </div>
                    <div className="flex gap-2 flex-col mt-2">
                        {siswa.map((s) => {
                            return (
                                <div className="p-1 rounded-2xl border border-(--color-royal-blue) flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        <div className="px-3 p-1 rounded-xl bg-(--color-royal-blue) text-white items-center">
                                            {s.id}
                                        </div>
                                        {s.name}
                                        <span className='text-sm font-light'>
                                            {s.slug}
                                        </span>
                                    </div>
                                    <div className=" flex gap-2">
                                        <button type='button' onClick={() => handleDetail(s.slug)}
                                            className='p-1 px-2 rounded-xl border duration-500 border-green-400 hover:bg-green-400'>
                                            Detail
                                        </button>
                                        <Link to={`/${id}/siswa/edit/${s.slug}`}
                                            className='p-1 px-2 rounded-xl border duration-500 border-yellow-400 hover:bg-yellow-400'>Update</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {data && (

                <div id='detailDiv' className="fixed detailBox w-[72dvh] bg-white rounded-3xl shadow-2xl p-2">
                    <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white text-lg text-center">
                        {data?.name} ⁕ 13
                    </div>
                    <div className="border border-(--color-royal-blue) p-2 mt-2 rounded-2xl">
                        <table>
                            <tbody>
                                <tr>
                                    <td className='text-sm font-light'>Username</td>
                                    <td className='font-medium'>: {data?.user?.username}
                                        <i className={`bi bi-gender-${data?.gender == 'PEREMPUAN' ? 'female' : 'male'} mx-2`}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>NIS</td>
                                    <td className='font-medium'>: {data?.nis}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>NISN</td>
                                    <td className='font-medium'>: {data?.nisn}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Alamat</td>
                                    {/* <td className='font-medium truncate'>: {data?.alamat}</td> */}
                                    <td className='font-medium truncate'>:
                                        <a className='text-(--color-royal-blue) cursor-pointer hover:underline'> Klik disini</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Asal Sekolah</td>
                                    <td className='font-medium'>: {data?.asal_sekolah}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Tempat Lahir</td>
                                    <td className='font-medium'>: {data?.tempat_lahir}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Tanggal Lahir</td>
                                    <td className='font-medium'>: {data?.tanggal_lahir}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Siswa Slug</td>
                                    <td className='font-medium'>: {data?.slug}</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>User Slug</td>
                                    <td className='font-medium'>: {data?.user?.slug}X</td>
                                </tr>
                                <tr>
                                    <td className='text-sm font-light'>Email</td>
                                    <td className='font-medium'>: {data?.user?.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex gap-2 mt-2">
                            <button type="button" className='p-2 rounded-xl w-[50%] border border-(--color-royal-blue) text-(--color-royal-blue) duration-500 hover:opacity-50' onClick={() => handleClose()}>
                                Close
                                <i className='mx-2 bi bi-x'></i>
                            </button>
                            <button type="button" className='p-2 rounded-xl w-[50%] bg-(--color-royal-blue) text-white duration-500 hover:opacity-50'
                                onClick={() => handleCopy()}>
                                Copy data
                                <i className='mx-2 bi bi-clipboard'></i>
                            </button>
                            <button type="button" className='p-2 rounded-xl w-[50%] bg-neutral-400 text-white duration-500 hover:opacity-50'
                                onClick={() => handleCopyAlldata()}>
                                Copy all data
                                <i className='mx-2 bi bi-server
                                '></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Siswa