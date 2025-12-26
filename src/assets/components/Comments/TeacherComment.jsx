import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const TeacherComment = () => {
  const { id, teacher } = useParams()

  const [comments, setComments] = useState([])
  const [teacherID,setTeacher] = useState()
  const [user, setUser] = useState()
  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/api/user/${id}`)
      .then(data => {
        const fetched = data.data
        setUser(fetched)
      })
    setTimeout(() => {
      axios.get(`http://127.0.0.1:8000/api/teacher/${teacher}`)
        .then(data => {
          const fetched = data.data
          setTeacher(fetched)
          setComments(fetched.comments)
        })
    }, 1000);
  }, [])

  const handleSubmit = () => {
    const formData = new FormData();

    const name = user?.username
    const teacher_id = teacherID.id
    const comment = document.getElementById('text')
    const rating = parseFloat(document.getElementById('rating').value)

    if(name && teacher_id && comment.value && rating){
      formData.append('username',name)
      formData.append('teacher_id',teacher_id)
      formData.append('rating',rating)
      formData.append('text',comment.value)

      console.log({
        'name':name,
        'teacher_id':teacher_id,
        'rating':rating,
        'text':comment.value
      })

      axios.post('http://127.0.0.1:8000/api/comment/teacher/add',formData)
      .then(data=>{
        const fetched = data.data
        console.log(fetched)
        Swal.fire({
          icon:'success',
          title:'Berhasil',
          text:'Berhasil menambahkan komentar terhadap ' + teacherID.name + ' memuat halaman dalam dua detik',
          showConfirmButton:false
        })
        setTimeout(() => {
          navigation.reload()
        }, 3000);
      })
    }else{
      Swal.fire({
        icon:'warning',
        title:'Peringatan',
        text:'Komentarmu belum lengkap',
        confirmButtonText:'Lanjutkan mengisi komentar'
      })
    }


  }

  if (comments.length < 1) {
    return (
      <div className='modaldiv p-4 rounded-3xl shadow'>
        <p className='font-semibold text-xl'>TeacherComment</p>
        <div className="flex flex-col gap-4">
          Belum ada komentar
          <div className="flex gap-2 specialFlex">
            <input id='text' type="text" className='p-2 rounded-xl shadow border cursor-pointer w-full' placeholder='Tambahkan Komentar' />
            <select name="" id="rating" className='p-2 rounded-xl border shadow'>
              <option value="rating" selected hidden>Rating</option>
              <option value="1">1 ★</option>
              <option value="2">2 ★★</option>
              <option value="3">3 ★★★</option>
              <option value="4">4 ★★★★</option>
              <option value="5">5 ★★★★★</option>
            </select>
            <button type="button" className='bg-black rounded-xl p-2 text-white' onClick={() => handleSubmit()}>
              Submit</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='p-4 rounded-3xl shadow'>
      <p className='font-semibold text-xl'>TeacherComment</p>
      <div className="flex flex-col gap-4">
        {comments.map((c) => {
          return (
            <div className="rounded-xl shadow p-2">
              <p className='text-neutral-400'>@{c.username} | 
                <span className='text-yellow-400'>{'★'.repeat(c.rating)}</span>
                <span className='text-yellow-400'>{'☆'.repeat(5 - (c.rating))}
</span>
                </p>
              <span>{c.text}</span>
            </div>
          )
        })}
        <div className="flex gap-2 specialFlex">
          <input id='text' type="text" className='p-2 rounded-xl shadow border cursor-pointer w-full' placeholder='Tambahkan Komentar' />
          <select name="" id="rating" className='p-2 rounded-xl border shadow'>
            <option value="rating" selected hidden>Rating</option>
            <option value="1">1 ★</option>
            <option value="2">2 ★★</option>
            <option value="3">3 ★★★</option>
            <option value="4">4 ★★★★</option>
            <option value="5">5 ★★★★★</option>
          </select>
          <button type="button" className='bg-black rounded-xl p-2 text-white' onClick={() => handleSubmit()}>
            Submit</button>
        </div>
      </div>
    </div>
  )
}

export default TeacherComment