import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
    children: React.ReactChild,
    closeModal: () => void
}

const Modal = React.memo(({ children, closeModal }: Props) => {
    const domEl = document.getElementById('modal-root')

    if (!domEl) return null

    // This is where the magic happens -> our modal div will be rendered into our 'modal-root' div, no matter where we
    // use this component inside our React tree
    return ReactDOM.createPortal(
        <div>
            <button onClick={closeModal}>Close</button>
            <p></p>
            {children}
        </div>,
        domEl
    )
})

export default Modal