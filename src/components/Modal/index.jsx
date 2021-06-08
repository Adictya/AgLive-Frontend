import React from 'react'
import classes from './Modal.module.css'

const Modal = ({styles, heading ,children}) =>{
	return(
        <div className={`${classes.streamContainer} ${styles}`}>
          <div className={classes.streamHeader}>
            <strong>{heading}</strong>
          </div>
          {children}
        </div>
	)
}

export default Modal
