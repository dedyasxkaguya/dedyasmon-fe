// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Dashboard from './assets/pages/Dashboard'
import Register from './assets/pages/Register'
import Login from './assets/pages/Login'
import Teacher from './assets/pages/Teacher'
import TeacherDetail from './assets/pages/TeacherDetail'
import Subjects from './assets/pages/Subjects'
import GalleryPage from './assets/pages/GalleryPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/:id/home' element={<Dashboard/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      {/* <Route path='/login' element={<Login/>}></Route> */}
      <Route path='/:id/teachers' element={<Teacher/>}></Route>
      <Route path='/:id/teacher/:teacher' element={<TeacherDetail/>}></Route>
      <Route path='/:id/subjects' element={<Subjects/>}></Route>
      <Route path='/:id/gallery' element={<GalleryPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
