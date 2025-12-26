import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Projects = (props) => {
    const { id } = useParams()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState()
    const [project, setProject] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
            .then(data => {
                const fetched = data.data
                setUser(fetched)
                setProject(fetched.projects)
                console.log(fetched.projects)
            })
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
            axios.get(github_link, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Accept': 'application/json'
                }
            }).then(data => {
                const fetched = data.data
                console.log(fetched)
                const formData = new FormData()
                formData.append('data', JSON.stringify(fetched))
                formData.append('user_id', user?.id)
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
        <div className='modaldiv m-4 p-2 rounded-2xl shadow w-[40dvw]'>
            <div className="text-2xl font-medium pb-2">{props.name}'s Projects</div>
            <button type="button" onClick={() => handleShow()}
                className='p-2 rounded-xl duration-500 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white' >
                Tambahkan Project
                <i className="bi bi-plus mx-2"></i>
            </button>
            {project.map((a) => {
                return(

                    <div className="p-2 rounded-2xl shadow flex gap-2 notdiv flex-col">
                    <div className="bg-black text-white p-2 rounded-lg">
                        <span>@{a?.user?.username}'s {a?.data?.name}</span>
                        <a className='p-1 bg-red-600 text-white rounded mx-2 hover:opacity-75' onClick={() => handleDelete(a?.id)}>
                            Delete <i className='bi bi-trash  mx-2'></i></a>
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
                            <div className='flex items-center gap-2'>
                                <span>Bahasa yang digunakan : {a?.data?.language} </span>
                                <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${a?.data?.language?.toLowerCase()}/${a?.data?.language?.toLowerCase()}-original.svg`} alt="" className='w-6' />
                            </div>
                        </div>
                    </div>
                    <span>{a?.data?.pushed_at?.split('T')[0]} at {a?.data?.pushed_at?.split('T')[1].split('Z')[0]}</span>
                </div>
                )
            })}
            {show && (
                <div className='modalGallery modalGalleryAdd bg-white fixed rounded-xl shadow-lg p-2 flex flex-col justify-between gap-2'>
                    <div className="flex gap-2 justify-start specialFlex">
                        <label htmlFor="">Masukkan Link Github <br />
                            <input id='project' type="text" placeholder='https://github.com/dedyasxkaguya/dedyasmon-be' className='p-2 rounded-lg border w-[60dvw] text-xs' />
                        </label>
                    </div>
                    <button type="button" className='p-2 rounded-lg bg-black text-white text-xs' onClick={() => handlePost()}>Kirim</button>
                </div>
            )}
        </div>
    )
}

export default Projects