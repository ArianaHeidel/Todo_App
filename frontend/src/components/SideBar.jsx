import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const SideBar = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <button onClick={() => setOpen(!open)}>Ein-/Ausklappen</button>
            <div className={open? 'sidebarOpen':'sidebar'}>
                <nav className='tabs'>
                    <NavLink to="/todos" className='tab'>Todos</NavLink>
                    <NavLink to="/Dummi" className='tab'>DummiLink</NavLink>
                </nav>
            </div>
        </>
    )
}

export default SideBar
