import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Students = () => {
    const [siswa, setSiswa] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/students/min')
            .then(data => {
                const fetched = data.data
                setSiswa(fetched)
            })
    }, [])
    return (
        <div className="p-2 rounded-2xl border w-[40dvw] modaldiv shadow bg-(--color-powder-blue)">
            <p className='p-2 text-xl bg-(--color-royal-blue) rounded-xl text-white'>Anggota Kelas</p>
            <div className="flex gap-4 flex-col my-4 modaldiv-content py-1">
                {siswa.map((s) => {
                    return (
                        <div className="flex justify-between p-2 rounded-xl shadow border border-(--color-royal-blue)">
                            <div className="flex items-center">
                                <div className='bg-(--color-royal-blue) rounded-full text-white circleid text-center'>
                                    {s.id}
                                </div>
                                <span className='mx-2'>{s.name}</span>
                            </div>
                            <span>{s.nis}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Students