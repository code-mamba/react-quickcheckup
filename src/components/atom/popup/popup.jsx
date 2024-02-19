import React from 'react'

import './popup.css'
export const Popup = (props) => {
	return (
		props.content && (
			<div className="popup-overlay" onClick={props.onClose}>
				<div className="popup-content" onClick={(e) => e.stopPropagation()}>
					<div className="popup-close" onClick={props.onClose}>
						&times;
					</div>
					{props.content}
				</div>
			</div>
		)
	)
}
