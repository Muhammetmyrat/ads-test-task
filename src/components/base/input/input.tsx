import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: boolean
	disabled?: boolean
	className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, disabled, className = '', ...props }, ref) => {
		return (
			<div
				className={classNames(styles.input, {
					[styles['input__error']]: error,
					[styles['input__disabled']]: disabled
				})}
			>
				<div className={styles.input__wrapper}>
					{label && <label className={styles.input__label}>{label}</label>}
					<div className={styles.input__body}>
						<input ref={ref} className={className} {...props} />
					</div>
				</div>
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
