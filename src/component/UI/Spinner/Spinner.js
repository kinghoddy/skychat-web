import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
    <div className={"h-100 w-100 d-flex align-items-center justify-content-center bg-white" + props.style}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default spinner;