import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Dashboard0 from './Dashboard0'
import axios from 'axios'
import TeacherComment from '../components/Comments/TeacherComment'

const TeacherDetail = () => {
    const { id, teacher } = useParams()
    const [user, setTeacher] = useState()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/teacher/${teacher}`)
            .then(data => {
                const fetched = data.data
                setTeacher(fetched)
            })
    }, [])
    console.log({ id })
    console.log({ teacher })

    let name = user?.name[0] + user?.name[1]
    return (
        <div className='flex'>
            <Dashboard0 />
            <div className="">
                <main className='w-[80dvw] font-["Raleway"] p-8 flex flex-col gap-4' data-aos="fade-up">
                    <div className="bg-neutral-100 shadow-sm p-4 rounded-4xl flex gap-4 items-center">
                        <div className="profile-image w-[6dvw] flex justify-center items-center rounded-full bg-blue-200 text-4xl">
                            {name.toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <div className='text-2xl font-semibold capitalize'>
                                {user?.name}
                            </div>
                            <div className='text-md font-light flex items-center gap-2'>
                                <i className='bi bi-book'></i>
                                Mata Pelajaran : <div className='font-medium'>{user?.subject}</div>
                            </div>
                            <div className='text-md font-light flex items-center gap-2 '>
                                <i className='bi bi-star'></i>
                                Rating : <span className='font-medium'>{user?.rating==0 ? 'Belum menerima rating' : user?.rating}</span>
                            </div>
                            <div className='text-md font-light flex items-center gap-2'>
                                <i className='bi bi-heart'></i>
                                Favorit : <span className='font-medium'>{user?.favorites}</span>
                            </div>
                        </div>
                    </div>
                    <TeacherComment/>
                </main>
            </div>
        </div>
    )
}

export default TeacherDetail