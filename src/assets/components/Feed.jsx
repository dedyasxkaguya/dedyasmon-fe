import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const Feed = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
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
        setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/api/user/${id}`)
                .then(data => {
                    const fetched_user = data.data
                    setUser(fetched_user)
                })
        }, 1000);
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
    const handleSubmit = () => {
        if (user.id) {

            const formData = new FormData()
            const isUlasan = ulasan ? 1 : 0;
            const isBug = bug ? 1 : 0;
            const isData = inputData ? 1 : 0;
            const isSaran = fitur ? 1 : 0;
            const user_id = user?.id;
            const rating = document.getElementById('rating') ? document.getElementById('rating').value : ''
            const text_ulasan = document.getElementById('text_ulasan') ? document.getElementById('text_ulasan').value : ''
            const page_bug = document.getElementById('page_bug') ? document.getElementById('page_bug').value : ''
            const text_bug = document.getElementById('text_bug') ? document.getElementById('text_bug').value : ''
            const siswa_id = document.getElementById('siswa_id') ? document.getElementById('siswa_id').value : ''
            const collumn_wrong = document.getElementById('collumn_wrong') ? document.getElementById('collumn_wrong').value : ''
            const data_wrong = dataSelected ? dataSelected : ''
            const data_right = document.getElementById('data_right') ? document.getElementById('data_right').value : ''
            const page_fitur = document.getElementById('page_fitur') ? document.getElementById('page_fitur').value : ''
            const text_fitur = document.getElementById('text_fitur') ? document.getElementById('text_fitur').value : ''

            formData.append('isUlasan', isUlasan)
            formData.append('isBug', isBug)
            formData.append('isData', isData)
            formData.append('isSaran', isSaran)
            formData.append('user_id', user_id)
            formData.append('rating', rating)
            formData.append('text_ulasan', text_ulasan)
            formData.append('page_bug', page_bug)
            formData.append('text_bug', text_bug)
            formData.append('siswa_id', siswa_id)
            formData.append('collumn_wrong', collumn_wrong)
            formData.append('data_wrong', data_wrong)
            formData.append('data_right', data_right)
            formData.append('page_fitur', page_fitur)
            formData.append('text_fitur', text_fitur)

            console.log({
                'isUlasan': isUlasan,
                'isBug': isBug,
                'isData': isData,
                'isSaran': isSaran,
                'user_id': user_id,
                'rating': rating,
                'text_ulasan': text_ulasan,
                'page_bug': page_bug,
                'text_bug': text_bug,
                'siswa_id': siswa_id,
                'collumn_wrong': collumn_wrong,
                'data_wrong': data_wrong,
                'data_right': data_right,
                'page_fitur': page_fitur,
                'text_fitur': text_fitur
            })
            Swal.fire({
                title:'Wait a second...',
                text:'Fetching our API',
                showConfirmButton:false
            })
            axios.post('http://127.0.0.1:8000/api/feedback/add',formData)
            .then(data=>{
                const fetched = data.data
                console.log(fetched)
                Swal.fire({
                    icon:'success',
                    title:'Berhasil',
                    text:'Terimakasih atas feedback yang kamu berikan !',
                    showConfirmButton:false
                })
                setTimeout(() => {
                    navigation.reload()
                }, 2000);
            })
        }
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
                                <select name="" id="rating" className='p-2 rounded-xl border border-(--color-royal-blue) w-full'>
                                    <option value="pilih" hidden selected>Pilih</option>
                                    <option value="1" >1 ★</option>
                                    <option value="2" >2 ★★</option>
                                    <option value="3" >3 ★★★</option>
                                    <option value="4" >4 ★★★★</option>
                                    <option value="5" >5 ★★★★★</option>
                                </select>
                            </label>

                            <textarea name="" id="text_ulasan" cols="24" rows="8" placeholder='Berikan ulasan kepada developer'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button" onClick={()=>handleSubmit()}
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
                                <select name="" id="page_bug" className='p-2 rounded-xl border border-(--color-royal-blue) w-full' onChange={(e) => handleChange2(e)}>
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
                            <textarea name="" id="text_bug" cols="24" rows="8" placeholder='Deskripsikan bug'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button" onClick={()=>handleSubmit()}
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
                                <select className="p-2 rounded-xl border border-(--color-royal-blue) w-full" 
                                id="siswa_id" onChange={(e) => handleChange0(e)}>
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
                                <select className="p-2 rounded-xl border border-(--color-royal-blue) w-full" 
                                id="collumn_wrong" onChange={(e) => handleChange1(e)}>
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
                                <input type="text" name="" id="data_right" placeholder={dataSelected} className='p-2 rounded-xl border border-(--color-royal-blue) w-full' />
                            </label>
                            <button type="button" onClick={()=>handleSubmit()}
                                className='p-2 duration-500 rounded-xl border border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                Kirim
                            </button>
                        </>
                    )}
                    {fitur && (
                        <>
                            <label htmlFor="">
                                Pilih halaman yang kamu ingin beri saran
                                <select name="" id="page_fitur" className='p-2 rounded-xl border border-(--color-royal-blue) w-full capitalize' onChange={(e) => handleChange3(e)}>
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
                            <span>Fitur seperti apa yang kamu inginkan pada halaman {selectedFitur}</span>
                            <textarea name="" id="text_fitur" cols="24" rows="8" placeholder='Deskripsikan bug'
                                className='p-2 rounded-xl border border-(--color-royal-blue) w-full'></textarea>

                            <button type="button" onClick={()=>handleSubmit()}
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