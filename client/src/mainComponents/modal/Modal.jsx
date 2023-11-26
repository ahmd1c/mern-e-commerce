/* eslint-disable react/prop-types */
import "./modal.css"

function Modal( { setShowModal  , children } ) {

    

    return (
        <div className="overlay">
            <div className="modal">
                {children}
                <span className="close"  onClick={() => setShowModal(false)}> X </span>
            </div>
        </div>
    )
}

export default Modal