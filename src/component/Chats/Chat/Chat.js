import React from 'react';
import classes from './Chat.css'

const chat = props =>{
   
    var icon = ''

    var Arr = Array.from(props.children)     
     let classname = classes.sent
     if(props.sender === 'received'){
         classname = classes.received
         icon = <div className ={classes.icon + " mr-3"}>
                   <img src={props.icon} alt="profile" />
         </div>
     }
     if(Arr.length > 50 && Arr.length  < 80){
         classname = [classname, classes.lg].join(' ')
     }else if(Arr.length > 80){
        classname = [classname, classes.lg2].join(' ')
     }
     
     return (
         <div className="d-flex">
            {icon}
             <div className={[classes.chat,classname].join(' ')}>
             {props.children}
         </div>
         </div>
     )
}

export default chat
