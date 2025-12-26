import React from 'react'

const Navbar = (props) => {
  return (
    <nav id='nav' className="p-4 w-dvw flex justify-between items-center bg-neutral-800 text-neutral-50 fixed top-0 left-0 z-10">
        <i className="bi bi-list cursor-pointer" onClick={props.func} ></i>
        <span>DedyasMon</span>
    </nav>
  )
}

export default Navbar