import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Categoryall = () => {
    const { id } = useParams()
    const [cats, setCats] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(data => {
                const fetched = data.data
                setCats(fetched)
            })
    }, [])
    const handleChange = (cat) => {
        location.href = cat
    }
    return (
        <div className='modaldiv shadow w-[40dvw] bg-(--color-powder-blue) rounded-3xl p-2'>
            <div className='bg-(--color-royal-blue) p-2 rounded-2xl text-white'>All Categories</div>
            <div className="modaldiv-content flex flex-col gap-2 mt-2">
                {
                    cats.map((c) => {
                        return (
                            <button type='button' onClick={() => handleChange(`/${id}/category/${c?.slug}`)}
                                className='p-2 rounded-2xl shadow border duration-500 text-(--color-royal-blue) text-start
                                border-(--color-royal-blue) hover:bg-(--color-royal-blue) hover:text-white'>
                                <i className={`bi bi-${c?.icon} me-4`}></i>
                                {c?.name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Categoryall