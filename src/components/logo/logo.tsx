import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '@/components/base/icon'

const Logo: React.FC = () => {
	return (
		<NavLink to="/">
			<Icon name="logo" />
		</NavLink>
	)
}

export default Logo
