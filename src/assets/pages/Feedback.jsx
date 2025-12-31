import React, { useEffect, useState } from 'react'
import Dashboard0 from './Dashboard0'
import Feed from '../components/Feed'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AdminFeedback from '../AdminFeedback'

const Feedback = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
            .then(data => {
                const fetched = data.data
                setUser(fetched)
            })
    }, [])
    console.log(user?.role)
    return (
        <div className="flex">
            {user?.role == 'ADMIN' && (
                <>
                    <Dashboard0 />
                    <AdminFeedback />
                </>
            )}
            {user?.role !== 'ADMIN' && (
                <>
                    <Dashboard0 />
                    <Feed />
                </>
            )}
        </div>
    )
}

export default Feedback