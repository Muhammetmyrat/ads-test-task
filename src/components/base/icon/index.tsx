import React from 'react'
import classNames from 'classnames'
import icons from './icons'
import styles from './icon.module.scss'

type IconProps = {
	name: string
	size?: number | string
	color?: string
	className?: string
	onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

const Icon: React.FC<IconProps> = ({ name, size, color, onClick, className }) => {
	const svg = icons[name]

	if (!svg) return null

	return (
		<span
			className={classNames(styles.icon, className)}
			style={{ width: size, height: size, color }}
			dangerouslySetInnerHTML={{ __html: svg }}
			onClick={onClick}
		/>
	)
}

export default Icon
