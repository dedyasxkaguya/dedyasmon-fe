import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const LeaderboardGuru = () => {
    const { id } = useParams()
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/teachers')
            .then(data => {
                const fetched = data.data
                setTeachers(fetched)
                // console.log(fetched)
            })
    }, [])
    const sortTeachers = teachers.sort((a,b)=>b.rating - a.rating)
    console.log(sortTeachers)
    return (
        <div className="modaldiv p-2 rounded-2xl shadow w-[40dvw]">
            <div className="bg-black rounded-xl text-white p-2">
                Leaderboard Guru
            </div>
            <div className="flex flex-col gap-2 modaldiv-content p-2">
                {sortTeachers.map((t) => {
                    const decimal = (t.rating-Math.floor(t.rating))
                    return (
                        <div className="flex justify-between p-2 rounded-xl shadow">
                            <Link to={`/${id}/teacher/${t.id}`} className='hover:underline duration-300'>{t.name}</Link>
                            <span>
                                <span className='mx-2 text-center'>{t.rating}</span>
                                <span className='text-yellow-500'>
                                    {'★'.repeat(decimal>=0.5 ? Math.ceil(t.rating) : Math.floor(t.rating))}
                                    {'☆'.repeat(5 - (decimal>=0.5 ? Math.ceil(t.rating):Math.floor(t.rating)))}
                                </span>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LeaderboardGuru