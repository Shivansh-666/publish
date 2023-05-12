import React from 'react';
import {Link } from 'react-router-dom';


function Navbar(props) {
    const homeLink = 
    <Link style={{
        color: 'black', 
        backgroundColor: 'pink', 
        padding: 10}} to='/' >
        Home
    </Link>
   const crudLink =  <Link style={{
        color: 'black', 
        backgroundColor: 'pink',
        padding: 10,
        marginLeft: 10
      }} to='/crud' >
   Add item
        </Link>
    return (
        <nav className='navbar'>
            <div className='navTitle'><p>Home Screen</p></div>
            <div className='links'>
                {homeLink}
                {crudLink}
            </div> 

        </nav>

    );
}

export default Navbar;