import React from 'react'

const Biodata = (props) => {
    return (
        <div className={`p-2 ${ props.last ? "" : "border-b"}`}>
            <span className='text-xl'>
                {props.param} :
            </span>
            <span className='mx-2 text-md'>
                {props.value}
            </span>
        </div>
    )
}

export default Biodata