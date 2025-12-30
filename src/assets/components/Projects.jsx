import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
const Projects = (props) => {
    const { id } = useParams()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState()
    const [project, setProject] = useState([])
    const [cat, setCats] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
            .then(data => {
                const fetched = data.data
                setUser(fetched)
                setProject(fetched.projects)
                console.log(fetched.projects)
            })
            setTimeout(() => {
                axios.get('http://127.0.0.1:8000/api/categories')
                .then(data=>{
                    const fetched = data.data
                    setCats(fetched)
                })
            }, 2000);
    }, [])

    const handleShow = () => {
        setShow(true)
    }
    const handlePost = () => {
        Swal.fire({
            title: 'Wait a second...',
            text: "Fetching API...",
            showConfirmButton: false
        })
        const link = document.getElementById('project').value
        const category = document.getElementById('category').value
        if (link) {
            console.log(link)
            const project = (link.split('/'))
            const github_user = project[3]
            const github_repo = project[4]
            const github_link = `https://api.github.com/repos/${github_user}/${github_repo}`

            console.log({
                'link': link,
                'user': github_user,
                'repo': github_repo
            })
            console.log(github_link)
            // axios.get(github_link, {
            //     headers: {
            //         'Authorization': `Bearer ${import.meta.env.VITE_API_URL}`,
            //         'Accept': 'application/json'
            //     }
            // }).then(data => {
            axios.get(github_link)
                .then(data => {
                    const fetched = data.data
                    console.log(fetched)
                    const formData = new FormData()
                    formData.append('data', JSON.stringify(fetched))
                    formData.append('user_id', user?.id)
                    formData.append('category_id', category)
                    axios.post('http://127.0.0.1:8000/api/project/add', formData)
                        .then(data => {
                            const fetched = data.data
                            console.log(fetched)
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil',
                                text: 'Berhasil menambahkan projekmu ke database, memuat halaman dalam 2 detik',
                                footer: `https://github.com/${github_user}/${github_repo}`,
                                showConfirmButton: false
                            })
                            setTimeout(() => {
                                navigation.reload()
                            }, 3000)
                        })
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Gagal menambahkan projekmu ke database, pastikan kamu mengirim link yang sesuai',
                        footer: err,
                        confirmButtonText: 'Isi form lagi'
                    })
                })
        }

    }
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
        <div className='modaldiv m-4 p-2 rounded-3xl shadow w-[40dvw] bg-(--color-powder-blue)'>
            <div className="lg:text-2xl font-medium pb-2 sm:text-sm text-[--color-royal-blue]">{props.name?.split(' ')[0]}'s Projects</div>
            <div className="modaldiv-content flex flex-col gap-2">
                <button type="button" onClick={() => handleShow()}
                    className='p-2 rounded-xl duration-500 border border-[--color-royal-blue] text-[(--color-royal-blue)] hover:bg-(--color-royal-blue) hover:text-white' >
                    Tambahkan Project
                    <i className="bi bi-plus mx-2"></i>
                </button>
                {project.map((a) => {
                    return (
                        <div className="p-2 rounded-2xl shadow flex gap-2 notdiv flex-col bg-white">
                            <div className="bg-(--color-royal-blue) text-white p-2 rounded-lg gap-4 lg:flex-row sm:flex-col lg:items-center">
                                <div>
                                    <span>your's {a?.data?.name} </span>
                                    <span className='text-xs font-extralight'>as</span>
                                    <Link to={`/${id}/category/${a?.category?.slug}`} className='mx-2 underline'>{a?.category?.name}</Link>
                                </div>
                                <button type='button' className='p-1 bg-red-600 text-white rounded hover:opacity-75' onClick={() => handleDelete(a?.id)}>
                                    Delete <i className='bi bi-trash mx-2'></i>
                                </button>
                            </div>
                            <div className="flex notdiv gap-2">
                                <div className="projectImgBox">
                                    <img src={a?.data?.owner?.avatar_url} alt="" className='projectIconImg aspect-square rounded-xl' />
                                </div>
                                <div className="flex flex-col notdiv max-w-[60%]">
                                    <div>
                                        <a href={a?.data?.owner?.html_url} className='duration-200 hover:underline '>
                                            {a?.data?.owner?.login}
                                        </a>
                                        <span className=''>
                                            /{a?.data?.name}
                                        </span>
                                    </div>
                                    <div className='flex justify-center flex-col'>
                                        <span>Language  :</span>
                                        <div className='flex gap-2 items-center'>
                                            <span>{a?.data?.language}</span>
                                            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${a?.data?.language?.toLowerCase()}/${a?.data?.language?.toLowerCase()}-original.svg`} alt="" className='w-6' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span>{a?.data?.pushed_at?.split('T')[0]} at {a?.data?.pushed_at?.split('T')[1].split('Z')[0]}</span>
                            {/* <span>{a?.created_at}</span> */}
                            {/* <span>{a?.updated_at}</span> */}
                        </div>
                    )
                })}
            </div>
            {show && (
                <div className='modalGallery modalGalleryAdd bg-white fixed rounded-xl shadow-lg p-2 flex flex-col justify-between gap-2'>
                    <div className="flex gap-2 justify-start specialFlex">
                        <label htmlFor="">Masukkan Link Github <br />
                            <input id='project' type="text" placeholder='https://github.com/dedyasxkaguya/dedyasmon-be' className='p-2 rounded-lg border w-[60dvw]' />
                        </label>
                    </div>
                    <select name="" id="category" className='p-2 rounded-lg border'>
                        <option value="kategori">Kategori</option>
                        {cat.map((c)=>{
                            return(
                                <option value={c?.id}>{c?.name}</option>
                            )
                        })}
                    </select>
                    <button type="button" className='p-2 rounded-lg bg-(--color-royal-blue) text-white' onClick={() => handlePost()}>Kirim</button>
                </div>
            )}
        </div>
    )
}

export default Projects