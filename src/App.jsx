// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Dashboard from './assets/pages/Dashboard'
import Register from './assets/pages/Register'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/home/:id' element={<Dashboard/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
    </>
  )
}

export default App
