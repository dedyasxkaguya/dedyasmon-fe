import React, { useState } from 'react'
import Input from '../components/Input'
import bgrpl from '../../../public/bgrpl.jpg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
// import React from 'react'
// import logorpl from '../../../public/rpl.png'

const Register = () => {
    const [isEmailValidate, setEmailValidate] = useState(true)
    const [isPasswordValidate, setPasswordValidate] = useState(true)
    const [isUsernameValidate, setUsernameValidate] = useState(true)
    const handleRegister = () => {
        const formData = new FormData();

        const nameElem = document.getElementById('name')
        const emailElem = document.getElementById('email')
        const passwordElem = document.getElementById('password')

        const data = {
            'name': nameElem.value,
            'email': emailElem.value,
            'password': passwordElem.value
        }

        console.log(data)

        formData.append('name', nameElem.value)
        formData.append('email', emailElem.value)
        formData.append('password', passwordElem.value)
        Swal.fire({
            title: "Wait A second",
            text: 'Fetching API database',
            showConfirmButton: false
        })
        if (nameElem.value && emailElem.value) {
            if (passwordElem.value.length < 8) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Password harus memiliki 8 karakter atau lebih',
                    confirmButtonText: 'Oke, isi kembali'
                    // showConfirmButton: false
                })
                return
            }
            axios.post('http://127.0.0.1:8000/api/user/register', formData)
                .then(data => {
                    const fetched = data.data
                    console.log(fetched)
                    if (fetched.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Mengarahkan ke home dalam 2 detik',
                            showConfirmButton: false
                        })
                        setTimeout(() => {
                            location.href = `/${fetched.data.slug}/home`
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.data.message.toLowerCase().includes('duplicate')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Email tersebut sudah digunakan, gunakan email lain',
                            // showConfirmButton: false,
                            footer: err
                        })
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Gagal Registrasi, coba lagi atau hubungi admin',
                            // showConfirmButton: false,
                            footer: err.response.data.message
                        })
                    }

                })
                .finally(a => {
                    console.log(a)
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Terdapat kesalahan di database, coba hubungi admin',
                        showConfirmButton: false,
                        toast: true,
                        timer:3000,
                        timerProgressBar:true
                    })
                })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Pastikan isi semua form',
                confirmButtonText: 'Oke, isi kembali'
            })
        }
    }
    const handleUsernameChange = (e) => {
        const email = e.target.value
        console.log(email.includes('@') || email.includes('.com') || email.includes('.id'))
        setUsernameValidate(!email.includes(' '))
    }
    const handleEmailChange = (e) => {
        const email = e.target.value
        console.log(email.includes('@') || email.includes('.com') || email.includes('.id'))
        setEmailValidate(email.includes('@') || email.includes('.com') || email.includes('.id'))
    }
    const handlePasswordChange = (e) => {
        const len = e.target.value.length
        setPasswordValidate(len >= 8 ? true : false)
    }
    return (
        <main className='h-dvh flex font-["Raleway"] flex-row-reverse'>
            <div id="left0" className='h-dvh w-[60dvw] bg-(--color-royal-blue) flex justify-center items-center fixed'>
                <div className="flex flex-col text-neutral-50">
                    {/* <img src={logorpl} alt="" /> */}
                    <span className='text-9xl font-semibold'>X-RPL</span>
                    <span className='text-3xl'>Rekayasa Perangkat Lunak</span>
                    <span className='text-4xl font-extralight text-black bg-neutral-50 text-center'>SMKN1 2025-2028</span>
                </div>

                <img src={bgrpl} alt="" className='h-dvh opacity-5 object-cover absolute' />
            </div>
            <div id="right0" className='h-dvh w-[40dvw] bg-(--color-powder-blue) flex flex-col justify-center items-center z-10 fixed left-0'>
                <form className="flex border rounded-3xl p-4 flex-col gap-2 bg-(--color-royal-blue) text-neutral-50">
                    <span className='text-xl font-semibold'>Register</span>
                    <span className='text-sm font-light'>You need an account to access Dedyasmon</span>
                    <br />
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Input id='name' type="text" name='Username' func={(e)=>handleUsernameChange(e)} />
                            {!isUsernameValidate && (
                                <span className='text-xs font-light text-red-500 mx-2'>
                                    <i className='bi bi-exclamation-circle me-2'></i>
                                    Username tidak boleh memiliki spasi
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input id='email' type="email" name='Email' func={(e)=>handleEmailChange(e)}/>
                            {!isEmailValidate && (
                                <span className='text-xs font-light text-red-500 mx-2'>
                                    <i className='bi bi-exclamation-circle me-2'></i>
                                    Pastikan email sesuai
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input id='password' type="password" name='Password' func={(e)=>handlePasswordChange(e)}/>
                            {!isPasswordValidate && (
                               <span className='text-xs font-light text-red-500 mx-2'>
                                    <i className='bi bi-exclamation-circle me-2'></i>
                                    Password harus memiliki 8 karakter
                                </span> 
                            )}
                        </div>
                        <Link to={'/'} className='text-sm underline'>Already have an account</Link>
                        <button type="button" id='btn'
                            className='p-2 rounded-xl border duration-500 border-neutral-50 hover:bg-neutral-50 hover:text-neutral-800'
                            onClick={() => handleRegister()}>
                            Register
                        </button>
                    </div>
                </form>
                <img src={bgrpl} alt="" id='leftimg' className='fixed -bottom-15 -z-10 opacity-5 mobileOnly' />
                <div className="w-[160dvw] h-[120dvw] bg-blue-950 rounded-[100%] -z-20 fixed -bottom-75 opacity-80 mobileOnly"></div>
            </div>
        </main>
    )
}

export default Register