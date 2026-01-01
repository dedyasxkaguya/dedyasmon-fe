import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminFeedback = () => {
    const [feeds, setFeeds] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/feedbacks')
            .then(data => {
                const fetched = data.data
                setFeeds(fetched)
            })
    }, [])
    return (
        <div className="p-4">
            <div className='shadow w-[80dvw] bg-(--color-powder-blue) rounded-3xl p-2'>
                <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                    Admin Feedback
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    {feeds.map((f) => {
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
                                        {'★'.repeat(f.rating) }
                                        {'☆'.repeat(5 - f.rating) }
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
                                            className="bi bi-server text-3xl bg-(--color-royal-blue) text-white p-2 rounded-xl"></i>
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
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminFeedback