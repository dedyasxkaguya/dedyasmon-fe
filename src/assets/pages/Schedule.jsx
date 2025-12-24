import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Schedule = () => {
    const [schedule, setSchedule] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/schedules')
            .then(data => {
                const fetched = data.data
                setSchedule(fetched)
                console.log(fetched)
            })
    }, [])
    return (
        <div className="modaldiv p-2 rounded-2xl shadow w-[40dvw]">
            <div className="bg-black rounded-xl text-white p-2">
                Jadwal Pelajaran
            </div>
            <div className="flex py-2 gap-2 justify-between modaldiv-content">
                {schedule.map((s) => {
                    return (
                        <div
                            className=
                            'flex flex-col rounded-lg shadow-md cursor-pointer delay-500 relative duration-300 hover:bottom-1 mb-4'>
                            <span className='p-2 uppercase text-center font-medium'>{s?.day}</span>
                            <span className='p-2 font-light border-t bg-black text-white text-center text-xs'>Mapel</span>
                            <span className='p-2 font-light border-t text-sm'>
                                {s?.subject_0?.name}
                            </span>
                            <span className='p-2 font-light border-t text-sm'>
                                {s?.subject_1?.name}
                            </span>
                            <span className='p-2 font-light border-t text-sm'>
                                {s?.subject_2?.name}
                            </span>
                            <span className='p-2 font-light border-t text-sm'>
                                {s?.subject_3?.name ? s?.subject_3?.name : '-'}
                            </span>
                            <span className='p-2 font-light border-t bg-black text-white text-center text-xs'>Seragam</span>
                            <span className='p-2 font-light border-t text-sm'>{s?.uniform}</span>
                            <span className='p-2 font-light border-t bg-black text-white text-center text-xs'>Wearpack</span>
                            <span className='p-2 font-light text-sm border-t'>{s?.wearpack ? "Pakai ☑" : "Tidak ☒"}</span>
                            <span className='p-2 font-light border-t bg-black text-white text-center text-xs'>Pembiasaan</span>
                            <span className='p-2 font-light text-sm border-t capitalize'>
                                {s?.activity[0] ? s?.activity[0].name : s?.activity.name}
                            </span>
                            <span className='p-2 font-light text-sm border-t capitalize'>
                                {s?.activity[1] ? s?.activity[1].name : '-'}
                            </span>
                            <span className='p-2 font-light text-sm border-t capitalize'>
                                {s?.activity[2] ? s?.activity[2].name : '-'}
                            </span>
                            <span className='p-2 font-light text-sm border-t'>:</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Schedule