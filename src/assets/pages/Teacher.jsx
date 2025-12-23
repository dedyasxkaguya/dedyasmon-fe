import axios from 'axios'
import React, { useEffect,  } from 'react'
import Dashboard0 from './Dashboard0'
import Students from './Students'
import Teachers from './Teachers'

const Teacher = () => {
    // const [siswa, setSiswa] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/teachers')
            .then(data => {
                const fetched = data.data
                console.log(fetched)
            })
        // setTimeout(() => {
        //     axios.get('http://127.0.0.1:8000/api/students/min')
        //         .then(data => {
        //             const fetched = data.data
        //             console.log(fetched)
        //             setSiswa(fetched)
        //         })
        // }, 1000);
    }, [])
    return (
        <>
            <div className="flex w-dvw pe-8 font-['Raleway']">
                <Dashboard0 />
                <main className='p-4 w-full'>
                    <p className='text-2xl my-2'>Kelas X-RPL 2025-2026</p>
                    <div className="flex gap-8 specialFlex">
                        <Students />
                        <Teachers />
                    </div>
                </main>
            </div>
        </>
    )
}

export default Teacher