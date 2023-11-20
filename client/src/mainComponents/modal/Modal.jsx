/* eslint-disable react/prop-types */
import "./modal.css"

function Modal( { setShowModal  , children , handleSubmit} ) {

    

    return (
        <div className="overlay">
            <form onSubmit={handleSubmit} className="modal">
                {children}
                <button type="submit"> Submit </button>
                <span className="close"  onClick={() => setShowModal(false)}> X </span>
            </form>
        </div>
    )
}

export default Modal