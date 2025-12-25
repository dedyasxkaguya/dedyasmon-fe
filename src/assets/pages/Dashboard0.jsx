import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import Profil from './Profil'
import Aos from 'aos'
import axios from 'axios'

const Dashboard0 = () => {
    const { id } = useParams()
    const [user,setUser] = useState()
    useEffect(()=>{
        Aos.init({
            duration:1000
        })
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
        .then(data=>{
            const fetched = data.data
            setUser(fetched)
        })
    },[])
    return (
        <>
            <Navbar />
            <main className='flex fixed left-0 bottom-0' data-aos="fade-up">
                <div className="sideBar p-4 bg-neutral-800 h-dvh w-[24dvh] text-neutral-50 font-['Raleway'] flex flex-col justify-between">
                    <main>
                        <p className='pb-8'>@Dedyasmon {id}</p>
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Dashboard</span>
                            <Buttons title='Profil' icon='person-fill' link='/home' />
                            <Buttons title='Projek' icon='list-task' link='' />
                        </div>
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Informasi Kelas</span>
                            <Buttons title='Pelajaran' icon='bookmark' link='/subjects' />
                            <Buttons title='Kelas' icon='backpack2' link='/teachers' />
                            <Buttons title='Galeri' icon='images' link='/gallery' />
                        </div>
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Service Support</span>
                            <Buttons title='Author' icon='github' link='' />
                            <Buttons title='Feedback' icon='chat-left' link='' />
                        </div>
                    </main>
                    <div className="p-4 rounded-2xl bg-neutral-50 text-neutral-900">
                        {/* <p className='font-semibold text-lg truncate'>Name</p>
                    <span className='font-light text-xs'>NIS</span> */}
                        <p className='font-semibold text-lg truncate'>{user?.name}</p>
                        <span className='font-light text-xs'>{user?.role}</span>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard0