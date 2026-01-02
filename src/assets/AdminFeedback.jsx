import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminFeedback = () => {
    const [isTipe, setTipe] = useState('ulasan')
    const [feeds, setFeeds] = useState([])
    const [isUlasanButton, setUlasanButton] = useState(false)
    const [isBugButton, setBugButton] = useState(false)
    const [isDataButton, setDataButton] = useState(false)
    const [isFiturButton, setFiturButton] = useState(false)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/feedbacks')
            .then(data => {
                const fetched = data.data
                setFeeds(fetched)
                setTipe('all')
                setUlasanButton(false)
                setBugButton(false)
                setDataButton(false)
                setFiturButton(false)
            })
    }, [])
    const handleUlasan = () => {
        console.log('ulasan')
        setUlasanButton(true)
        setBugButton(false)
        setDataButton(false)
        setFiturButton(false)
        setTipe('ulasan')
    }
    const handleData = () => {
        console.log('data')
        setUlasanButton(false)
        setBugButton(false)
        setDataButton(true)
        setFiturButton(false)
        setTipe('data')
    }
    const handleBug = () => {
        console.log('bug')
        setUlasanButton(false)
        setBugButton(true)
        setDataButton(false)
        setFiturButton(false)
        setTipe('bug')
    }
    const handleFitur = () => {
        console.log('fitur')
        setUlasanButton(false)
        setBugButton(false)
        setDataButton(false)
        setFiturButton(true)
        setTipe('saran')
    }
    const handleReset = () => {
        setUlasanButton(false)
        setBugButton(false)
        setDataButton(false)
        setFiturButton(false)
        setTipe('all')
    }
    return (
        <div className="p-4">
            <div className='shadow w-[80dvw] bg-(--color-powder-blue) rounded-3xl p-2'>
                <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                    Admin Feedback
                </div>
                <div className="p-2 rounded-2xl bg-white text-(--color-royal-blue) my-2 flex justify-between items-center">
                    <span>
                        Filter feedbaack
                    </span>
                    <div className="flex gap-2">
                        <button onClick={() => handleReset()}
                            className={`p-1 px-2 duration-300 rounded-xl text-(--color-royal-blue) hover:underline`}>
                            Reset
                        </button>
                        <button onClick={() => handleUlasan()}
                            className={`p-1 px-2 duration-300 rounded-xl border border-(--color-royal-blue) 
                            ${isUlasanButton ? 'bg-(--color-royal-blue) text-white' : ''} hover:bg-(--color-royal-blue) hover:text-white`}>
                            Ulasan
                            <i className='bi bi-chat mx-2'></i>
                        </button>
                        <button onClick={() => handleBug()}
                            className={`p-1 px-2 duration-300 rounded-xl border border-(--color-royal-blue) 
                            ${isBugButton ? 'bg-(--color-royal-blue) text-white' : ''} hover:bg-(--color-royal-blue) hover:text-white`}>
                            Bug
                            <i className='bi bi-bug mx-2'></i>
                        </button>
                        <button onClick={() => handleData()}
                            className={`p-1 px-2 duration-300 rounded-xl border border-(--color-royal-blue) 
                            ${isDataButton ? 'bg-(--color-royal-blue) text-white' : ''} hover:bg-(--color-royal-blue) hover:text-white`}>
                            Data
                            <i className='bi bi-database mx-2'></i>
                        </button>
                        <button onClick={() => handleFitur()}
                            className={`p-1 px-2 duration-300 rounded-xl border border-(--color-royal-blue) 
                            ${isFiturButton ? 'bg-(--color-royal-blue) text-white' : ''} hover:bg-(--color-royal-blue) hover:text-white`}>
                            Fitur
                            <i className='bi bi-lightbulb mx-2'></i>
                        </button>

                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {feeds.map((f) => {
                        let type = f.isUlasan ? 'Ulasan' : f.isBug ? 'Bug' : f.isData ? 'Data' : 'Saran'
                        if (type.toLowerCase() == isTipe) {
                            if (f.isUlasan) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-chat-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Ulasan Website</span>
                                            </div>
                                        </div>
                                        <span className='text-yellow-400'>
                                            {'★'.repeat(f.rating)}
                                            {'☆'.repeat(5 - f.rating)}
                                        </span>
                                        <p className='font-light'>{f.text_ulasan}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isBug) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-bug-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Keluhan Bug</span>
                                            </div>
                                        </div>
                                        <p>Bug terjadi pada halaman {f.page_bug}</p>
                                        <p className='font-light'>{f.text_bug}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isData) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-database-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Keluhan Kesalahan Data</span>
                                            </div>
                                        </div>
                                        <p><span className='font-light'>Data oleh siswa</span> : {f.siswa.name}</p>
                                        <p><span className='font-light'>Kolum data yang salah</span> : {f.collumn_wrong}</p>
                                        <p><span className='font-light'>Value yang salah</span> : {f.data_wrong}</p>
                                        <p><span className='font-light'>Value yang benar</span> : {f.data_right}</p>

                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isSaran) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-lightbulb-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Saran Untuk Website</span>
                                            </div>
                                        </div>
                                        <p>Saran fitur untuk halaman {f.page_fitur}</p>
                                        <p className='font-light'>{f.text_fitur}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}

                                    </div>
                                )
                            }
                        } else if (isTipe == 'all') {
                            if (f.isUlasan) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-chat-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Ulasan Website</span>
                                            </div>
                                        </div>
                                        <span className='text-yellow-400'>
                                            {'★'.repeat(f.rating)}
                                            {'☆'.repeat(5 - f.rating)}
                                        </span>
                                        <p className='font-light'>{f.text_ulasan}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isBug) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-bug-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Keluhan Bug</span>
                                            </div>
                                        </div>
                                        <p>Bug terjadi pada halaman {f.page_bug}</p>
                                        <p className='font-light'>{f.text_bug}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isData) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-database-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Keluhan Kesalahan Data</span>
                                            </div>
                                        </div>
                                        <p><span className='font-light'>Data oleh siswa</span> : {f.siswa.name}</p>
                                        <p><span className='font-light'>Kolum data yang salah</span> : {f.collumn_wrong}</p>
                                        <p><span className='font-light'>Value yang salah</span> : {f.data_wrong}</p>
                                        <p><span className='font-light'>Value yang benar</span> : {f.data_right}</p>

                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}
                                    </div>
                                )
                            } else if (f.isSaran) {
                                return (
                                    <div className="p-2 rounded-2xl bg-white font-medium">
                                        <div className="flex gap-2 items-center">
                                            <i
                                                className="bi bi-lightbulb-fill text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
                                            <div className="flex flex-col">
                                                <h1 className='font-light text-sm'>@{f.user.username} <span className='text-xs'>{f.formatted_date}</span></h1>
                                                <span>Saran Untuk Website</span>
                                            </div>
                                        </div>
                                        <p>Saran fitur untuk halaman {f.page_fitur}</p>
                                        <p className='font-light'>{f.text_fitur}</p>
                                        {/* <p className="text-ultralight text-xs">{f.formatted_date}</p> */}

                                    </div>
                                )
                            }
                        } else {
                            return
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminFeedback