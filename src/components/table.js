import React from 'react';
import {useParams} from 'react-router-dom';

function Table(props) {

    const { id } = useParams()
    return (
        <div>
           <h1>table id {id}</h1>
        </div>
    );
}

export default Table;
