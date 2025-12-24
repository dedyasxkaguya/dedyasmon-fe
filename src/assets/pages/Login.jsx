import React from 'react'
import Input from '../components/Input'
import bgrpl from '../../../public/bgrpl.jpg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Login = () => {

    const handleLogin = () => {
        const formData = new FormData();

        // const nameElem = document.getElementById('name')
        const emailElem = document.getElementById('email')
        const passwordElem = document.getElementById('password')

        const data = {
            // 'name': nameElem.value,
            'email': emailElem.value,
            'password': passwordElem.value
        }

        console.log(data)

        // formData.append('name', nameElem.value)
        formData.append('email', emailElem.value)
        formData.append('password', passwordElem.value)

        axios.post('http://127.0.0.1:8000/api/user/login', formData)
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                if(fetched.status){
                    Swal.fire({
                        icon:'success',
                        title:'Berhasil',
                        text:'Mengarahkan ke home dalam 2 detik',
                        showConfirmButton:false
                    })
                    setTimeout(() => {
                        location.href=`/${fetched.user.slug}/home`
                    }, 2000);
                    
                    return
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Gagal',
                        text:fetched.text,
                        confirmButtonText:'Try again'
                    })
                }
            })
    }

    return (
        <main className='h-dvh flex font-["Raleway"]'>
            <div id="left" className='h-dvh w-[60dvw] bg-blue-950 flex justify-center items-center fixed left-0'>
                <div className="flex flex-col text-neutral-50">
                    <span className='text-9xl font-semibold'>X-RPL</span>
                    <span className='text-3xl'>Rekayasa Perangkat Lunak</span>
                    <span className='text-4xl font-extralight text-black bg-neutral-50 text-center'>SMKN1 2025-2028</span>
                </div>

                <img src={bgrpl} alt="" className='h-dvh opacity-5 object-cover absolute' />
            </div>
            <div id="right" className='h-dvh w-[40dvw] bg-blue-100 flex flex-col justify-center items-center z-10 fixed right-0'>
                <form className="flex border rounded-3xl p-4 flex-col gap-2 bg-blue-950 text-neutral-50 w-80">
                    <span className='text-xl font-semibold'>Login</span>
                    <span className='text-sm font-light'>Welcome back to dedyasmon</span>
                    <br />
                    <div className="flex flex-col gap-4">
                        {/* <Input id='name' type="text" name='Username' /> */}
                        <Input id='email' type="email" name='Email' />
                        <Input id='password' type="password" name='Password' />
                        <Link to={'/register'} className='text-sm underline'>New?register now</Link>
                        <button type="button" id='btn'
                            className='p-2 rounded-xl border duration-500 border-neutral-50 hover:bg-neutral-50 hover:text-neutral-800' 
                            onClick={() => handleLogin()}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login