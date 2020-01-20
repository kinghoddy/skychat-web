import React from 'react';
import classes from './Chat.css'

const chat = props =>{

    var Arr = Array.from(props.children)     
     let classname = classes.sent
     if(props.type === 'received'){
         classname = classes.received
     }
     if(Arr.length > 50){
         classname = [classname, classes.lg].join(' ')
     }
     
     return (
         <div className={[classes.chat,classname].join(' ')}>
             {props.children}
         </div>
     )
}

export default chat
