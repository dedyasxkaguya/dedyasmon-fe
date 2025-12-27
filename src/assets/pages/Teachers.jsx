import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Teachers = () => {
    const [guru, setGuru] = useState([])
    const { id } = useParams()
    useEffect(() => {
        setTimeout(() => {
            axios.get('http://127.0.0.1:8000/api/teachers')
                .then(data => {
                    const fetched = data.data
                    setGuru(fetched)
                })
        }, 1000);
    }, [])
    return (
        <div className="p-2 rounded-2xl border w-[40dvw] modaldiv shadow bg-(--color-powder-blue)">
            <p className='p-2 text-xl bg-(--color-royal-blue) rounded-xl text-white'>Guru Kelas</p>
            <div className="flex gap-4 flex-col my-4 modaldiv-content py-1">
                {guru.map((s) => {
                    return (
                        <div className="flex justify-between p-1 rounded-xl shadow border border-(--color-royal-blue)">
                            <div className="flex items-center">
                                <div className='bg-(--color-royal-blue) rounded-full text-white circleid text-center'>
                                    {s.id}
                                </div>
                                <Link to={ `/${id}/teacher/${s.id}` } className='mx-2 duration-300 hover:underline truncate'>{s.name}</Link>
                            </div>
                            <div className="bg-(--color-royal-blue) p-2 w-50 text-white rounded-xl">
                                <span>{s.subject}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Teachers