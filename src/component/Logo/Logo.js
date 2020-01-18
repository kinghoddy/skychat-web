import React from 'react';

import Logo1 from '../../assets/Image/logo/skymail-logo1.png';
import Logo2 from '../../assets/Image/logo/skymail-logo2.png';
import Logo3 from '../../assets/Image/logo/skymail-logo3.png';
import Logo4 from '../../assets/Image/logo/skymail-logo4.png';
import Logo5 from '../../assets/Image/logo/skymail-logo5.png';
import Logo6 from '../../assets/Image/logo/skymail-logo6.png';
import classes from './Logo.css';

const logo = (props) => {

    if (props.type === 'l1') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo1} alt="Skymail Logo" />
        </div>)
    } else if (props.type === 'l2') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo2} alt="Skymail Logo" />
        </div>)

    } else if (props.type === 'l3') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo3} alt="Skymail Logo" />
        </div>)

    } else if (props.type === 'l4') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo4} alt="Skymail Logo" />
        </div>)

    } else if (props.type === 'l5') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo5} alt="Skymail Logo" />
        </div>)

    } else if (props.type === 'l6') {
        return (<div className={classes.Logo} style={{ height: props.height }}>
            <img src={Logo6} alt="Skymail Logo" />
        </div>)
    } else {
        return <h5>Cant load logo</h5>
    }

}


export default logo;