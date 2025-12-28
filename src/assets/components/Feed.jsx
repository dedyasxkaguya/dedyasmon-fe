import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Feed = () => {
    // ulasan
    const [ulasan, isUlasan] = useState(false)
    //bug
    const [bug, isBug] = useState(false)
    const [selectedBug, setSelectedBug] = useState(false)
    // kesalahan data
    const [inputData, isInputData] = useState(false)
    const [inputDataSiswa, isInputDataSiswa] = useState(false)
    const [siswa, setSiswa] = useState([])
    const [siswaFull, setSiswaFull] = useState()
    const [dataSelected, setDataSelected] = useState('')
    //saran fitur
    const [fitur, isFitur] = useState(false)
    const [selectedFitur, setSelectedFitur] = useState(false)
    const pages = [
        'profil', 'projek', 'pelajaran', 'kelas', 'gallery', 'feedback', 'login', 'register', 'guru', 'Lainnya'
    ]

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/students/min')
            .then(data => {
                const fetched = data.data
                setSiswa(fetched)
            })
    }, [])
    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        if (value == 'data') {
            isInputData(true)
            isBug(false)
            isFitur(false)
            isUlasan(false)
            setSelectedBug(false)
            setSelectedFitur(false)
            isInputDataSiswa(false)
        } else if (value == 'bug') {
            isBug(true)
            isFitur(false)
            isUlasan(false)
            isInputData(false)
            setSelectedFitur(false)
            isInputDataSiswa(false)
        } else if (value == 'ulasan') {
            isUlasan(true)
            isBug(false)
            isFitur(false)
            isInputData(false)
            setSelectedBug(false)
            setSelectedFitur(false)
            isInputDataSiswa(false)
        } else if (value == 'fitur') {
            isFitur(true)
            isBug(false)
            isUlasan(false)
            isInputData(false)
            setSelectedBug(false)
            setSelectedFitur(false)
            isInputDataSiswa(false)
        } else {
            isBug(false)
            isFitur(false)
            isUlasan(false)
            isInputData(false)
            setSelectedBug(false)
            setSelectedFitur(false)
            isInputDataSiswa(false)
        }
    }
    const handleChange0 = (e) => {
        // setIdSiswa(e.target.value)
        axios.get(`http://127.0.0.1:8000/api/student/detail/${e.target.value}/all`)
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                setSiswaFull(fetched)
            })

    }
    const handleChange1 = (e) => {
        isInputDataSiswa(true)
        const collumn = e.target.value
        console.log({ siswaFull })
        console.log(collumn)
        setDataSelected(siswaFull[collumn])
    }
    const handleChange2 = (e) => {
        setSelectedBug(e.target.value)
    }
    const handleChange3 = (e) => {
        setSelectedFitur(e.target.value)
    }
    return (
        <div className="p-4">
            <div className='shadow w-[80dvw] bg-(--color-powder-blue) rounded-3xl p-2'>
                <div className="p-2 rounded-2xl bg-(--color-royal-blue) text-white">
                    Give Feedback
                </div>
                <form action="" className='bg-white rounded-2xl p-2 flex flex-col gap-2 mt-2'>
                    <label htmlFor="" className=''>
                        Pilih jenis feedback
                        <br />
                        <select className="p-2 rounded-xl border border-(--color-royal-blue) w-full" id="" onChange={(e) => handleChange(e)}>
                            <option value='Pilih' hidden selected>Pilih</option>
                            <option value="ulasan">Ulasan</option>
                            <option value="bug">Bug</option>
                            <option value="data">Kesalahan data</option>
                            <option value="fitur">Saran fitur</option>
                        </select>
                    </label>
                    {/* Ulasan */}
                    {ulasan && (
                        <>
                            <label htmlFor="">
                                Berikan Rating
                                <select name="" id="" className='p-2 rounded-xl border border-(--color-royal-blue) w-full'>
                                    <option value="pilih" hidden selected>Pilih</option>
                                    <option value="1" >1 ★</option>
                                    <option value="2" >2 ★★</option>
                                    <option value="3" >3 ★★★</option>
                                    <option value="4" >4 ★★★★</option>
                                    <option value="5" >5 ★★★★★</option>
                                </select>
                            </label>

                            <textarea name="" id="" cols="24" rows="8" placeholder='Berikan ulasan kepada developer'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button"
                                className='p-2 duration-500 rounded-xl border border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                Kirim
                            </button>
                        </>
                    )}

                    {/* Bug */}

                    {bug && (
                        <>
                            {/* <span>Menemukan bug? beritahu kami</span> */}
                            <label htmlFor="">
                                Pilih halaman yang memiliki bug
                                <select name="" id="" className='p-2 rounded-xl border border-(--color-royal-blue) w-full' onChange={(e) => handleChange2(e)}>
                                    <option value="pilih" hidden selected>Pilih</option>
                                    {pages.map((p) => {
                                        return (
                                            <option value={p} className='capitalize'>{p}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </>
                    )}
                    {selectedBug && (
                        <>
                            <span>Bug seperti apa yang kamu temukan pada halaman {selectedBug}</span>
                            <textarea name="" id="" cols="24" rows="8" placeholder='Deskripsikan bug'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button"
                                className='p-2 duration-500 rounded-xl border border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                Kirim
                            </button>
                        </>
                    )}
                    {/* Kesalahan data */}
                    {inputData && (
                        <>
                            <label htmlFor="" className=''>
                                Pilih siswa
                                <br />
                                <select className="p-2 rounded-xl border border-(--color-royal-blue) w-full" id="" onChange={(e) => handleChange0(e)}>
                                    <option value='Pilih' hidden selected>Pilih</option>
                                    {
                                        siswa.map((s) => {
                                            return (
                                                <option value={s?.id}>{s?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label htmlFor="" className=''>
                                Pilih data yang salah
                                <br />
                                <select className="p-2 rounded-xl border border-(--color-royal-blue) w-full" id="" onChange={(e) => handleChange1(e)}>
                                    <option value='Pilih' hidden selected>Pilih</option>
                                    <option value='nis'>NIS</option>
                                    <option value='nisn'>NISN</option>
                                    <option value='name'>NAMA</option>
                                    <option value='asal_sekolah'>Asal Sekolah</option>
                                    <option value='tempat_lahir'>Tempat Lahir</option>
                                    <option value='tanggal_lahir'>Tanggal Lahir</option>
                                    <option value='alamat'>Alamat</option>
                                </select>
                            </label>
                        </>
                    )}
                    {inputDataSiswa && (
                        <>
                            <span className='text-sm font-light opacity-75'>Data sebelumnya : {dataSelected}</span>
                            <label htmlFor="">
                                Masukkan data yang benar
                                <br />
                                <input type="text" name="" id="" placeholder={dataSelected} className='p-2 rounded-xl border border-(--color-royal-blue) w-full' />
                            </label>
                            <button type="button"
                                className='p-2 duration-500 rounded-xl border border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                Kirim
                            </button>
                        </>
                    )}
                    {fitur && (
                        <>
                            <label htmlFor="">
                                Pilih halaman yang kamu ingin beri saran
                                <select name="" id="" className='p-2 rounded-xl border border-(--color-royal-blue) w-full' onChange={(e) => handleChange3(e)}>
                                    <option value="pilih" hidden selected>Pilih</option>
                                    {pages.map((p) => {
                                        return (
                                            <option value={p} className='capitalize'>{p}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </>
                    )}
                    {selectedFitur && (
                        <>
                            <span>Fitur seperti apa yang kamu temukan pada halaman {selectedFitur}</span>
                            <textarea name="" id="" cols="24" rows="8" placeholder='Deskripsikan bug'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button"
                                className='p-2 duration-500 rounded-xl border border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                Kirim
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Feed