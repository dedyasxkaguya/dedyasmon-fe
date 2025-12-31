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
                                    <h1>{f.id}</h1>
                                    <span>Ulasan Website</span>
                                    <p className='font-light'>{f.text_ulasan}</p>
                                </div>
                            )
                        } else if (f.isBug) {
                            return (
                                <div className="p-2 rounded-2xl bg-white font-medium">
                                    <h1>{f.id}</h1>
                                    <span>Keluhan Bug</span>
                                    <p className='font-light'>{f.text_bug}</p>
                                </div>
                            )
                        } else if (f.isData) {
                            return (
                                <div className="p-2 rounded-2xl bg-white font-medium">
                                    <h1>{f.id}</h1>
                                    <span>Keluhan Kesalahan Data</span>
                                    <p></p>

                                </div>
                            )
                        } else if (f.isSaran) {
                            return (
                                <div className="p-2 rounded-2xl bg-white font-medium">
                                    <h1>{f.id}</h1>
                                    <span>Saran Untuk Website</span>
                                    <p className='font-light'>{f.text_fitur}</p>

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