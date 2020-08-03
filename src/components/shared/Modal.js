import React from "react";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";

const Modal = (props) => {
	const { layer, onClose, children, hideClose } = props;
	return (
		<div className='custom-modal p-4' style={{ zIndex: layer ?? 10 }}>
			<div className='backdrop' onClick={(_) => onClose()} />
			<div className='custom-modal-btns' style={{ zIndex: 3 }}>
				{!hideClose && (
					<button className='btn btn-danger btn-sm d-flex' onClick={(_) => onClose()}>
						<CloseIcon size='1.5rem' />{" "}
					</button>
				)}
			</div>
			{/* review content */}
			<div className='custom-modal-content' style={{ zIndex: 2 }}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
