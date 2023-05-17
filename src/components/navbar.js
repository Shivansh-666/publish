import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const [navTitle, setNavTitle] = useState('Home Screen');

  const homeLink = (
    <Link
      style={{
        color: 'black',
        backgroundColor: 'pink',
        padding: 10,
      }}
      to="/"
      onClick={() => setNavTitle('Home Screen')}
    >
      Home
    </Link>
  );

  const crudLink = (
    <Link
      style={{
        color: 'black',
        backgroundColor: 'pink',
        padding: 10,
        marginLeft: 10,
      }}
      to="/crud"
      onClick={() => setNavTitle('Add Item')}
    >
      Add Item
    </Link>
  );

  const tableLink = (
    <Link
      style={{
        color: 'black',
        backgroundColor: 'pink',
        padding: 10,
        marginLeft: 10,
      }}
      to="/table"
      onClick={() => setNavTitle('Table Crud')}
    >
      Table Crud
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navTitle">
        <p>{navTitle}</p>
      </div>
      <div className="links">
        {homeLink}
        {crudLink}
        {tableLink}
      </div>
    </nav>
  );
}

export default Navbar;
