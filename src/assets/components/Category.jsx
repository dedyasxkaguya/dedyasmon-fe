import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
    const { id, slug } = useParams()
    const [cat, setCat] = useState()
    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/category/${slug}`)
            .then(data => {
                const fetched = data.data
                setCat(fetched)
                setTimeout(() => {
                    axios.get(`http://127.0.0.1:8000/api/project/category/${fetched?.id}`)
                        .then(data => {
                            const fetchedProjects = data.data
                            setProjects(fetchedProjects)
                        })
                }, 1000);
            })
    }, [])
    return (
        <div className='modaldiv shadow w-[40dvw] bg-(--color-powder-blue) rounded-3xl p-2'>
            <div className='bg-(--color-royal-blue) p-2 rounded-2xl text-white'>{cat?.name}</div>
            <div className="modaldiv-content flex flex-col gap-2 mt-2">
                {
                    projects.length >= 1 ? projects.map((a) => {
                        return (
                            <div className="p-2 rounded-2xl shadow flex gap-2 notdiv flex-col bg-white">
                                <div className="bg-(--color-royal-blue) text-white p-2 rounded-lg gap-4 lg:flex-row sm:flex-col lg:items-center">
                                    <div>
                                        <span>{a?.user?.username}'s {a?.data?.name} </span>
                                        <span className='text-xs font-extralight'>as</span>
                                        <Link to={`/${id}/category/${a?.category?.slug}`} className='mx-2 underline'>{a?.category?.name}</Link>
                                    </div>
                                    {/* <button type='button' className='p-1 bg-red-600 text-white rounded hover:opacity-75' onClick={() => handleDelete(a?.id)}>
                                        Delete <i className='bi bi-trash mx-2'></i>
                                    </button> */}
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
                            </div>
                        )
                    }) : (
                        <>
                            <p className='p-2'>Belum ada project kategori {cat?.name}</p>
                            <Link to={`/${id}/projects`} className='mx-2 p-2 bg-(--color-royal-blue) text-white rounded-xl w-fit duration-500 hover:opacity-75'>
                                <i className='bi bi-chevron-left me-2'></i>
                                Kembali 
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Category