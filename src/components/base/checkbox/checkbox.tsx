import React, { forwardRef } from 'react'
import Icon from '../icon'
import styles from './checkbox.module.scss'

interface CheckboxProps {
	modelValue?: boolean
	disabled?: boolean
	title?: string | null
	value?: boolean
	error?: boolean
	readonly?: boolean
	checkedIcon?: string
	uncheckedIcon?: string
	onChange?: (value: boolean) => void
	className?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			modelValue = false,
			disabled = false,
			title = null,
			value = false,
			error = false,
			readonly = false,
			checkedIcon = 'checkBox',
			uncheckedIcon = 'checkBoxOutline',
			onChange,
			className = ''
		},
		ref
	) => {
		const isChecked = modelValue || value

		const handleChange = () => {
			if (!disabled && !readonly && onChange) {
				onChange(!isChecked)
			}
		}

		const checkboxClasses = [
			styles.checkbox,
			isChecked && styles['checkbox--active'],
			disabled && styles['checkbox--disabled'],
			error && styles['checkbox--error'],
			readonly && styles['checkbox--readonly'],
			className
		]
			.filter(Boolean)
			.join(' ')

		return (
			<label
				className={checkboxClasses}
				htmlFor={`checkbox-${Math.random().toString(36).substring(2, 9)}`}
				onClick={handleChange}
			>
				<input
					ref={ref}
					id={`checkbox-${Math.random().toString(36).substring(2, 9)}`}
					type="checkbox"
					checked={isChecked}
					disabled={disabled}
					readOnly={readonly}
					className={styles.checkbox__input}
				/>

				<span className={styles.checkbox__icon}>
					<Icon name={isChecked ? checkedIcon : uncheckedIcon} />
				</span>

				{title && <p className={styles.checkbox__title}>{title}</p>}
			</label>
		)
	}
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
