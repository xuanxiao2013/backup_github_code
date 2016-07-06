import React, { PropTypes } from 'react'

function BlogApp ({ children }) {
	return (
		<div className='page-container'>
			<div className='view-container'>
				{children}
			</div>
		</div>
	)
}

BlogApp.propTypes = {
	children: PropTypes.element
}

export default BlogApp
