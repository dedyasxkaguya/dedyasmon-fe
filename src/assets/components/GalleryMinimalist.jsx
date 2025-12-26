import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const GalleryMinimalist = () => {
    const { id } = useParams()
    const [gallery, setGallery] = useState([])
    const [show, setShow] = useState(false)
    const [showBlyat, setShowBlyat] = useState(false)
    // const [url, setURL] = useState('')
    const [obj, setObj] = useState({ src: '', text: '', user: '' })
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/photos')
            .then(data => {
                const fetched = data.data
                setGallery(fetched)
            })
    }, [])
    const handleClose = () => {
        console.log(show)
        if (show || showBlyat) {
            setShow(false)
            setShowBlyat(false)
            setObj({ src: '', text: '' })
            document.getElementById('main').style.opacity = 1
        }
    }
    const handleImage = (e) => {
        document.getElementById('main').style.opacity = .2
        const text = e.target.nextElementSibling.innerText
        const user = e.target.nextElementSibling.nextElementSibling.innerText
        const src = e.target.src
        setShow(true)
        setObj({ src: src, text: text, user: user })
    }
    // const handleAdd = () => {
    //     setShowBlyat(true)
    // }
    // const handleUrl = (e) => {
    //     const files = e.target.files
    //     setURL(URL.createObjectURL(files[0]))
    // }
    // const handlePost = () => {
    //     const file = document.getElementById('file').files[0]
    //     const title = document.getElementById('title').value
    //     console.log(file)
    //     if (id, title, file) {
    //         const formData = new FormData()
    //         formData.append('user', id)
    //         formData.append('image', file)
    //         formData.append('title', title)
    //         axios.post('http://127.0.0.1:8000/api/photo/add', formData)
    //             .then(data => {
    //                 const fetched = data.data
    //                 console.log(fetched)
    //             })
    //     }
    // }
    return (
        <>
            <div className="p-2 py-0 modaldiv mb-8" id='main' onClick={() => handleClose()}>
                <div className="p-4 rounded-2xl w-[80dvw] pb-1 ">
                    <Link to={`/${id}/gallery`} className='text-xl font-semibold cursor-pointer hover:underline'>Lihat Galeri</Link>
                    <div className="gallery0 grid gap-4 my-4 rounded-xl">
                        {gallery.map((a) => {
                            if (a.id > 3) {
                                return
                            }
                            return (
                                <div className="rounded-lg overflow-hidden">
                                    <img src={`http://127.0.0.1:8000/${a?.image}`} alt={a}
                                        className='transition-all transition-discrete duration-500 blur-[2px] grayscale-50 hover:blur-none hover:grayscale-0 hover:scale-105 aspect-square object-cover' onClick={(e) => handleImage(e)} />
                                    <span style={{ display: 'none' }}>{a?.title}</span>
                                    <span style={{ display: 'none' }}>{a?.user?.username}</span>
                                </div>
                            )
                        })}
                    </div>
                    {/* <div className="gallery grid gap-4 my-4 rounded-xl">
                        {gallery.map((a) => {
                            if (a.id <= 3) {
                                return
                            }
                            return (
                                <div className="rounded-lg overflow-hidden">
                                    <img src={`http://127.0.0.1:8000/${a?.image}`} alt={a}
                                        className='transition-all transition-discrete duration-500 blur-[2px] grayscale-50 hover:blur-none hover:grayscale-0 hover:scale-105 ' onClick={(e) => handleImage(e)} />
                                    <span style={{ display: 'none' }}>{a?.title}</span>
                                    <span style={{ display: 'none' }}>{a?.user?.username}</span>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>
            {show && (
                <div className='modalGallery bg-white fixed rounded-2xl shadow-lg p-2 flex flex-col justify-between gap-2'>
                    <img src={obj.src} alt="" className='rounded-xl object-contain bg-black' />
                    <div className='flex items-center justify-between gap-2'>
                        <p className='p-2 bg-black text-white w-full rounded-xl truncate text-sm'>@{obj.user} -"{obj.text}"</p>
                        <button type='button' className='p-2 rounded-xl border text-sm flex circleBtn items-center' onClick={() => handleClose()}>
                            <i className='bi bi-x'></i>
                        </button>
                        <a href={obj.src} download className='p-2 rounded-xl border text-sm aspect-square circleBtn flex items-center'>
                            <i className='bi bi-download'></i>
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}

export default GalleryMinimalist