import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import Profil from './Profil'
import Aos from 'aos'
import Gallery from './Gallery'
import axios from 'axios'
import GalleryMinimalist from '../components/GalleryMinimalist'

const Dashboard = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    const [isshow, setShow] = useState('false')
    const [isLeft, setLeft] = useState('-left-100')
    useEffect(() => {
        Aos.init({
            duration: 1000
        })
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
            .then(data => {
                const fetched = data.data
                setUser(fetched)
            })
    }, [])
    let isSiswa
    if (user?.role !== 'SISWA') {
        isSiswa = 'none'
    }
    const handleClick = () => {
        if (!isshow) {
            setLeft('left-0')
            setShow(!isshow)
        } else {
            setLeft('-left-100')
            setShow(!isshow)
        }
    }
    return (
        <>
            <Navbar func={() => handleClick()} />
            <main className='flex' data-aos="fade-up">
                <div className="
                sideBar p-4 bg-(--color-royal-blue) h-dvh dashboard dashboardDeks text-neutral-50 font-['Raleway'] flex flex-col justify-between fixed left-0 bottom-0">
                    <main>
                        {/* <p className='pb-8'>@Dedyasmon {id}</p> */}
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Dashboard</span>
                            <Buttons title='Profil' icon='person-fill' link='' />
                            <Buttons title='Projek' icon='list-task' link='/projects' />
                        </div>
                        <div className='flex flex-col gap-2 my-4' style={{ display: isSiswa }}>
                            <span className="font-extralight text-sm">Informasi Kelas</span>
                            <Buttons title='Pelajaran' icon='bookmark' link='' />
                            <Buttons title='Kelas' icon='backpack2' link='/teachers' />
                            <Buttons title='Galeri' icon='images' link='/gallery' />
                        </div>
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Service Support</span>
                            <Link target='_blank'
                                to='https://github.com/dedyasxkaguya' className='duration-500 font-light text-lg rounded-xl p-1 px-2 hover:bg-neutral-50 hover:text-neutral-800'>
                                <i className={`bi bi-github mx-2`}></i>
                                Author
                            </Link>
                            <Buttons title='Feedback' icon='chat-left' link='/feedback' />
                        </div>
                    </main>
                    <div className="flex flex-col gap-4">
                        <button type="button"
                            className='p-2 rounded-xl border duration-300 border-neutral-50 text-neutral-50 hover:bg-neutral-50 hover:text-neutral-800 text-start'>
                            Light Mode
                            <i className='bi bi-sun mx-2'></i>
                        </button>
                        <div className="p-2 rounded-xl bg-neutral-50 text-neutral-900">
                            <p className='font-semibold text-lg truncate'>{user?.name}</p>
                            <span className='font-light text-xs'>{user?.role}</span>
                        </div>
                    </div>
                </div>
                <div className={` transition-all transition-discrete duration-500
                sideBar p-4 bg-(--color-royal-blue) h-dvh dashboardMobile text-neutral-50 font-['Raleway'] flex flex-col justify-between fixed ${isLeft} bottom-0`}>
                    <main>
                        {/* <p className='pb-8'>@Dedyasmon {id}</p> */}
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Dashboard</span>
                            <Buttons title='Profil' icon='person-fill' link='/home' />
                            <Buttons title='Projek' icon='list-task' link='/projects' />
                        </div>
                        <div className='flex flex-col gap-2 my-4' style={{ display: isSiswa }}>
                            <span className="font-extralight text-sm">Informasi Kelas</span>
                            <Buttons title='Pelajaran' icon='bookmark' link='' />
                            <Buttons title='Kelas' icon='backpack2' link='/teachers' />
                            <Buttons title='Galeri' icon='images' link='/gallery' />
                        </div>
                        <div className='flex flex-col gap-2 my-4'>
                            <span className="font-extralight text-sm">Service Support</span>
                            <Link target='_blank'
                                to='https://github.com/dedyasxkaguya' className='duration-500 font-light text-lg rounded-xl p-1 px-2 hover:bg-neutral-50 hover:text-neutral-800'>
                                <i className={`bi bi-github mx-2`}></i>
                                Author
                            </Link>
                            <Buttons title='Feedback' icon='chat-left' link='/feedback' />
                        </div>
                    </main>
                    <div className="flex flex-col gap-4">
                        <button type="button"
                            className='p-2 rounded-xl border duration-300 border-neutral-50 text-neutral-50 hover:bg-neutral-50 hover:text-neutral-800 text-start'>
                            Light Mode
                            <i className='bi bi-sun mx-2'></i>
                        </button>
                        <div className="p-2 rounded-xl bg-neutral-50 text-neutral-900">
                            <p className='font-semibold text-lg truncate'>{user?.name}</p>
                            <span className='font-light text-xs'>{user?.role}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Profil />
                    <GalleryMinimalist />
                    {/* <ShowGallery /> */}

                </div>
            </main>
        </>
    )
}

export default Dashboard