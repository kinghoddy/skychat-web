import React from 'react';
import axios from 'axios';

const menu = props => {
    axios.get('https://skymail-920ab.firebaseio.com/users/-Lz4mLEQS2A2692V7R2_.json')
        .then(res => {
            console.log(res.data);
        })
    return (
        <h1>Menu </h1>
    )
}

export default menu