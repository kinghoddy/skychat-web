import React, { Component } from 'react';


class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidMount(){
        if(this.props.show){
            document.getElementById('mBtn').click()
        }
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render () {

        return (
  <React.Fragment>

         <button type="button" id='mBtn' className="d-none" data-toggle="modal" data-target="#modelId">
           Launch
         </button>
           
           <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" >
               <div className="modal-dialog" role="document">
                   <div className="modal-content">
                       <div className="modal-header">
                           <h5 className="modal-title">Modal title</h5>
                               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span>
                               </button>
                       </div>
                       <div className="modal-body">
                           Body
                       </div>
                       <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                           <button type="button" className="btn btn-primary">Save</button>
                       </div>
                   </div>
               </div>
           </div>
           </React.Fragment>

        )
    }
}

export default Modal;