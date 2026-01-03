import React from 'react'

const Input = (props) => {
  return (
    <input type={props.type} name={props.name} placeholder={props.name} id={props.id} onChange={props.func} autoFocus={props.focus}
    className='p-2 rounded-lg bg-neutral-50 text-neutral-800'/>
  )
}

export default Input