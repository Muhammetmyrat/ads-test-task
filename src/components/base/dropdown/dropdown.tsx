import React, { useState, useRef, useEffect } from 'react'
import Icon from '../icon'
import styles from './dropdown.module.scss'

interface DropdownItem {
	value: string
	label: string
}

interface DropdownProps {
	label?: string
	placeholder?: string
	items: DropdownItem[]
	selectedValue?: string
	onSelect: (value: string) => void
	disabled?: boolean
	error?: boolean
	className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	placeholder = 'Select an option',
	items,
	selectedValue,
	onSelect,
	disabled = false,
	error = false,
	className = ''
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const selectedItem = items.find(item => item.value === selectedValue)

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen(!isOpen)
		}
	}

	const handleSelect = (value: string) => {
		onSelect(value)
		setIsOpen(false)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const dropdownClasses = [
		'dropdown',
		isOpen && styles['dropdown__open'],
		disabled && styles['dropdown__disabled'],
		error && styles['dropdown__error'],
		className
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={dropdownClasses}>
			<div className={styles.dropdown__wrapper} ref={dropdownRef}>
				{label && <label className={styles.dropdown__label}>{label}</label>}
				<div className={styles.dropdown__body} onClick={toggleDropdown}>
					{selectedItem ? (
						<div className={styles.dropdown__selected}>{selectedItem.label}</div>
					) : (
						<div className={styles.dropdown__placeholder}>{placeholder}</div>
					)}
					<div className={styles.dropdown__icon}>
						<Icon name="chevron-down" />
					</div>

					{isOpen && (
						<div className={styles.dropdown__menu}>
							{items.map(item => (
								<div
									key={item.value}
									className={`${styles.dropdown__item} ${
										selectedValue === item.value ? styles['dropdown__item--selected'] : ''
									}`}
									onClick={() => handleSelect(item.value)}
								>
									{item.label}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Dropdown
