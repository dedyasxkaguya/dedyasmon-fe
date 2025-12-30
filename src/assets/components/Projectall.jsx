import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Projectall = () => {
    const [arr, setArr] = useState([])
    const [user, setUser] = useState()
    const { id } = useParams()
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(data => {
                const fetched = data.data
                setArr(fetched)
            })
        setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/api/user/${id}`)
                .then(data => {
                    const fetched = data.data
                    setUser(fetched)
                })
        }, 1000);
    }, [])
    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Menghapus projek dengan id ' + id,
            text: 'Apakah kamu yakin?',
            footer: 'Perubahan ini tidak bisa diulang',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            confirmButtonColor: '#198754',
            cancelButtonText: 'Batalkan',
            cancelButtonColor: '#dc3545'
        }).then(res => {
            if (res.isConfirmed) {

                axios.get(`http://127.0.0.1:8000/api/project/delete/${id}`)
                    .then(data => {
                        const fetched = data.data
                        if (fetched.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil',
                                text: fetched.message,
                                footer: 'Memuat halaman dalam 2 detik',
                                showConfirmButton: false
                            })
                            setTimeout(() => {
                                navigation.reload()
                            }, 3000);
                        }
                    })
            }
        })
    }
    return (
        <div className='m-4 p-2 rounded-3xl shadow modaldiv bg-(--color-powder-blue)'>
            <div className="text-2xl font-medium pb-2 notdiv">All Projects</div>
            <div className="flex flex-col gap-2 notdiv modaldiv-content">
                {arr.map((a) => {
                    return (
                        <div className="p-2 bg-white rounded-2xl shadow flex gap-2 notdiv flex-col">
                            <div className="bg-(--color-royal-blue) text-white p-2 rounded-lg gap-4 lg:flex-row sm:flex-col lg:items-center">
                                <div>
                                    <span>@{a?.user?.username}'s </span>
                                    <span className='text-xs font-extralight'>as</span>
                                    <Link to={`/${id}/category/${a?.category?.slug}`} className='mx-2 underline'>{a?.category?.name}</Link>
                                </div>
                                {user?.role == 'ADMIN' && (
                                    <button type='button' className='p-1 bg-red-600 text-white rounded hover:opacity-75' onClick={() => handleDelete(a?.id)}>
                                        Delete <i className='bi bi-trash mx-2'></i>
                                    </button>
                                )}
                            </div>
                            <div className="flex notdiv gap-2">
                                <div className="projectImgBox">
                                    <img src={a?.data?.owner?.avatar_url} alt="" className='projectIconImg aspect-square rounded-xl' />
                                </div>
                                <div className="flex flex-col notdiv max-w-[60%]">
                                    <span className=''>
                                        <a href={a?.data?.owner?.html_url} className='duration-200 hover:underline'>
                                            {a?.data?.owner?.login}
                                        </a>
                                        /{a?.data?.name}</span>
                                    <div className='flex justify-center flex-col'>
                                        <span>Language  :</span>
                                        <div className='flex gap-2 items-center'>
                                            <span>{a?.data?.language}</span>
                                            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${a?.data?.language?.toLowerCase()}/${a?.data?.language?.toLowerCase()}-original.svg`} alt="" className='w-6' />
                                        </div>
                                    </div>
                                    {/* <a href={a?.data?.svn_url} className='px-1 rounded-lg border border-black '>
                                        Github link
                                        <i className='bi bi-github mx-2'></i>
                                    </a> */}
                                </div>
                            </div>
                            {/* <span>{a?.data?.pushed_at?.split('T')[0]} at {a?.data?.pushed_at?.split('T')[1].split('Z')[0]}</span> */}
                            <span className='mt-2'>{a.created_at}</span>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Projectall