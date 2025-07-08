import React from 'react'
import Icon from '../icon'
import styles from './button.module.scss'

interface ButtonProps {
	title?: string
	prependIcon?: string
	appendIcon?: string
	primary?: boolean
	disabled?: boolean
	outline?: boolean
	bordered?: boolean
	transparent?: boolean
	block?: boolean
	small?: boolean
	large?: boolean
	danger?: boolean
	onlyIcon?: boolean
	loading?: boolean
	width?: string
	height?: string
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
	title = '',
	prependIcon = '',
	appendIcon = '',
	primary = false,
	disabled = false,
	outline = false,
	bordered = false,
	transparent = false,
	block = false,
	small = false,
	large = false,
	danger = false,
	onlyIcon = false,
	loading = false,
	width = '',
	height = '',
	type = 'button',
	onClick
}) => {
	const buttonClasses = [
		styles.button,
		primary && styles['button--primary'],
		disabled && styles['button--disabled'],
		outline && styles['button--outline'],
		bordered && styles['button--bordered'],
		transparent && styles['button--transparent'],
		block && styles['button--block'],
		small && styles['button--small'],
		large && styles['button--large'],
		danger && styles['button--danger'],
		onlyIcon && styles['button--only-icon'],
		loading && styles['button--loading']
	]
		.filter(Boolean)
		.join(' ')

	const buttonStyles: React.CSSProperties = {
		...(width && { width: `${width}px` }),
		...(height && { height: `${height}px` })
	}

	return (
		<button
			className={buttonClasses}
			disabled={disabled}
			type={type}
			style={buttonStyles}
			onClick={onClick}
		>
			{loading && <div className={styles.button__loader} />}

			{prependIcon && !loading && (
				<span className={styles.button__icon}>
					<Icon name={prependIcon} />
				</span>
			)}

			{title && !loading && <span className={styles.button__content}>{title}</span>}

			{appendIcon && !loading && (
				<span className={styles.button__icon}>
					<Icon name={appendIcon} />
				</span>
			)}
		</button>
	)
}

export default Button
