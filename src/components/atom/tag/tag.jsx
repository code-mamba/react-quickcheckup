import React from 'react'

import StyledTag from './tag.sc'

export const Tag = (props) => {
	return <StyledTag variant={props.variant}>{props.label}</StyledTag>
}
