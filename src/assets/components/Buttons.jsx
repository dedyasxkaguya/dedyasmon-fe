import React from 'react'
import { Link } from 'react-router-dom'

const Buttons = (props) => {
    return (
        <Link to={props.link} className='duration-500 font-light text-lg rounded-xl p-1 px-2 hover:bg-neutral-50 hover:text-neutral-800'>
            <i className={`bi bi-${props.icon} mx-2`}></i>
            {props.title}
        </Link>
    )
}

export default Buttons