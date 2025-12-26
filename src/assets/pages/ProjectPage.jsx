import React, { useEffect, useState } from 'react'
import Dashboard0 from './Dashboard0'
import Projects from '../components/Projects'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Projectall from '../components/Projectall'

const ProjectPage = () => {
  const [user,setUser] = useState()
  const { id } = useParams()

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/user/${id}`)
    .then(data=>{
      const fetched = data.data
      setUser(fetched)
    })
  },[])
  return (
    <main className="flex justify-center specialFlex">
        <Dashboard0/>
        <Projects name={user?.name}/>
        <Projectall/>
    </main>
  )
}

export default ProjectPage